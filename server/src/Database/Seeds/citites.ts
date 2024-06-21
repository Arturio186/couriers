import fs from "fs";
import path from "path";
import { Knex } from "knex";

interface CityJSON {
    Город: string;
    Регион: string;
    Широта: string;
    Долгота: string;
}

interface City {
    name: string;
    region: string;
    coords: Knex.Raw
}

export async function seed(knex: Knex): Promise<void> {
    const filePath = path.join(__dirname, "..", "cities.json");
    const citiesJSON: CityJSON[] = JSON.parse(
        fs.readFileSync(filePath, "utf8")
    );

    const cities: City[] = citiesJSON.map((city) => ({
        name: city["Город"],
        region: city["Регион"],
        coords: knex.raw(`ST_GeomFromText('POINT(${city['Долгота']} ${city['Широта']})', 4326)`)
    }));

    await knex("cities").del();

    await knex("cities").insert(cities);
};
