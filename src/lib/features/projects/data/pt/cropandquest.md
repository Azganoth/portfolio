---
title: Crop & Quest
category: Web App
year: 2026
summary: Ferramenta local-first para recortar e exportar retratos nos formatos exatos exigidos por RPGs populares.
outcome: Transforma uma imagem em conjuntos de retratos com dimensões e nomes corretos inteiramente no navegador, com exportação individual e em ZIP.
repository: https://github.com/Azganoth/crop-and-quest
website: https://cropquest.vercel.app
tags:
  - Next
  - React
  - TypeScript
  - TailwindCSS
  - Vitest
  - Playwright
---

O **Crop & Quest** prepara retratos personalizados para RPGs cujos sistemas de modificação exigem diferentes dimensões, formatos e nomes de arquivo. O usuário escolhe um preset de jogo, recorta cada variante necessária, revisa o conjunto gerado e baixa arquivos individuais ou um ZIP pronto para instalação.

Todo o processamento acontece localmente no navegador. A aplicação não exige conta, banco de dados, armazenamento em nuvem ou processamento de imagens no servidor.

---

## 🧩 Desafios Técnicos & Soluções

### 1. Um Fluxo para Formatos de Jogos Incompatíveis

**O Problema:** Cada jogo possui uma combinação diferente de dimensões, proporções, variantes opcionais, nomes de arquivo e instruções de instalação. Codificar essas regras diretamente na interface transformaria cada novo preset em um problema de manutenção.

**A Solução:** Modelei cada jogo como dados tipados. Os presets definem suas variantes e regras de exportação, enquanto o editor reutiliza o mesmo fluxo de seleção, recorte, revisão e download.

**Resultado:**

- Novos jogos podem ser suportados sem criar outro editor.
- Variantes obrigatórias e opcionais seguem as regras do jogo escolhido.
- Um formato personalizado cobre jogos que ainda não possuem preset próprio.

### 2. Geração Precisa de Imagens no Cliente

**O Problema:** As coordenadas visuais de recorte precisam produzir arquivos com dimensões exatas e nomes previsíveis. Gerar várias variantes também pode consumir memória suficiente para travar ou falhar em navegadores limitados.

**A Solução:** O editor mantém o estado dos recortes em **Zustand**, renderiza cada área selecionada em um Canvas com tamanho exato, converte o resultado para o formato definido pelo preset e agrupa as variantes concluídas com **JSZip**. Validação de arquivos e estados recuperáveis impedem que entradas inválidas ou falhas de exportação interrompam a sessão silenciosamente.

**Resultado:**

- Os retratos exportados correspondem às dimensões e aos nomes esperados por cada jogo.
- As imagens nunca precisam sair do dispositivo do usuário.
- O usuário pode baixar uma variante ou o conjunto completo.

### 3. Confiabilidade em um Fluxo de Múltiplas Etapas

**O Problema:** O editor percorre seleção de imagem, várias rotas de recorte, revisão e exportação. Navegação ou dados ausentes da sessão não podem deixar o usuário em um estado inválido.

**A Solução:** A aplicação usa uma arquitetura **Next.js** organizada por funcionalidades, com estado de sessão explícito e rotas protegidas. Testes unitários e de componentes cobrem o comportamento central, enquanto o **Playwright** exercita o fluxo completo no navegador com fixtures e page objects reutilizáveis.

**Resultado:**

- Sessões inválidas ou incompletas retornam o usuário a uma etapa recuperável.
- Testes automatizados cobrem tanto comportamentos isolados quanto jornadas reais.
- A aplicação publicada continua sendo um produto pequeno e sem backend apesar do fluxo com estado.

---

## 🏗️ Stack

- **Framework:** Next.js, React, TypeScript
- **Fluxo de imagem:** Canvas API, react-easy-crop, JSZip
- **Estado e validação:** Zustand, Valibot
- **Estilos:** Tailwind CSS
- **Qualidade:** Vitest, Testing Library, Playwright, Oxlint
