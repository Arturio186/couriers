import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("branches", function (table) {
        table.increments("id").primary();
        table.string("name", 100).notNullable();
        table.integer("owner_id").unsigned().references("id").inTable("users");
        table.integer("city_id").unsigned().references("id").inTable("cities");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("branches");
}
