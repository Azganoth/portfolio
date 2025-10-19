---
title: Body Mass Index Calculator
category: Tool
year: 2023
summary: Ferramenta de cálculo de IMC desenvolvida com Vanilla JavaScript, focada em acessibilidade (WAI-ARIA) e otimização de performance de renderização.
repository: https://github.com/Azganoth/bmi-calculator
website: https://azganoth.github.io/bmi-calculator/
tags:
  - JavaScript
  - HTML
  - CSS
---

Este projeto é um exercício de engenharia focado em **Web Nativa**. O objetivo foi construir uma aplicação interativa e acessível sem a sobrecarga de _frameworks_ modernos, demonstrando como APIs nativas do **DOM** e padrões de projeto fundamentais podem entregar performance superior e uma experiência de usuário robusta com zero dependências.

---

## 🧩 Desafios Técnicos & Soluções

### 1. Componente de Abas Acessível (WAI-ARIA)

**O Problema:** Criar um sistema de abas (_Metric_ vs _Imperial_) que fosse não apenas funcional, mas totalmente compatível com leitores de tela e navegação por teclado, sem usar bibliotecas de UI.

**A Solução:** Implementei manualmente o padrão de design **WAI-ARIA Tabs**. Utilizei JavaScript para manipular atributos ARIA (`aria-selected`, `aria-hidden`, `tabindex`) em tempo real e adicionei _event listeners_ para as setas (`ArrowLeft`, `ArrowRight`).

**Resultado:**

- Permite que o foco transite fluidamente entre as abas.
- Replica o comportamento nativo esperado por usuários de tecnologias assistivas.

### 2. Reatividade e DOM Manipulation

**O Problema:** Atualizar a interface instantaneamente conforme o usuário digita, incluindo a classificação do IMC e faixas de peso ideal, sem o _data-binding_ automático de _frameworks_.

**A Solução:** Desenvolvi uma arquitetura baseada em eventos (`input`) que aciona um pipeline de cálculo e renderização. Utilizei **Template Literals** para injeção dinâmica de HTML e desacoplei a lógica de validação (`isPositiveNumber`) e conversão de unidades.

**Resultado:**

- Substitui a necessidade de um **Virtual DOM** para esta escala de projeto.
- Facilita testes e manutenção.

---

## 🏗️ Arquitetura

### Critical Rendering Path

O projeto foi otimizado para o **Core Web Vitals**, especificamente **LCP** (Largest Contentful Paint) e **CLS** (Cumulative Layout Shift).

- **Preloading:** Uso de `<link rel="preload">` para fontes e CSS crítico, garantindo renderização imediata sem **FOUC** (Flash of Unstyled Content).
- **CSS Architecture:** Uso de Variáveis CSS (`:root`) para _design tokens_ e metodologia **BEM** para escopo de estilos.

### Mobile-First Strategy

O CSS foi escrito seguindo estritamente a abordagem **Mobile-First**. O layout padrão é vertical (_stack_) e utiliza Flexbox/Grid para reorganização complexa em _viewports_ maiores (Tablet/Desktop), garantindo que dispositivos móveis carreguem apenas o CSS essencial para sua renderização.

---

## 🛠️ Tech Stack

- **Core:** JavaScript (ES6+)
- **Estilos:** CSS
- **Acessibilidade:** WAI-ARIA
- **Performance:** Resource Hints (Uso estratégico de `preload`)
