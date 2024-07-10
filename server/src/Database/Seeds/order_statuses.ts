import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("order_statuses").del();

    await knex("order_statuses").insert([
        { id: 1, name: "free" },
        { id: 2, name: "progress" },
        { id: 3, name: "delivered" },
    ]);
}
