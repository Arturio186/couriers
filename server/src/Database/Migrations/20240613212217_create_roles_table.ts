import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("roles", function (table) {
        table.increments("id").primary();
        table.string("name", 50).unique().notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("roles");
}
