import { FastifyInstance } from "fastify"
import { knex } from "../database"
import { z } from "zod"
import { randomUUID } from "crypto"

export async function transactionsRoutes(app: FastifyInstance){ //Criando plugin
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