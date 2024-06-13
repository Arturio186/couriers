import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("branch_user", function (table) {
        table
            .integer("branch_id")
            .unsigned()
            .references("id")
            .inTable("branches")
            .onDelete("CASCADE");
        table
            .integer("user_id")
            .unsigned()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");
        table.primary(["branch_id", "user_id"]);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("branch_user");
}
