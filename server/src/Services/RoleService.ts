import IRoleModel from "../Interfaces/Role/IRoleModel";
import IRoleService from "../Interfaces/Role/IRoleService";

import APIError from "../Exceptions/APIError";

class RoleService implements IRoleService {
    private readonly RoleModel: IRoleModel;

    constructor(roleModel: IRoleModel) {
        this.RoleModel = roleModel;
    }

    public FindRole = async (name: string) => {
        const role = await this.RoleModel.FindOne({ name });

        if (!role) {
            throw APIError.BadRequest(`Роль ${role.name} не найдена`)
        }

        return role;
    };
}

export default RoleService;
