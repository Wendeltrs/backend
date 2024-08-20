import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'

describe('Transactions Routes', async () => {
    beforeAll(async () => { //Antes de executar os testes, aguarda todas as transações do servidor serem executadas
        await app.ready()
    })
    afterAll(async () => { //Depois de execugar todos os testes, fecha a servidor
        await app.close()
    })
    beforeEach(() => {
        execSync('knex migrate:rollback --all')
        execSync('knex migrate:latest')
    })
    
    it('Should be able to create a new transaction', async () => { //Criando testes
        await request(app.server)
            .post('/transactions')
            .send({
                title: 'New Transaction',
                amount: 5000,
                type: 'credit'
            })
            .expect(201)
    })

    it('Should be able to list all transactions', async () => { 
        const createTransaction = await request(app.server)
            .post('/transactions')
            .send({
                title: 'New Transaction',
                amount: 5000,
                type: 'credit'
            })

        const cookies = createTransaction.get('Set-Cookie')

        if(!cookies) return

        const listTranssaction = await request(app.server)
            .get('/transactions')
            .set('Cookie', cookies)
            .expect(200)

        expect(listTranssaction.body.transactions).toEqual([ //Valida os dados criados
            expect.objectContaining({
                title: 'New Transaction',
                amount: 5000
            })
        ])
    })
})