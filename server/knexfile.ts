import { config } from "dotenv";
import type { Knex } from "knex";

config();

const knexConfig: { [key: string]: Knex.Config } = {
    development: {
        client: "pg",
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            charset: "utf8",
        },
        migrations: {
            directory: "./src/Database/Migrations",
        },
        seeds: {
            directory: "./src/Database/Seeds",
        },
        pool: {
            min: 0,
            max: 7,
        },
    },
};

export default knexConfig;
