# Candidate Interview Project - Guilherme Nunes

## Project Overview

```
Backend-Node-Test
├── 📁 database
│   ├── 📄 database_orm.sqlite
│   └── 📄 database_prisma.sqlite
├── 📁 prisma
│   ├── 📁 migrations
│   │   ├── 📁 initial_migration
│   │   │   └── 📄 migration.sql
│   │   └── ⚙️ migration_lock.toml
│   ├── 📁 seed
│   │   ├── 📁 data
│   │   │   └── 📄 pokemon.ts
│   │   ├── 📄 index.ts
│   │   └── 📄 prisma.client.ts
│   └── 📄 schema.prisma
├── 📁 src
│   ├── 📁 modules
│   │   ├── 📁 hello
│   │   │   ├── 📄 hello.controller.ts
│   │   │   ├── 📄 hello.graphql
│   │   │   ├── 📄 hello.module.ts
│   │   │   ├── 📄 hello.resolver.ts
│   │   │   ├── 📄 hello.service.ts
│   │   │   └── 📄 hello.spec.ts
│   │   ├── 📁 pokemon
│   │   │   ├── 📁 dto
│   │   │   │   ├── 📄 create-pokemon.dto.ts
│   │   │   │   └── 📄 update-pokemon.dto.ts
│   │   │   ├── 📄  pokemon.graphql
│   │   │   ├── 📄 pokemon.controller.ts
│   │   │   ├── 📄 pokemon.module.ts
│   │   │   ├── 📄 pokemon.resolver.ts
│   │   │   ├── 📄 pokemon.service.ts
│   │   │   └── 📄 pokemon.spec.ts
│   │   └── 📁 prisma
│   │       ├── 📄 prisma.module.ts
│   │       └── 📄 prisma.service.ts
│   ├── 📄 app.module.ts
│   ├── 📄 generate-typings.ts
│   ├── 📄 graphql.schema.ts
│   └── 📄 main.ts
├── 📁 typeorm
│   └── 📁 migrations
│       └── 📄 1742154148799-create-pokemon-table.ts
├── 📄 .eslintrc.js
├── ⚙️ .gitignore
├── ⚙️ .prettierrc
├── 📘 Candidate Interview Project.docx
├── 📝 README.md
├── 📄 jest.config.js
├── ⚙️ nest-cli.json
├── ⚙️ package.json
└── ⚙️ tsconfig.json
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Git

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Panzer-Sigma/Backend-Node-Test

Todas as instruções no projeto!)
cd DWS-BACKEND-NODE-TEST
```

### 2. Install Dependencies

```bash
npm install

```

### 3. Generate Prisma Client

```bash
npm run prisma generate
npx prisma migrate deploy
npx prisma db seed
```

## Running the Application

```bash
npm run build
npm run start

```

The application will start on `http://localhost:4000`


## Running Tests

```bash
npm run test


## 📡 API Documentation

### REST API Endpoints

Base URL: `http://localhost:4000`

#### 1. Create a Pokemon

**Endpoint:** `POST /pokemon`

**Request Body:**
```json
{
  "name": "pikachu",
  "type": "ELECTRIC"
}
```

**Response:**
```json
{
  "id": 152,
  "name": "pikachu",
  "type": "ELECTRIC",
  "created_at": "2024-01-15T10:30:00.000Z"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:4000/pokemon \
  -H "Content-Type: application/json" \
  -d '{"name":"pikachu","type":"ELECTRIC"}'
```

#### 2. Get All Pokemon

**Endpoint:** `GET /pokemon`

**Response:**
```json
[
  {
    "id": 1,
    "name": "bulbasaur",
    "type": "GRASS",
    "created_at": "2024-01-15T10:00:00.000Z"
  },
  {
    "id": 2,
    "name": "ivysaur",
    "type": "GRASS",
    "created_at": "2024-01-15T10:00:00.000Z"
  }
]
```

**cURL Example:**
```bash
curl http://localhost:4000/pokemon
```

#### 3. Get a Single Pokemon

**Endpoint:** `GET /pokemon/:id`

**Response:**
```json
{
  "id": 1,
  "name": "bulbasaur",
  "type": "GRASS",
  "created_at": "2024-01-15T10:00:00.000Z"
}
```

**cURL Example:**
```bash
curl http://localhost:4000/pokemon/1
```

#### 4. Update a Pokemon

**Endpoint:** `PUT /pokemon/:id`

**Request Body:**
```json
{
  "name": "bulbasaur-updated",
  "type": "GRASS"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "bulbasaur-updated",
  "type": "GRASS",
  "created_at": "2024-01-15T10:00:00.000Z"
}
```

**cURL Example:**
```bash
curl -X PUT http://localhost:4000/pokemon/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"bulbasaur-updated"}'
```

#### 5. Delete a Pokemon

**Endpoint:** `DELETE /pokemon/:id`

**Response:**
```json
{
  "message": "Pokemon with ID 1 has been deleted"
}
```

**cURL Example:**
```bash
curl -X DELETE http://localhost:4000/pokemon/1
```

### GraphQL API

**Endpoint:** `http://localhost:4000/graphql`


#### Queries

##### Get All Pokemon

```graphql
query {
  findManyPokemon {
    id
    name
    type
    created_at
  }
}
```

##### Get a Single Pokemon

```graphql
query {
  findOnePokemon(id: 1) {
    id
    name
    type
    created_at
  }
}
```

#### Mutations

##### Create a Pokemon

```graphql
mutation {
  createOnePokemon(data: { name: "pikachu", type: "ELECTRIC" }) {
    id
    name
    type
    created_at
  }
}
```

##### Update a Pokemon

```graphql
mutation {
  updateOnePokemon(id: 1, data: { name: "bulbasaur-updated" }) {
    id
    name
    type
    created_at
  }
}
```

##### Delete a Pokemon

```graphql
mutation {
  deleteOnePokemon(id: 1) {
    message
  }
}
```


