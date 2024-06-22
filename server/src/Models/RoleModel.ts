import db from "../Database/db";

import IRole from "../Interfaces/Role/IRole";
import IRoleModel from "../Interfaces/Role/IRoleModel";

class RoleModel implements IRoleModel {
    private readonly tableName = "roles";

    public FindOne = async (conditions: Partial<IRole>): Promise<IRole | undefined> => {
        return db(this.tableName).where(conditions).first();
    }
}

export default new RoleModel();
