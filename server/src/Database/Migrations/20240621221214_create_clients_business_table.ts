import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("client_business", function (table) {
        table
            .uuid("client_id")
            .references("id")
            .inTable("clients")
            .onDelete("CASCADE");
        table
            .uuid("business_id")
            .references("id")
            .inTable("businesses")
            .onDelete("CASCADE");
        table.primary(["business_id", "client_id"]);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("client_business");
}

