---
title: Nexus
category: Web App
year: 2025
summary: Plataforma SaaS de agregação de links construída em Monorepo com arquitetura Full-Stack escalável.
repository: https://github.com/Azganoth/nexus
website: https://nexusapp.fly.dev
tags:
  - Next
  - React
  - TypeScript
  - TailwindCSS
  - Node
  - Express
  - Prisma
  - PostgreSQL
  - Docker
  - Jest
  - Testing Library
---

O Nexus é uma aplicação "_Link-in-Bio_" completa, projetada para simular um produto **SaaS** real. O projeto adota uma arquitetura de **Monorepo** para compartilhar contratos de dados e lógica entre o frontend (**Next.js**) e o backend (**Express**), demonstrando domínio sobre o ciclo de vida completo de desenvolvimento de software, desde a modelagem de dados até a orquestração de containers.

---

## 🧩 Desafios Técnicos & Soluções

### 1. Concorrência em Autenticação (Promise Singleton)

**O Problema:** Em SPAs complexas, múltiplas requisições simultâneas podem falhar devido a um token expirado. Se cada uma tentar renovar o token independentemente, o mecanismo de **Refresh Token Rotation** invalidaria os tokens anteriores em cascata, eventualmente deslogando o usuário.

**A Solução:** Implementei um padrão de **Promise Singleton** no interceptor do cliente HTTP. A primeira falha 401 instancia uma promessa de refresh e todas as requisições subsequentes se inscrevem nessa mesma promessa pendente (queueing) em vez de disparar novos refreshes.

**Resultado:**

- Após a resolução, todas as requisições pausadas são reexecutadas com o novo token.
- Garante atomicidade na renovação da sessão.

### 2. Integridade e Segurança de Sessão

**O Problema:** Prevenir replay attacks e garantir que tokens não pudessem ser forjados ou colidissem, além de permitir a validação de sessão no servidor (**Next.js**) sem expor tokens sensíveis.

**A Solução:** Injetei entropia criptográfica (16 bytes hex) via **JTI (JWT ID)** em cada token gerado e criei um endpoint _read-only_ (**BFF Pattern**) que permite ao **Next.js** validar a sessão via _cookies_ `httpOnly` no **SSR**.

**Resultado:**

- Unicidade absoluta no banco de dados para revogação precisa.
- Não aciona lógica de rotação de escrita inadvertidamente.
- Segurança e performance mantidas no SSR.

### 3. Upload com Deduplicação (Content-Addressable Storage)

**O Problema:** O upload de imagens binárias diretamente pela API **Node.js** bloqueia a _thread_ principal, degradando a performance geral. Além disso, alguns usuários enviam a mesma imagem (ex: logo de redes sociais), desperdiçando armazenamento e banda com arquivos duplicados.

**A Solução:** Implementei uma lógica de hash SHA-256 no cliente (**Content-Based Addressing**). Antes do upload, o servidor verifica via R2/S3 `HeadObject` se o arquivo já existe. Se existir, reutiliza-o instantaneamente; se não, gera uma **Presigned URL** para upload direto para o bucket.

**Resultado:**

- Deduplicação automática de arquivos idênticos.
- Upload direto (Client-to-Storage) sem bloquear o servidor **Node.js**.

### 4. Type-Safety End-to-End (Shared Contracts)

**O Problema:** Manter tipos **TypeScript** sincronizados manualmente entre Frontend e Backend é propenso a erro humano. Uma simples mudança no nome de um campo na API pode quebrar silenciosamente a interface em produção, pois não há validação de compilação cruzada entre os projetos.

**A Solução:** Utilizei a arquitetura de **Monorepo** para criar um pacote compartilhado (`@repo/shared`). Os schemas **Zod** definidos neste pacote servem como a única fonte da verdade, gerando tanto os tipos estáticos (**TypeScript**) quanto as regras de validação de formulários (Frontend) e inputs de API (Backend).

**Resultado:**

- Refatorações seguras: alterar um campo no backend gera erro de build imediato no frontend.
- Validação isomórfica: a mesma regra de email/senha roda no cliente e no servidor.

### 5. Reordenação Otimista e Restrições de Banco

**O Problema:** Atualizar a ordem de itens em uma coluna com restrição `UNIQUE` no banco de dados SQL frequentemente causa erros de colisão. Tentar trocar o item "1" pelo "2" falha imediatamente se a transação não for atômica, pois o índice "2" já está ocupado no momento da escrita.

**A Solução:** No frontend, utilizei **SWR** para atualizações otimistas instantâneas. No backend, implementei uma transação que primeiro atualiza os índices para valores negativos temporários, contornando a restrição de unicidade antes de aplicar a nova ordem definitiva.

**Resultado:**

- UX fluida sem "pulos" ou espera de rede.
- Integridade dos dados garantida a nível de banco.

### 6. Auto-Save Inteligente (Debounce & Dirty Check)

**O Problema:** Implementar salvamento automático ouvindo cada evento de digitação (`onChange`) cria um excesso de requisições desnecessárias (_overhead_). Além disso, a latência de rede variável causa _race condition_, onde uma resposta antiga pode sobrescrever dados mais recentes, revertendo a modificação do usuário.

**A Solução:** Criei um hook customizado `useAutoSaveForm` que combina o monitoramento de estado do **React Hook Form** com um `useDebounceValue`. O hook verifica inteligentemente se houve mudança real (_isDirty_) comparando com o valor inicial antes de disparar a submissão automática.

**Resultado:**

- Experiência de edição fluida e moderna.
- Redução drástica de chamadas de rede desnecessárias.

---

## 🏗️ Arquitetura

O sistema é orquestrado via **Turborepo**, permitindo o compartilhamento de código com **Type-Safety End-to-End**:

- **Apps:** `web` (**Next.js 14 App Router**) e `api` (**Express.js**).
- **Packages Compartilhados:**
  - `@repo/database`: Cliente **Prisma** e migrações, garantindo que API e scripts de seed usem a mesma fonte de verdade.
  - `@repo/shared`: Schemas **Zod** e tipos **TypeScript** isomórficos. Uma mudança no schema de validação reflete imediatamente em erros de compilação tanto no frontend quanto no backend.

### Infraestrutura

- **Docker Multi-stage:** Builds otimizados para produção com redução drástica do tamanho da imagem final.
- **CI/CD:** Pipeline **GitHub Actions** para testes automatizados (**Jest**/**Supertest**) e deploy contínuo.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, Tailwind
- **Backend:** Node.js, Express
- **Dados:** PostgreSQL, Prisma
- **Infra:** Docker, Fly.io
