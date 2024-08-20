import { FastifyInstance } from "fastify"
import { knex } from "../database"
import { string, z } from "zod"
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

        let sessionId =  request.cookies.sessionId //Se existir cookie, salva na variável

        if(!sessionId){ //Se não existir cookie, cria um novo
            sessionId = randomUUID()

            reply.cookie('sessionId', sessionId, { //Salavando o cookie
                path: '/',
                maxAge: 60 * 60 * 24 * 7 //O cookie vai durar 7 dias
            }) 
        }

        await knex('transactions').insert({ //Inserindo dados
            id: randomUUID(),
            title,
            amount: type == 'credit' ? amount : amount * -1,
            session_id: sessionId
        })

        return reply.status(201).send()
    })

    app.delete('/:id', async (request, reply) => {
        const deleteTransactionsParamsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = deleteTransactionsParamsSchema.parse(request.params)

        await knex('transactions').where('id', id).del()

        return reply.status(204).send()
    })

    app.put('/:id', async (request, reply) => {
        const updateTransactionsBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        })

        const { title, amount, type } = updateTransactionsBodySchema.parse(request.body)

        const updateTransactionsParamsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = updateTransactionsParamsSchema.parse(request.params)

        await knex('transactions').where('id', id).update({
            id: randomUUID(),
            title,
            amount: type == 'credit' ? amount : amount * -1
        })

        return reply.status(204).send()
    })
}