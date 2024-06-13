import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("products", function (table) {
        table.increments("id").primary();
        table.string("name", 100).notNullable();
        table.decimal("price", 10, 2).notNullable();
        table
            .integer("category_id")
            .unsigned()
            .references("id")
            .inTable("categories");
        table
            .integer("branch_id")
            .unsigned()
            .references("id")
            .inTable("branches");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("products");
}
