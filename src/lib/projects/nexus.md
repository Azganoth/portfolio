---
title: Nexus
category: Web App
year: 2025
summary: Plataforma full-stack de agregação de links com dashboard de gerenciamento, autenticação segura e deploy contínuo.
repository: https://github.com/Azganoth/nexus
website: https://nexusapp.fly.dev
tags:
  - Next
  - React
  - Node
  - Express
  - Prisma
  - PostgreSQL
  - Docker
  - TypeScript
---

O Nexus resolve a dispersão de links em múltiplas plataformas, oferecendo uma solução unificada onde os usuários podem consolidar todos os seus perfis e projetos em um único "Hub" público e compartilhável, sob o slogan: "Seu universo, em um só lugar.". A aplicação foi construída do zero, abrangendo desde a arquitetura do banco de dados até o deploy contínuo em produção.

**Principais Funcionalidades**

- **Gerenciamento Completo de Perfil**: Usuários podem se cadastrar, fazer login, personalizar avatares com ferramenta de corte, editar bio e gerenciar a visibilidade de seus perfis.
- **Links Dinâmicos**: Interface com suporte a CRUD completo para links, incluindo reordenação com _drag-and-drop_ e controle de visibilidade individual para cada link.
- **Dashboard com Live Preview**: Um painel de controle intuitivo que exibe uma prévia em tempo real do perfil público conforme o usuário faz alterações.
- **Segurança e Conformidade**: Sistema de autenticação robusto com rotação de _refresh tokens_, fluxo de recuperação de senha e um sistema completo de gerenciamento de consentimento (LGPD/GDPR).
- **Portabilidade de Dados**: Funcionalidade que permite ao usuário exportar todos os seus dados em formato JSON a qualquer momento.

**Ferramentas e Tecnologias**

A arquitetura do projeto foi estruturada em um **monorepo** com Turborepo para gerenciar o código de forma coesa. O frontend foi desenvolvido com **Next.js** e **React** para criar uma interface moderna e reativa, enquanto o backend foi construído como uma API RESTful com **Node.js** e **Express**. A comunicação com o banco de dados **PostgreSQL** é gerenciada de forma segura e eficiente pelo **Prisma ORM**.

**Desafios Técnicos e Aprendizados**

- **Prevenção de Race Condition no Refresh de Tokens**: Para evitar que múltiplas requisições simultâneas com um token expirado disparassem várias tentativas de refresh, implementei uma "trava" com uma Promise compartilhada no `apiClient`. A primeira requisição inicia o processo de refresh, enquanto as outras aguardam a conclusão, eliminando a _race condition_ e prevenindo logouts inesperados.
- **Autenticação Server-Side com BFF**: Validar a sessão do usuário em Server Components do Next.js era um desafio, pois o endpoint de refresh (`POST /auth/refresh`) alterava o estado. A solução foi criar um endpoint "read-only" dedicado (`GET /auth/session`) para verificação de sessão no servidor, separando as responsabilidades e respeitando as restrições do Next.js.
- **Garantia de Unicidade de JWTs**: A biblioteca `jsonwebtoken` gerava tokens idênticos se chamada no mesmo segundo, causando falhas de chave única no banco de dados. Resolvi o problema utilizando a claim `jti` (JWT ID) do padrão RFC 7519, adicionando 16 bytes aleatórios a cada token para garantir sua unicidade criptográfica.
