import fastify from 'fastify'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const app = fastify()

app.register(transactionsRoutes) //Definindo plug-ins

app.listen({
    port: env.PORT //Porta
})
.then(() => {
    console.log('HTTP Server Running!')
})