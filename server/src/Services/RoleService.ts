import IRoleModel from "../Interfaces/Role/IRoleModel";
import IRoleService from "../Interfaces/Role/IRoleService";

class RoleService implements IRoleService {
    private readonly RoleModel: IRoleModel;

    constructor(roleModel: IRoleModel) {
        this.RoleModel = roleModel;
    }

    public FindRole = async (name: string) => {
        const role = await this.RoleModel.FindOne({ name });
        return role;
    };
}

export default RoleService;
