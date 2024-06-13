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
    map_x: number;
    map_y: number;
}

exports.seed = async function (knex: Knex): Promise<void> {
    const filePath = path.join(__dirname, "..", "cities.json");
    const citiesJSON: CityJSON[] = JSON.parse(
        fs.readFileSync(filePath, "utf8")
    );

    const cities: City[] = citiesJSON.map((city) => ({
        name: city["Город"],
        region: city["Регион"],
        map_x: parseFloat(city["Широта"]),
        map_y: parseFloat(city["Долгота"]),
    }));

    await knex("cities").del();

    await knex("cities").insert(cities);
};
