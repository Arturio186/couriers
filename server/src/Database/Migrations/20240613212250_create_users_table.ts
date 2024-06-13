import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", function (table) {
        table.increments("id").primary();
        table.string("first_name", 50).notNullable();
        table.string("last_name", 50).notNullable();
        table.string("email", 100).unique().notNullable();
        table.string("password", 255).notNullable();
        table.integer("role_id").unsigned().references("id").inTable("roles");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("users");
}
