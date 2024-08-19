import { FastifyInstance } from "fastify"
import { knex } from "../database"
import { z } from "zod"
import { randomUUID } from "crypto"

export async function transactionsRoutes(app: FastifyInstance){ //Criando plugin
    app.get('/', async () => {
        const transactions = await knex('transactions').select('*')

        return { transactions }
    })

    app.get('/:id', async (request) => {
        const getTransactionParamsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = getTransactionParamsSchema.parse(request.params)

        const transactions = await knex('transactions').where('id', id).first()

        return { transactions }
    })

    app.get('/summary', async () => {
        const summary = await knex('transactions').sum('amount', { as: 'amount' }).first()

        return { summary }
    })

    app.post('/', async (request, reply) => {
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        })

        //Valida os dados do req.body (dados vindos da requisição), para ver se estão de acordo com os dados definidos no 'schema'
        const { title, amount, type } = createTransactionBodySchema.parse(request.body)

        await knex('transactions').insert({ //Inserindo dados
            id: randomUUID(),
            title,
            amount: type == 'credit' ? amount : amount * -1
        })

        return reply.status(201).send()
    })
}