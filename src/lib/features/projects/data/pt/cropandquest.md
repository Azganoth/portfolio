---
title: Crop & Quest
category: Aplicação web
year: 2026
summary: Editor local-first de retratos para RPGs, com vários presets de jogos, formatos personalizados reutilizáveis e exportação com dimensões exatas.
outcome: Entregou um pipeline inteiramente no navegador para conjuntos de retratos em PNG, BMP e TGA, validado por testes em Vitest e fluxos do Playwright em vários browsers.
repository: https://github.com/Azganoth/crop-and-quest
website: https://cropquest.vercel.app
tags:
  - Next.js
  - React
  - TypeScript
  - Canvas API
  - Vitest
  - Playwright
---

O **Crop & Quest** prepara retratos personalizados para RPGs que exigem dimensões, formatos, convenções de nomes e locais de instalação específicos para os retratos. Seus 20 presets definem 42 variantes de retratos para jogos da Infinity Engine, RPGs da Owlcat, Pillars of Eternity, Shadowrun, Wasteland, Neverwinter Nights e outros títulos.

O usuário seleciona uma imagem local, recorta cada variante necessária, revisa os arquivos gerados e faz o download individual ou em ZIP. A imagem original e os retratos gerados permanecem no navegador; a aplicação não exige conta, banco de dados, armazenamento em nuvem nem processamento de imagens no servidor.

---

## 🧩 Decisões técnicas

### 1. Um único editor guiado por presets tipados

**Desafio:** Cada jogo exige uma combinação diferente de dimensões, proporções, formatos, padrões de nomes, estruturas de pastas e instruções de instalação. Inserir essas regras diretamente nos componentes de página deixaria a interface acoplada a cada título.

**Implementação:** Um modelo tipado de `Preset` define variantes, comportamento da exportação, limites de nomes e instruções de instalação. O fluxo no App Router resolve um dos presets integrados ou um preset personalizado armazenado localmente. O Valibot valida os formulários de presets personalizados e os nomes dos retratos antes que esses valores cheguem ao pipeline de exportação.

**Resultado:**

- As mesmas rotas de seleção, recorte, revisão e exportação atendem às 42 variantes integradas.
- Novos jogos podem ser adicionados como dados, sem outra implementação do editor.
- O usuário pode criar, editar, reutilizar e excluir presets personalizados sem uma conta.

### 2. Arquivos exatos gerados no navegador, inclusive em formatos antigos

**Desafio:** O recorte visual precisa se transformar em um arquivo com dimensões, rotação, formato e nome exatos. RPGs mais antigos também exigem BMP ou TGA, formatos que não estão disponíveis nos encoders padrão da Canvas API.

**Implementação:** O `react-easy-crop` fornece a área selecionada em pixels. O pipeline primeiro desenha a rotação em um canvas intermediário e depois renderiza o recorte em outro canvas com a largura e a altura exatas do preset. A codificação nativa do canvas cuida de PNG, JPEG e WebP; encoders binários próprios geram BMP de 24 bits e TGA de 32 bits. Templates de nomes definem cada caminho de download, e o JSZip monta o conjunto completo.

**Resultado:**

- Os presets incluídos podem gerar PNG, BMP e TGA para jogos atuais e antigos.
- Downloads individuais e arquivos ZIP seguem as dimensões, os nomes e a estrutura de pastas definidos pelo preset escolhido.
- A recodificação pelo canvas evita levar os metadados da imagem original para os retratos exportados.

### 3. Separação explícita entre estado temporário e persistente

**Desafio:** O editor passa por upload, várias rotas de recorte, revisão e exportação, mas as imagens de origem não devem ser persistidas. Ao mesmo tempo, as definições de presets personalizados precisam sobreviver ao reinício do navegador.

**Implementação:** O Zustand mantém a imagem ativa, a object URL e os recortes em uma sessão temporária. Trocar ou limpar a imagem revoga as URLs anteriores, enquanto as rotas redirecionam sessões incompletas para a seleção de imagem. Um aviso antes de fechar a página protege o trabalho em andamento. Os metadados dos presets personalizados usam outra store com persistência, permitindo reutilizá-los sem armazenar as imagens do usuário.

**Resultado:**

- Imagens ausentes e rotas de presets inválidos são tratadas com redirecionamentos explícitos.
- A limpeza da sessão libera recursos do navegador em vez de manter blobs antigos.
- As imagens do usuário permanecem temporárias, enquanto as configurações reutilizáveis continuam disponíveis localmente.

---

## 🏗️ Fluxo de imagem e exportação

```text
preset tipado -> proporção, dimensões, formato, nome e instruções de instalação
imagem local -> object URL -> estado do recorte -> canvas -> encoder -> Blob
                                                               |
                                                   download individual ou ZIP
```

O upload aceita arquivos locais em PNG, JPEG e WebP com até 10 MB. A etapa de seleção rejeita arquivos vazios, imagens HEIC ou HEIF, tipos MIME incompatíveis e links externos arrastados antes de criar a object URL local.

## ✅ Entrega e verificação

- Testes unitários e de componentes para schemas, formulários, resolução de presets, encoders, exportação, rotas, cálculos e stores do Zustand.
- Fluxos no Playwright cobrem geração de retratos e download do ZIP, ciclo de vida de presets personalizados e controles do editor.
- Cada fluxo do Playwright é executado no Chromium, Firefox, WebKit e em um perfil mobile do Chrome.
- O GitHub Actions separa as verificações de formatação, lint e tipos dos jobs de testes unitários e end-to-end. Execuções de navegador não canceladas mantêm o relatório HTML por 30 dias.
- A [aplicação publicada](https://cropquest.vercel.app) oferece o fluxo completo sem cadastro.

### Escopo e limitações

A velocidade e o uso de memória dependem do navegador e do dispositivo; o projeto não publica benchmarks de processamento. A sessão ativa de retratos não sobrevive ao recarregamento da página por decisão de privacidade, enquanto os presets personalizados permanecem salvos. O editor processa uma imagem de origem por sessão e ainda não oferece criação de retratos em lote.

---

## 🛠️ Tech stack

- **Aplicação:** Next.js App Router, React, TypeScript
- **Pipeline de imagem:** Canvas API, react-easy-crop, encoders próprios de BMP e TGA, JSZip
- **Estado e formulários:** Zustand, TanStack Form, Valibot
- **Interface:** Tailwind CSS, Radix UI
- **Qualidade:** Vitest, Testing Library, Playwright, Oxlint
- **Distribuição:** GitHub Actions, Vercel
