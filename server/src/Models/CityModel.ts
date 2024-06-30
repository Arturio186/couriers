import db from "../Database/db";

import ICity from "../Interfaces/City/ICity";
import ICityModel from "../Interfaces/City/ICityModel";

class CityModel implements ICityModel {
    public readonly tableName = "cities";

    public FindByName = async (name: string): Promise<ICity[]> => {
        const cities = await db(this.tableName)
            .whereRaw(`LOWER(name) LIKE LOWER('${name}%')`)
            .limit(10)
            .returning<ICity[]>('*');

        return cities;
    }
}

export default new CityModel();
