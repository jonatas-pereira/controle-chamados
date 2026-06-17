# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).


# Sistema de Controle de Chamados - Frontend

## Descrição

Aplicação web desenvolvida para gerenciamento de chamados, permitindo cadastrar, visualizar, editar, excluir e filtrar chamados de forma simples e intuitiva.

A aplicação consome uma API REST desenvolvida em NestJS e apresenta uma interface responsiva construída com Vue.js.

## Tecnologias Utilizadas

### Vue.js

O Vue.js foi escolhido por sua simplicidade, organização baseada em componentes e facilidade de integração com APIs REST.

### TypeScript

O TypeScript foi utilizado para proporcionar maior segurança no desenvolvimento através da tipagem estática, reduzindo erros e melhorando a manutenção do código.

### Vue Router

Responsável pelo gerenciamento das rotas da aplicação, permitindo a navegação entre as páginas sem recarregamento do navegador.

### Axios

Utilizado para realizar as requisições HTTP para a API.

### Tailwind CSS

Escolhido para agilizar a construção da interface, fornecendo classes utilitárias que facilitam a criação de layouts modernos e responsivos.

## Funcionalidades

* Listagem de chamados
* Cadastro de novos chamados
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

## Clonando o projeto

```bash
git clone <url-do-repositorio>
cd <nome-do-projeto>
```

## Instalando as dependências

```bash
npm install
```

## Configuração da API

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000
```

Configure a instância do Axios para utilizar a variável:

```ts
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})
```

## Executando a aplicação

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

## Observações

Para que a aplicação funcione corretamente, a API backend deve estar em execução.

Backend: NestJS + TypeORM + SQLite.

