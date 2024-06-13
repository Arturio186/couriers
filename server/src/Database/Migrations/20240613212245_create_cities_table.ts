import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("cities", function (table) {
        table.increments("id").primary();
        table.string("name", 100).notNullable();
        table.string("region", 100);
        table.decimal("map_x", 9, 6);
        table.decimal("map_y", 9, 6);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("cities");
}
