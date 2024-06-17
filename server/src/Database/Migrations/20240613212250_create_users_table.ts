import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", function (table) {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("first_name", 50).notNullable();
        table.string("last_name", 50).notNullable();
        table.string("email", 100).unique().notNullable();
        table.string("password", 255).notNullable();
        table.integer("role_id").unsigned().references("id").inTable("roles");
        table.boolean("is_email_activated").notNullable().defaultTo(false);
        table.string("activation_link");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("users");
}
