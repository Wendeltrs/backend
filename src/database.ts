import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

export const config: Knex.Config = { //Cria as configurações do BD
    client: env.DATABASE_CLIENT,
    useNullAsDefault: true,
    connection: env.DATABASE_CLIENT == 'sqlite' ? {
        filename: env.DATABASE_URL
    } : env.DATABASE_URL,
    migrations: {
        extension: 'ts',
        directory: './db/migrations'
    }
}

export const knex = setupKnex(config) //Cria a conexão com o BD SQLite