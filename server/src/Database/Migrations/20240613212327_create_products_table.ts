import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("products", function (table) {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("name", 100).notNullable();
        table.decimal("price", 10, 2).notNullable();
        table
            .uuid("category_id")    
            .references("id")
            .inTable("categories");
        table
            .uuid("branch_id")
            .references("id")
            .inTable("branches");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("products");
}
