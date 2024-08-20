import fastify from "fastify"
import { transactionsRoutes } from "./routes/transactions"
import cookie from "@fastify/cookie"

export const app = fastify()

app.register(cookie) //Criando cookies do fastify para manter contexto entre requisições
app.register(transactionsRoutes, { //Importando plugin
    prefix: 'transactions' //Todas as rotas que começarem com 'transactions', cairão no plugin 'transactionsRoutes'
})