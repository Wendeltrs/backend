import fastify from 'fastify'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'

const app = fastify()

app.register(cookie) //Criando cookies do fastify para manter contexto entre requisições
app.register(transactionsRoutes, { //Importando plugin
    prefix: 'transactions' //Todas as rotas que começarem com 'transactions', cairão no plugin 'transactionsRoutes'
})

app.listen({
    port: env.PORT //Porta
})
.then(() => {
    console.log('HTTP Server Running!')
})