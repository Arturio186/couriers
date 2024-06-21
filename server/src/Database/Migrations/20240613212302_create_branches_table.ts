import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("branches", function (table) {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("name", 100).notNullable();
        table
            .uuid("business_id")
            .references("id")
            .inTable("businesses")
            .onDelete("CASCADE");
        table
            .integer("city_id")
            .unsigned()
            .references("id")
            .inTable("cities")
            .onDelete("CASCADE");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("branches");
}
