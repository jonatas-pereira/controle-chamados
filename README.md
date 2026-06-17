# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).


# Sistema de Controle de Chamados - Frontend

## Descrição

Aplicação web desenvolvida para gerenciamento de chamados, permitindo cadastrar, visualizar, editar, excluir e filtrar chamados.

A aplicação consome uma API REST desenvolvida em NestJS e possui uma interface construída com Vue.js.

## Tecnologias Utilizadas

### Vue.js

Utilizado para construção da interface através de componentes reutilizáveis e reativos.

### TypeScript

Utilizado para fornecer tipagem estática e melhorar a manutenção do código.

### Vue Router

Responsável pelo gerenciamento das rotas da aplicação.

### Axios

Utilizado para comunicação com a API.

### Tailwind CSS

Utilizado para estilização da interface de forma rápida e consistente.

## Funcionalidades

* Cadastro de chamados
* Listagem de chamados
* Visualização de detalhes de um chamado
* Edição de chamados
* Exclusão de chamados
* Filtro por atendente
* Filtro por prioridade
* Filtro por estado
* Busca por título

## Pré-requisitos

* Node.js 18 ou superior
* npm

## Instalação

```bash
npm install
```

## Executando o projeto

```bash
npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:5173
```

## Gerando build para produção

```bash
npm run build
```

## Observação

Para utilização completa da aplicação, o backend deve estar em execução.
