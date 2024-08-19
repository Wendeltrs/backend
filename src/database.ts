import { knex as setupKnex } from 'knex'

export const knex = setupKnex({ //Cria a conexão com o BD SQLite
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: './tmp/app.db'
    }
})