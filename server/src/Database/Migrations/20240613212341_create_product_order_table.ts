import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("product_order", function (table) {
        table
            .integer("product_id")
            .unsigned()
            .references("id")
            .inTable("products")
            .onDelete("CASCADE");
        table
            .integer("order_id")
            .unsigned()
            .references("id")
            .inTable("orders")
            .onDelete("CASCADE");
        table.integer("quantity").notNullable();
        table.primary(["product_id", "order_id"]);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("product_order");
}
