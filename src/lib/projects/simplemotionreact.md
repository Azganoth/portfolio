---
title: Simple Motion React
category: Library
year: 2024
summary: Biblioteca de animação declarativa para React, inspirada no 'react-transition-group' e construída do zero.
repository: https://github.com/Azganoth/simple-motion-react
website: https://simple-motion-react.vercel.app/
tags:
  - React
  - Jest
  - Storybook
  - TypeScript
---

Simple Motion React é uma biblioteca de animação leve e focada para orquestrar transições de componentes React com base em suas fases de montagem e desmontagem (enter/exit). Inspirado pela API robusta e popular do `react-transition-group`, o projeto foi um exercício para construir do zero um sistema de transição com zero dependências de runtime, aprofundando nos conceitos internos do React.

### Principais Funcionalidades

- **Controle por Fases de Transição**: Fornece hooks para cada fase do ciclo de vida da animação (`entering`, `entered`, `exiting`, `exited`), permitindo controle granular sobre as transições.
- **Animações com Classes CSS**: O componente `<CSSTransition>` facilita a aplicação de classes CSS em cada fase, permitindo animações complexas e performáticas.
- **Animação de Listas**: O componente `<TransitionGroup>` gerencia e anima uma lista de elementos à medida que são adicionados ou removidos, orquestrando as transições individuais.
- **Troca de Componentes**: O `<TransitionSwitch>` anima a transição entre dois componentes, garantindo que o antigo saia de cena antes que o novo entre.

### Ferramentas e Tecnologias

A biblioteca foi construída com **React** e **TypeScript**, sem dependências externas de animação. O desenvolvimento foi suportado pelo **Jest** e **React Testing Library** para garantir a confiabilidade dos componentes, e pelo **Storybook** para documentação visual e interativa. O build para publicação no NPM é feito com **tsup** e automatizado via **GitHub Actions**.

### Desafios Técnicos e Aprendizados

- **Gerenciamento do Ciclo de Vida da Animação de Saída**: O maior desafio foi manter um componente no DOM após ele ser logicamente removido da árvore do React, para que sua animação de saída pudesse ser executada. A solução foi desenvolver o `<TransitionGroup/>`, que gerencia um estado interno de seus filhos. Quando um filho é removido, o `<TransitionGroup/>` o mantém renderizado, passa a prop `in={false}` e só o remove do DOM real após a conclusão da animação, o que aprofundou meu conhecimento sobre o ciclo de vida e a reconciliação do React.
- **API Flexível com `<CSSTransition>`**: Outro desafio foi criar um componente que permitisse animações CSS de forma simples e declarativa. Construí o `<CSSTransition/>` sobre o `<Transition/>` base, utilizando os callbacks de ciclo de vida (`onEnter`, `onExiting`, etc.) para adicionar e remover classes CSS (`*-enter-active`, `*-leave-to`, etc.) em um nó do DOM em momentos precisos. Isso resultou em uma API intuitiva e familiar para desenvolvedores, que abstrai a complexidade de manipular classes manualmente.
