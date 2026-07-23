---
title: Nexus
category: Aplicação web
year: 2025
summary: Aplicação full stack de link-in-bio, construída em um monorepo com Next.js e Express.
outcome: Contratos compartilhados, renovação de sessão coordenada, upload direto para object storage, testes automatizados e deploy na Fly.io.
repository: https://github.com/Azganoth/nexus
website: https://nexusapp.fly.dev
tags:
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
  - Node.js
  - Express
  - Prisma
  - PostgreSQL
  - Docker
  - Jest
  - Testing Library
---

O Nexus é uma aplicação link-in-bio criada para explorar a arquitetura de um produto **SaaS** além da interface. O workspace em **Turborepo** integra um frontend em **Next.js**, uma API **Express**, contratos **Zod** compartilhados, **PostgreSQL** com **Prisma** e object storage compatível com S3 no **Cloudflare R2**.

---

## 🧩 Decisões técnicas

### 1. Renovação de sessão sem requisições concorrentes

**Desafio:** Quando o access token expira, várias requisições do browser podem receber uma resposta 401 ao mesmo tempo. Se todas iniciarem um refresh, elas passam a disputar a mesma sessão. As rotas renderizadas no servidor também precisam consultar a sessão sem acionar o fluxo de renovação.

**Implementação:** O cliente HTTP mantém uma única `Promise` para o refresh em andamento. A primeira resposta 401 elegível dispara a chamada; as demais aguardam a mesma `Promise` e repetem a requisição original com o novo access token. Na API, o refresh token assinado é comparado com a sessão persistida e enviado em um cookie `httpOnly`, fora do alcance do JavaScript do cliente. Um endpoint separado e somente de leitura permite que o **Next.js** consulte a sessão durante o **SSR**.

**Resultado:**

- Apenas uma requisição de refresh fica em andamento no browser.
- As requisições que falharam são repetidas após a conclusão do refresh compartilhado.
- A consulta de sessão no SSR não aciona o endpoint de renovação.

### 2. Upload direto com deduplicação por conteúdo

**Desafio:** Enviar o conteúdo das imagens pela API **Express** consumiria banda e memória no servidor da aplicação. Reenviar o mesmo avatar processado também criaria objetos redundantes.

**Implementação:** O browser recorta o avatar para uma imagem WebP de 256 × 256 e calcula seu hash SHA-256. A API usa esse hash na chave do objeto e consulta o **R2** com `HeadObject`. Se o objeto já existir para aquela conta, retorna a URL pública; caso contrário, retorna uma presigned URL para `PUT`, e o browser envia a imagem diretamente ao bucket.

**Resultado:**

- O reenvio do mesmo avatar processado reutiliza o objeto existente.
- O conteúdo da imagem segue do browser para o R2 sem atravessar o Express.

### 3. Contratos compartilhados entre frontend e backend

**Desafio:** Duplicar tipos de requisição e regras de validação entre aplicações facilita a divergência dos contratos.

**Implementação:** O pacote `@repo/shared` centraliza schemas **Zod** e os tipos **TypeScript** inferidos a partir deles. Os formulários em Next.js e os handlers do Express consomem as mesmas definições.

**Resultado:**

- Mudanças de contrato aparecem durante o build ou type-checking, sem depender de sincronização manual.
- As mesmas regras de validação são aplicadas no cliente e na entrada da API.

### 4. Reordenação otimista com uma restrição UNIQUE

**Desafio:** Trocar posições diretamente pode violar a restrição `UNIQUE` da ordenação antes que todas as linhas cheguem aos valores finais.

**Implementação:** O **SWR** aplica a nova ordem imediatamente na interface. A API primeiro confirma que os IDs enviados correspondem exatamente aos links do usuário. Dentro de uma transação, atribui posições negativas temporárias e depois grava a ordem final a partir de zero.

**Resultado:**

- A interface responde antes de a chamada à API terminar.
- O banco mantém uma ordem única e validada para todos os links salvos.

## Outros detalhes de implementação

As configurações do perfil usam um hook reutilizável de auto-save. Ele monitora campos específicos, aguarda um segundo sem novas alterações, compara os valores com o estado salvo, valida o que mudou e só envia uma atualização quando necessário.

---

## 🏗️ Arquitetura

```text
                         @repo/shared
                 Schemas Zod e contratos TypeScript
                       /                    \
Browser -> Frontend Next.js -> API Express -> PostgreSQL
   |                              |
   |                              +-> R2: verificação + presigned URL
   +--------------------------------> R2: upload direto do avatar
```

- **Aplicações:** `web` com o **Next.js App Router** e `api` com **Express**.
- **Pacotes compartilhados:**
  - `@repo/database`: cliente **Prisma** e migrações compartilhados pela API e pelos scripts de seed.
  - `@repo/shared`: schemas **Zod**, contratos da API e tipos **TypeScript** inferidos.

### Entrega e verificação

- Dockerfiles multi-stage separados geram as aplicações web e API para a **Fly.io**.
- O workflow do **GitHub Actions** executa build e testes do workspace. Na branch principal, também aplica as migrações do banco e faz o deploy das duas aplicações.
- **Jest**, **Supertest** e Testing Library cobrem comportamentos da API e do frontend.

### Escopo atual e considerações para produção

A instância publicada demonstra a arquitetura do produto, mas não opera como um serviço público multi-tenant. Uma operação comercial também exigiria observabilidade estruturada, procedimentos de backup e restore, rate limiting e controles antiabuso, planejamento de capacidade e runbooks operacionais.

---

## 🛠️ Tech stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node.js, Express
- **Dados:** PostgreSQL, Prisma
- **Infraestrutura:** Docker, Fly.io
