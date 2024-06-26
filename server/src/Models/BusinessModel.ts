import db from "../Database/db";

import IBusiness from "../Interfaces/Business/IBusiness";
import IBusinessModel from "../Interfaces/Business/IBusinessModel";

class BusinessModel implements IBusinessModel {
    private readonly tableName = "businesses";

    public Create = async (buisness: IBusiness): Promise<IBusiness> => {
        const [newBusiness] = await db(this.tableName).insert(buisness).returning<IBusiness[]>("*");

        return newBusiness;
    };
}

export default new BusinessModel();