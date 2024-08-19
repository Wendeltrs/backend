import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

export const config: Knex.Config = { //Cria as configurações do BD
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: env.DATABASE_URL
    },
    migrations: {
        extension: 'ts',
        directory: './db/migrations'
    }
}

export const knex = setupKnex(config) //Cria a conexão com o BD SQLite