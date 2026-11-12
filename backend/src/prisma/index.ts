
import "dotenv/config"
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Pega a URL de conexão do banco que está no .env
const connectionString = `${process.env.DATABASE_URL!}`

// Cria um adaptador usando a URL do banco
// Esse adaptador será responsável por conectar ao PostgreSQL
const adapter = new PrismaPg({ connectionString })

// Cria uma instância do Prisma Client utilizando o adaptador
// Através dessa variável você poderá acessar as tabelas do banco
const prismaClient = new PrismaClient({ adapter })

// Exporta a instância para ser utilizada em qualquer arquivo do projeto
export default prismaClient;