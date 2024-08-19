import type { Knex } from "knex";

//Cria a tabela do BD
export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('transactions', (table) => {
        table.uuid('id').primary(),
        table.text('title').notNullable(),
        table.decimal('amount', 10, 2).notNullable(),
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    })
}

//Desfaz o que foi feito no método UP
export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('transactions')
}