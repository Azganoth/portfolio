---
title: Simple Motion React
category: Library
year: 2024
summary: Biblioteca de animação declarativa para React inspirada no Vue, com zero dependências extras e foco em tamanho de bundle.
outcome: Biblioteca de transições React sem dependências extras que mantém animações de saída confiáveis após o unmount do componente.
repository: https://github.com/Azganoth/simple-motion-react
website: https://simple-motion-react.vercel.app/
tags:
  - React
  - TypeScript
  - Jest
  - Testing Library
  - Storybook
---

**Simple Motion React** é uma biblioteca de transição de componentes para **React** com API inspirada no **Vue.js**. Desenvolvida como um estudo de caso de engenharia de software, o projeto implementa "do zero" um sistema de gerenciamento de ciclo de vida estendido, permitindo animar a montagem e, crucialmente, a desmontagem de componentes, com foco em **DX** (Developer Experience) e performance.

---

## 🧩 Desafios Técnicos & Soluções

### 1. Gerenciamento de Ciclo de Vida Estendido (Unmount Animation)

**O Problema:** O **React** remove componentes do DOM imediatamente ao desmontar, impedindo animações de saída com CSS puro.

**A Solução:** Desenvolvi uma máquina de estados (`entering` → `entered` → `exiting` → `exited`) dentro do componente `<Transition>`. Quando a prop `in` muda para `false` (indicando que os filhos vão ser desmontados), o componente intercepta a renderização e mantém os filhos "vivos" (último estado) no DOM, utilizando `useLayoutEffect` para coordenar classes CSS e timers.

**Resultado:**

- Remove o nó do React apenas após a conclusão da animação.
- Permite animações de saída suaves.

### 2. Forçando Reflow para Transições CSS

**O Problema:** Navegadores otimizam renderizações agrupando alterações de estilo ("_batching_"), o que frequentemente quebra animações que dependem de um estado inicial (ex: `opacity: 0`) aplicado imediatamente antes do estado ativo (ex: `opacity: 1`).

**A Solução:** Implementei uma função de utilidade (`reflow`) que força a leitura da propriedade de layout `node.offsetHeight` entre a aplicação das classes, obrigando o motor de renderização a "pintar" o _frame_ inicial antes de processar a classe de transição.

**Resultado:**

- Garante a renderização do estado initial antes da transição.

### 3. Orquestração de Listas (TransitionGroup)

**O Problema:** Animar itens sendo inseridos e removidos de arrays dinâmicos é complexo, pois exige rastrear a identidade e posição de elementos que não existem mais.

**A Solução:** O componente `<TransitionGroup>` mantém um estado interno derivado das `keys` dos filhos. Quando um item é removido, ele é mantido no estado interno do grupo com a prop de saída ativada (`in={false}`).

**Resultado:**

- Permite que a animação de saída ocorra em paralelo com a reordenação dos outros itens.

---

## 🏗️ Arquitetura

O projeto segue padrões rigorosos para distribuição de pacotes Open Source:

- **Build Híbrido (CJS/ESM):** Utilização do **tsup** (esbuild) para gerar saídas compatíveis com bundlers modernos (Vite/Webpack) e legados (Node.js), com **Tree Shaking** nativo e geração automática de definições de tipo (`.d.ts`).
- **Tipagem Estrita:** APIs 100% tipadas com **TypeScript** para garantir **IntelliSense** e segurança para os consumidores da biblioteca.
- **Documentação Viva:** Uso do **Storybook** para desenvolvimento isolado de componentes, testes visuais e geração de documentação interativa.
- **Testes de Comportamento:** Suíte de testes com **Jest** e **React Testing Library** simulando cenários reais de uso e edge cases de timing.

---

## 🛠️ Tech Stack

- **Core:** React, TypeScript
- **Build Tooling:** tsup
- **Qualidade:** Jest, Testing Library
- **Docs:** Storybook
