import IClient from "./IClient"

export default interface IClientModel {
    FindOrCreate: (conditions: Partial<IClient>, business_id: string) => Promise<IClient>
}