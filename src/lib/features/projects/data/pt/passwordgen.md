---
title: Password Generator
category: Tool
year: 2025
summary: Aplicação interativa desenvolvida com Preact e ESM (Buildless), focada em acessibilidade e manipulação de estado complexo.
repository: https://github.com/Azganoth/password-generator-app
website: https://azganoth.github.io/password-generator-app/
tags:
  - Preact
  - HTML
  - CSS
---

Este projeto é um estudo técnico sobre o desenvolvimento web moderno sem ferramentas de _build_ complexas (**Buildless Workflow**). A aplicação utiliza **Preact** carregado diretamente via módulos **ESM** nativos do navegador, combinando a reatividade de uma biblioteca **Virtual DOM** com a simplicidade de uma estrutura estática.

---

## 🧩 Desafios Técnicos & Soluções

### 1. Arquitetura "Buildless" com HTM

**O Problema:** Utilizar componentes baseados em estado e JSX sem depender de _bundlers_ (**Webpack**/**Vite**) ou _transpilers_ (**Babel**), reduzindo a complexidade da infraestrutura de desenvolvimento.

**A Solução:** Adotei a biblioteca `htm` (**Hyperscript Tagged Markup**) combinada com **Preact**. O `htm` utiliza **Tagged Templates** nativos do JavaScript para processar sintaxe similar ao JSX diretamente no navegador.

**Resultado:**

- Permitiu escrever componentes funcionais modernos com _Hooks_ (`useState`, `useMemo`).
- Roda nativamente em qualquer browser moderno, sem precisar de compilação.

### 2. Acessibilidade em Aplicações Dinâmicas (ARIA)

**O Problema:** Garantir que atualizações dinâmicas na tela (como a mudança na força da senha ou a geração de um novo hash) sejam percebidas por leitores de tela.

**A Solução:** Implementação robusta de atributos **WAI-ARIA**. Utilizei `aria-live="assertive"` e `aria-atomic="true"` no componente de exibição de senha e no medidor de força. Sliders e checkboxes foram implementados com labels semânticos.

**Resultado:**

- Leitores de tela anunciam imediatamente quando uma nova senha é gerada ou o status muda.
- Navegabilidade total via teclado.

---

## 🏗️ Arquitetura

A lógica da aplicação é separada em componentes funcionais isolados, gerenciando estado local e efeitos colaterais.

- **Gerenciamento de Estado:** Uso de Hooks (`useState`) para controlar os parâmetros de geração (comprimento, tipos de caracteres) e a senha resultante.
- **Otimização:** Uso de `useMemo` para recalcular a força da senha apenas quando o input muda, e `useCallback` para memorizar a função de geração, evitando re-renderizações desnecessárias.
- **Lógica de Geração:** Algoritmo de embaralhamento de arrays (Fisher-Yates simplificado) para garantir que a senha contenha uma distribuição mista dos caracteres selecionados.

---

## 🛠️ Tech Stack

- **Core:** Preact (via ESM)
- **Templating:** HTM
- **Estilos:** CSS
- **Deploy:** GitHub Pages
