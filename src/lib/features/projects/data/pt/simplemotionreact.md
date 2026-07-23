---
title: Simple Motion React
category: Biblioteca
year: 2024
summary: Biblioteca de transições para React inspirada no Vue, baseada em CSS e coordenação de ciclo de vida.
outcome: Pacote publicado no npm para transições CSS com ciclo de vida, listas por key e troca entre componentes, acompanhado de documentação no Storybook e testes automatizados.
repository: https://github.com/Azganoth/simple-motion-react
website: https://simple-motion-react.vercel.app/
tags:
  - React
  - TypeScript
  - Jest
  - Testing Library
  - Storybook
---

O **Simple Motion React** é uma biblioteca focada em transições para **React**, com uma API inspirada no **Vue.js**. Ela coordena as fases do ciclo de vida e as classes dos componentes, enquanto os valores e o comportamento visual da animação permanecem no CSS da aplicação.

O pacote está disponível no npm como [`@simple-motion/react`](https://www.npmjs.com/package/@simple-motion/react). A versão `0.0.2` fornece `Transition`, `CSSTransition`, `TransitionGroup` e `TransitionSwitch`.

---

## 📦 Uso do pacote

```bash
pnpm add @simple-motion/react
```

```tsx
import { CSSTransition } from "@simple-motion/react";

<CSSTransition in={visible} duration={200} name="fade" unmount>
  <div>Conteúdo com transição</div>
</CSSTransition>;
```

```css
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
```

## 🧩 Comportamento dos componentes

### Manter o elemento montado durante a saída

Uma animação de saída não pode continuar depois que o React remove o elemento. Por isso, o `<Transition>` controla uma máquina de estados `entering → entered → exiting → exited`. Quando a prop `in` muda para `false`, o componente entra na fase de saída, executa os callbacks de ciclo de vida e aguarda o `duration` configurado. Com `unmount` habilitado, ele só retorna `null` depois de chegar a `exited`.

O cleanup do effect cancela um timer obsoleto quando a direção muda rapidamente. Quem usa o render prop pode estilizar cada fase diretamente, com durações e callbacks separados para appear, enter e exit.

### Coordenar classes CSS entre cálculos de layout

Aplicar as classes inicial e final no mesmo batch de renderização pode impedir a transição CSS, porque o browser não chega a calcular o layout de partida. O `<CSSTransition>` mapeia as fases para classes no estilo do Vue: `enter-from`, `enter-active`, `enter-to`, `leave-from`, `leave-active` e `leave-to`.

Entre as classes inicial e ativa, a biblioteca lê `offsetHeight` para forçar o cálculo do layout antes de aplicar o estado final. É possível seguir a convenção de nomes ou informar cada classe separadamente, enquanto propriedades, easing e decisões visuais continuam sob controle do CSS.

### Reconciliar filhos por key durante remoções e trocas

Um item removido deixa de existir nos filhos recebidos, mas seu componente de transição precisa continuar renderizado até concluir o callback de saída. O `<TransitionGroup>` mantém uma lista interna de filhos por key, clona os removidos com `in={false}` e só os exclui depois de `onExited`. Keys persistentes e recém-adicionadas são combinadas na ordem mais recente recebida.

O `<TransitionSwitch>` aplica o mesmo princípio às trocas, mantendo o filho anterior montado até sua saída. Várias remoções preservam estados de ciclo de vida independentes, e nas trocas por key a saída termina antes da entrada do substituto.

## Distribuição e verificação

- O **tsup** gera arquivos ESM, CommonJS e declarações TypeScript.
- O artefato publicado da versão `0.0.2` é um tarball npm compactado de 6,9 kB, com uma entrada ESM não minificada de 10,0 kB.
- O [site em Storybook](https://simple-motion-react.vercel.app/) documenta componentes, receitas e exemplos isolados.
- Testes em Jest e Testing Library cobrem fases do ciclo de vida, classes CSS, reconciliação de listas, troca por key, mudanças rápidas de direção e composição de refs.
- O GitHub Actions executa a suíte de testes com cobertura e envia o resultado ao Codecov.

### Restrições de design e status

O pacote tem um escopo próximo ao React Transition Group: coordena ciclo de vida e classes CSS, mas não implementa animações de layout, gestos, animações de spring ou um motor de keyframes.

A conclusão da transição depende do `duration` configurado, não de um listener de `transitionend`. Por isso, o tempo no CSS e as props do componente precisam estar alinhados. O pacote está publicado no npm como `v0.0.2`; a manutenção está pausada no momento.

---

## 🛠️ Tech stack

- **Core:** React, TypeScript
- **Build tooling:** tsup
- **Qualidade:** Jest, Testing Library, Codecov
- **Documentação:** Storybook
