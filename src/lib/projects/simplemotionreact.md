---
title: Simple Motion React
category: Library
year: 2024
summary: Biblioteca de animação declarativa para React, inspirada na API de transição do Vue, com zero dependências.
repository: https://github.com/Azganoth/simple-motion-react
website: https://simple-motion-react.vercel.app/
tags:
  - React
  - Jest
  - Storybook
  - TypeScript
---

Simple Motion React é uma biblioteca de animação leve e focada para orquestrar transições de componentes React com base no seu ciclo de vida. Inspirado pela API robusta e nativa de transições do Vue, o projeto foi um exercício para construir do zero um sistema de transição com zero dependências, aprofundando nos conceitos internos do React.

### Principais Funcionalidades

- **Controle por Fases de Transição**: Fornece hooks para cada fase do ciclo de vida do componente (`entering`, `entered`, `exiting`, `exited`), permitindo controle granular sobre as transições.
- **Animações com Classes CSS**: O componente `<CSSTransition>` facilita a aplicação de classes CSS em cada fase, permitindo animações complexas e performáticas.
- **Animação de Listas**: O componente `<TransitionGroup>` gerencia e anima uma lista de elementos à medida que são adicionados ou removidos, orquestrando as transições individuais.
- **Troca de Componentes**: O `<TransitionSwitch>` anima a transição entre dois componentes, garantindo que o antigo saia de cena antes que o novo entre.

### Ferramentas e Tecnologias

A biblioteca foi construída com **React** e **TypeScript**, sem dependências externas de animação. Os componentes foram testados com **Jest** e **React Testing Library** para garantir o funcionamento, e pelo **Storybook** para documentação visual e interativa. O build para publicação no NPM é feito com **tsup** e automatizado via **GitHub Actions**.

### Desafios Técnicos e Aprendizados

- **Orquestração de Fases no `<Transition>`**: O principal desafio foi criar uma máquina de estados robusta para gerenciar as fases (`entering`, `exiting`, etc.). A solução envolveu o uso de `useLayoutEffect` para reagir a mudanças na prop `in`, `setTimeout` para controlar a duração de cada fase, e a técnica de forçar um reflow do navegador (acessando `node.offsetHeight`) entre a aplicação das classes, garantindo que as transições CSS sejam disparadas de forma consistente.
- **Gerenciamento de Filhos no `<TransitionGroup>`**: Para animar a saída de um elemento removido de uma lista, era preciso mantê-lo no DOM mesmo após sua remoção lógica do VDOM. Desenvolvi uma lógica que mantém um estado interno de "filhos renderizáveis". Quando um filho é removido das `props`, ele é mantido nesse estado com `in={false}` e só é de fato removido do DOM após o callback `onExited` ser disparado, o que aprofundou o meu entendimento do ciclo de reconciliação do React.
- **Renderização Sequencial no `<TransitionSwitch>`**: O objetivo era criar uma transição "out-in", onde o componente antigo some por completo antes do novo aparecer. Um render condicional simples não funcionaria. A solução foi usar a `key` do filho para detectar a troca. Ao invés de renderizar o novo filho imediatamente, o componente primeiro clona o filho antigo, passa `in={false}` para ele e, crucialmente, usa o callback `onExited` para, só então, atualizar o estado e renderizar o novo componente, garantindo a sequência correta da animação.
