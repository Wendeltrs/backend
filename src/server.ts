import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

app.get('/hello', async () => { //Método GET
    const tables = knex('sqlite_schema').select('*')

    return tables
})

app.listen({
    port: 3333 //Porta
})
.then(() => {
    console.log('HTTP Server Running!')
})