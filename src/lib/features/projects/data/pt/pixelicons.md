---
title: Pixel Icons
category: Extensão
year: 2025
summary: Tema de ícones de arquivos em pixel art 16×16 para VS Code, com vasta cobertura de linguagens, ferramentas e pastas.
outcome: Mais de 1.000 instalações no Marketplace; o projeto inclui mais de 100 definições de ícones, catálogo público com todos os ícones e publicação automatizada por tags.
repository: https://github.com/Azganoth/vscode-pixel-icons
website: https://vscode-pixel-icons.vercel.app/
tags:
  - VS Code
  - TypeScript
---

O **Pixel Icons** é um tema de ícones de arquivos em pixel art 16×16 para VS Code. O projeto partiu de um conjunto creditado de ícones criado por Platinumaniac e foi expandido para cobrir mais linguagens, frameworks, runtimes, gerenciadores de pacotes, arquivos de configuração e pastas.

Atualmente a extensão contém mais de 100 definições de ícones e mapeia mais de 390 itens, incluindo extensões, nomes exatos de arquivos e padrões de pastas.

---

## 📦 Adoção e verificação

- A versão `1.4.0` está publicada no [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Azganoth.pixel-icons), onde a extensão ultrapassou 1.000 instalações.
- Um teste automatizado verifica se o VS Code reconhece a extensão no ambiente de testes.
- Um script transforma os mapeamentos do tema em um workspace de amostras para revisão visual.
- O GitHub Actions constrói e publica a extensão no VS Code Marketplace ao receber uma tag de versão ou por execução manual.

## 🧩 Design e manutenção do tema

### Cobertura declarativa sem comportamento em runtime

Um tema útil precisa diferenciar extensões genéricas de arquivos específicos de configuração e lockfiles, além de representar pastas recolhidas e expandidas. O Pixel Icons registra o `assets/theme.json` como uma contribuição declarativa no `package.json` e não define eventos de ativação, deixando a resolução dos mapeamentos e a renderização a cargo do VS Code.

Assim, a extensão não mantém processos em segundo plano, enquanto nomes específicos de arquivos podem substituir o mapeamento genérico de suas extensões. O catálogo reúne linguagens consolidadas e ferramentas como Vite, Vitest, Tauri, Oxc e Vercel.

### Um sistema visual consistente em 16×16

Assets pequenos em pixel art perdem nitidez quando silhueta, contraste ou peso visual variam dentro de uma coleção grande. Mantenho variantes específicas para testes, declarações TypeScript, arquivos de configuração, lockfiles e pastas recolhidas ou expandidas e as reviso em workspaces representativos.

O changelog registra tanto novas coberturas quanto ajustes de proporção, realce e contraste. Tecnologias relacionadas continuam fáceis de distinguir dentro de uma mesma linguagem visual, e os estados das pastas preservam uma silhueta consistente.

### Um catálogo fácil de revisar

Um script em TypeScript deriva arquivos e pastas de amostra do manifesto. Quando um nome exato de arquivo colide com uma pasta gerada, o script grava esse arquivo em um diretório `_COLLISIONS_`. O [catálogo público](https://vscode-pixel-icons.vercel.app/) agrupa os ícones por ecossistema e apresenta extensões e nomes de arquivos, um link de instalação e uma rota para solicitar novos ícones.

A extensão, o site, o changelog e o workflow de release são mantidos no mesmo repositório.

## 🏗️ Arquitetura de distribuição

```text
theme.json -> contribuição de tema de ícones no VS Code -> renderização no Explorer
theme.json -> gerador em TypeScript -------------> workspace de revisão
catálogo em docs --------------------------------> Vercel
tag de versão -> GitHub Actions -----------------> VS Code Marketplace
```

### Restrições de manutenção

O teste automatizado verifica se o VS Code encontra a extensão, mas não valida individualmente todos os mapeamentos ou assets. A revisão do catálogo continua sendo visual, com apoio do workspace gerado. A galeria do site é mantida manualmente em vez de ser gerada a partir do `theme.json`, portanto precisa ser sincronizada quando os ícones mudam. Como os assets são pixel art, níveis fracionários de zoom no VS Code podem introduzir anti-aliasing e perda de nitidez.

---

## 🛠️ Tech stack

- **Plataforma:** Contribuição declarativa de tema de ícones do VS Code, Visual Studio Marketplace
- **Assets:** Ícones PNG 16×16, manifesto declarativo em JSON
- **Ferramentas:** TypeScript, Node.js, pnpm
- **Qualidade:** Teste de integração com VS Code, workspace de revisão, changelog versionado
- **Distribuição:** GitHub Actions, Vercel
