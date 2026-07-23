---
title: Fix My Halo
category: Ferramenta
year: 2026
summary: Ferramenta web e CLI para Windows que remove artefatos de texturas com transparencia.
outcome: Um único core testado em Rust disponibilizado como ferramenta em Wasm no navegador e CLI nativa com processamento paralelo, além da validação direta de um modder de RimWorld.
repository: https://github.com/Azganoth/fix-my-halo
website: https://fixmyhalo.vercel.app
tags:
  - Rust
  - WebAssembly
  - React
  - TypeScript
  - Tailwind CSS
---

O **Fix My Halo** automatiza a dilatação de textura, também conhecida como alpha bleeding, em sprites transparentes usados em jogos. Em alguns métodos de filtragem, a GPU combina os pixels visíveis da borda com valores RGB armazenados em pixels transparentes. Quando esses valores ocultos são brancos ou pretos, a interpolação cria um contorno ao redor do sprite.

A aplicação web processa os arquivos localmente no navegador, sem enviá-los para um backend. A CLI nativa oferece a mesma correção para arquivos individuais, diretórios e padrões glob.

---

## 🧩 Decisões técnicas

### 1. Um core em Rust para dois formatos de distribuição

**Desafio:** O navegador oferece o fluxo mais acessível, enquanto uma CLI nativa atende melhor projetos de mods com muitas texturas. Duas implementações permitiriam que o comportamento do processamento divergisse com o tempo.

**Implementação:** O `engine.rs` concentra a função `process_image` e as etapas de dilatação. O `lib.rs` expõe esse core por meio do `wasm-bindgen`: recebe os bytes da imagem e devolve bytes em PNG ao navegador. Já o `main.rs` usa o mesmo engine por trás de uma interface nativa construída com Clap.

**Resultado:**

- Os dois formatos de distribuição usam o mesmo algoritmo e a mesma interpretação do padding.
- O código específico de cada plataforma fica restrito à descoberta de arquivos, transferência de bytes, progresso e saída.

### 2. Alpha bleeding iterativo sem alterar a transparência

**Desafio:** A ferramenta precisa substituir os dados RGB problemáticos dentro de pixels totalmente transparentes sem mudar o formato visível do sprite nem suas bordas semitransparentes.

**Implementação:** Cada etapa da dilatação percorre os pixels totalmente transparentes e copia a cor do primeiro pixel não transparente encontrado entre os oito vizinhos. A repetição expande as cores da borda em um pixel por unidade de `padding` configurada. Ao final, o canal alpha original é restaurado em toda a imagem.

**Resultado:**

- Apenas os dados de cor ocultos são alterados; a transparência original permanece intacta.
- O processamento termina antes do limite quando outra etapa não produziria nenhuma mudança.

### 3. Processamento isolado no navegador e jobs paralelos na CLI

**Desafio:** O processamento de imagens não deve bloquear a interface em React, enquanto lotes grandes na CLI devem aproveitar as threads disponíveis da CPU.

**Implementação:**

- **Navegador:** Um Web Worker inicializa o módulo Wasm, recebe cada job e transfere os buffers de entrada e saída sem copiá-los pela thread da interface.
- **CLI:** Entradas por arquivo, diretório ou padrão glob são convertidas em jobs. O `par_iter()` do Rayon distribui esses jobs entre suas threads, enquanto a CLI exibe o progresso e um resumo ao final.

**Resultado:**

- A interface continua atualizando o estado dos arquivos enquanto o Wasm processa uma imagem.
- Lotes de diretórios, inclusive recursivos, processam vários arquivos ao mesmo tempo na CLI.

---

## 🏗️ Arquitetura e fluxos de uso

Rust foi escolhido principalmente para permitir que o navegador e a CLI reutilizassem a mesma implementação, não porque o algoritmo fosse inviável em JavaScript. A crate compartilhada é compilada com `wasm-pack` para o navegador e como executável nativo para processamento em lote.

```text
Interface React -> buffer transferível -> Web Worker -> binding Wasm -> core Rust
Entrada CLI -> descoberta de arquivos -> jobs do Rayon ------------> core Rust
```

A interface em React oferece lotes por drag and drop, ajuste do raio de dilatação, status por arquivo, download individual e exportação em ZIP. A fila do navegador processa uma imagem por vez fora da thread principal; o paralelismo entre arquivos fica a cargo da CLI.

## 📦 Distribuição e verificação

A [versão 0.2.0](https://github.com/Azganoth/fix-my-halo/releases/tag/v0.2.0) oferece um executável para Windows x64. Depois de baixar o `fixmyhalo.exe`, ele pode processar um arquivo ou percorrer um diretório recursivamente:

```powershell
.\fixmyhalo.exe "Textures\Player.png"
.\fixmyhalo.exe "C:\MeuMod\Textures" --recursive
```

- Testes unitários em Rust cobrem a seleção do pixel vizinho, uma etapa de dilatação, padding com várias etapas, cores transparentes já corrigidas e imagens totalmente opacas.
- O GitHub Actions gera o executável para Windows x64 sempre que uma tag de versão é enviada e anexa o arquivo à release correspondente.
- A [aplicação web](https://fixmyhalo.vercel.app/) oferece o fluxo sem instalação.

Depois que compartilhei o projeto com a comunidade de RimWorld, um modder relatou que ele removeu uma borda esbranquiçada de uma textura de bancada que não havia conseguido corrigir manualmente. O [post de lançamento e a discussão](https://www.reddit.com/r/RimWorld/comments/1qnqxwi/tool_fix_my_halo_an_opensource_web_cli_tool_to/) trazem validação direta do público para o qual a ferramenta foi criada.

### Escopo e limitações

O projeto não publica benchmarks entre plataformas. Por isso, as afirmações de desempenho se limitam a decisões observáveis na implementação: o processamento fica fora da thread da interface no navegador, e a CLI paraleliza os jobs por arquivo. O executável nativo disponível atualmente é voltado ao Windows x64.

---

## 🛠️ Tech stack

- **Core de processamento:** Rust, image
- **Concorrência:** Web Workers, buffers transferíveis, Rayon
- **Web:** WebAssembly, React, TypeScript, Zustand
- **Interface:** Tailwind CSS, Radix UI, Motion
- **Distribuição:** Clap, GitHub Actions, Vercel
