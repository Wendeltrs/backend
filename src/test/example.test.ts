import { afterAll, beforeAll, test } from 'vitest'
import request from 'supertest'
import { app } from './../app'

beforeAll(async () => { //Antes de executar os testes, aguarda todas as transações do servidor serem executadas
    await app.ready()
})
afterAll(async () => { //Depois de execugar todos os testes, fecha a servidor
    await app.close()
})

test('User can create a new transaction', async () => { //Criando testes
    await request(app.server)
        .post('/transactions')
        .send({
            title: 'New Transaction',
            amount: 5000,
            type: 'credit'
        })
        .expect(201)
})