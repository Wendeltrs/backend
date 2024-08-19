import { knex as setupKnex, Knex } from 'knex'

export const config: Knex.Config = { //Cria as configurações do BD
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: './db/app.db'
    },
    migrations: {
        extension: 'ts',
        directory: './db/migrations'
    }
}

export const knex = setupKnex(config) //Cria a conexão com o BD SQLite