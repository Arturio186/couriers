import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("order_statuses", function (table) {
        table.increments("id").primary();
        table.string("name", 50).notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("order_statuses");
}

