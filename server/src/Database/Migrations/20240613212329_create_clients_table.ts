import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("clients", function (table) {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("name", 50).notNullable();
        table.string("phone", 15).notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("clients");
}

