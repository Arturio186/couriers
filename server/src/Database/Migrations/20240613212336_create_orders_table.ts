import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("orders", function (table) {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string("status", 50).notNullable();
        table.string("address", 255);
        table.text("note");
        table.decimal("map_x", 9, 6);
        table.decimal("map_y", 9, 6);
        table.string("client_name", 100);
        table.string("client_phone", 20);
        table.timestamp("order_time").notNullable();
        table.timestamp("delivery_time");
        table
            .uuid("courier_id")
            .references("id")
            .inTable("users");
        table
            .uuid("branch_id")
            .references("id")
            .inTable("branches");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("orders");
}
