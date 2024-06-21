import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("product_order", function (table) {
        table
            .uuid("product_id")
            .references("id")
            .inTable("products")
            .onDelete("CASCADE");
        table
            .uuid("order_id")
            .references("id")
            .inTable("orders")
            .onDelete("CASCADE");
        table.integer("quantity").notNullable();
        table.decimal("product_price", 10, 2).notNullable();
        table.primary(["product_id", "order_id"]);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("product_order");
}
