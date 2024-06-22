import IRole from "./IRole"

export default interface IRoleModel {
    FindOne: (conditions: Partial<IRole>) => Promise<IRole | undefined>
}