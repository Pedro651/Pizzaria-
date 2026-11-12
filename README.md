# 🍕 Sistema de Cardápio Digital — Pizzaria

Plataforma de cardápio digital desenvolvida para pizzarias, composta por uma aplicação mobile para clientes e um sistema web administrativo para gerenciamento de pedidos, produtos e categorias.

O projeto permite que clientes realizem pedidos pelo aplicativo mobile, enquanto os funcionários acompanham e gerenciam os pedidos através do painel web.

## 🚀 Tecnologias utilizadas

### Mobile
- **React Native** — Desenvolvimento mobile.
- **Expo** — Ambiente de desenvolvimento e execução.
- **TypeScript** — Tipagem estática.

### Web
- **Next.js** — Desenvolvimento da aplicação web.
- **React** — Construção de interfaces.
- **TypeScript** — Tipagem estática.
- **Tailwind CSS** — Estilização.

### Backend
- **Node.js** — Ambiente de execução.
- **Express** — Desenvolvimento da API REST.
- **Prisma ORM** — Comunicação com o banco de dados.
- **PostgreSQL** — Banco de dados relacional.
- **JWT** — Autenticação e gerenciamento de sessões.

## ✨ Funcionalidades

### 📱 Aplicativo Mobile — Cliente

- Visualização do cardápio digital.
- Listagem de produtos disponíveis.
- Separação de categorias entre comidas e bebidas.
- Seleção de produtos para realizar pedidos.
- Adição de produtos ao carrinho.
- Envio de pedidos para a pizzaria.

### 💻 Sistema Web — Funcionários

- Login e autenticação de funcionários.
- Visualização dos pedidos realizados pelo aplicativo mobile.
- Criação manual de pedidos.
- Cadastro de produtos.
- Edição de produtos.
- Exclusão de produtos.
- Criação e gerenciamento de categorias.
- Organização de categorias entre comidas e bebidas.
- Gerenciamento dos pedidos recebidos.

### 🔐 Segurança e autenticação

- Autenticação utilizando JWT.
- Proteção de rotas.
- Controle de acesso às funcionalidades administrativas.
- Validação de dados no backend.
- Configuração de CORS.

## 🔄 Integração entre as aplicações

O sistema possui duas interfaces integradas através de uma API REST:

- **Mobile:** permite que os clientes consultem o cardápio e realizem pedidos.
- **Web:** permite que os funcionários recebam, visualizem e criem pedidos, além de gerenciar produtos e categorias.

Os dados são centralizados no backend e armazenados no PostgreSQL.

## 🗄️ Banco de dados

O projeto utiliza PostgreSQL com Prisma ORM para gerenciamento das entidades e relacionamentos.

Principais entidades:
- Usuários.
- Produtos.
- Categorias.
- Pedidos.
- Itens dos pedidos.

## ⚙️ Instalação

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Instale as dependências de cada aplicação:

```bash
npm install
```

Configure as variáveis de ambiente no arquivo `.env`.

Execute as migrações do Prisma:

```bash
npx prisma migrate dev
```

Inicie o backend, o frontend web e o aplicativo mobile conforme as configurações de cada projeto.

## 👨‍💻 Desenvolvedor

Desenvolvido por **Pedro Andrade**.
