import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.raw("CREATE EXTENSION IF NOT EXISTS postgis");

    return knex.schema.createTable("cities", function (table) {
        table.increments("id").primary();
        table.string("name", 100).notNullable();
        table.string("region", 100);
        table.specificType("coords", "geometry(Point, 4326)"); // В postgis записывается (долгота, широта) (long, lat)
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("cities");
}
