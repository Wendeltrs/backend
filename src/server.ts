import fastify from 'fastify'
import { knex } from './database'
import { randomUUID } from 'crypto'
import { title } from 'process'
import { env } from './env'

const app = fastify()

/*
const transaction = await knex('transactions').insert({  INSERINDO DADOS NA TABELA
    id: randomUUID(),
    amount: 1000
})
return transaction
*/
app.get('/hello', async () => { //Método GET
    const transaction = await knex('transactions')
        .where('amount', 1000)
        .select('*')

    return transaction
})

app.listen({
    port: env.PORT //Porta
})
.then(() => {
    console.log('HTTP Server Running!')
})