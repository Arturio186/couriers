import IRole from "./IRole";

export default interface IRoleService {
    FindRole: (name: string) => Promise<IRole | undefined>
}
