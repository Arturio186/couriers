import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("orders", function (table) {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
        table
            .integer("status_id")
            .unsigned()
            .references("id")
            .inTable("order_statuses")
            .onDelete("CASCADE");

        table.string("address", 255);
        table.text("note");
        table.specificType("coords", "geometry(Point, 4326)");
        table
            .uuid("client_id")
            .references("id")
            .inTable("clients")
            .onDelete("CASCADE");
        table.timestamp("delivery_time");
        table
            .uuid("courier_id")
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");
        table
            .uuid("branch_id")
            .references("id")
            .inTable("branches")
            .onDelete("CASCADE");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("orders");
}
