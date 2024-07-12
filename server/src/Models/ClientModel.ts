import db from '../Database/db';
import IClient from '../Interfaces/Client/IClient';
import IClientModel from '../Interfaces/Client/IClientModel';

class ClientModel implements IClientModel {
    private readonly tableName = 'clients';
    private readonly clientBusinessTableName = 'client_business';

    public FindOrCreate = async (conditions: Partial<IClient>, business_id: string): Promise<IClient> => {
        let client = await db(this.tableName).where(conditions).first();
    
        if (!client) {
            const [newClient] = await db(this.tableName).insert(conditions).returning('*');
            client = newClient;
        }

        const clientBusiness = await db(this.clientBusinessTableName).where({ client_id: client.id, business_id }).first();

        if (!clientBusiness) {
            await db(this.clientBusinessTableName).insert({ client_id: client.id, business_id });
        }

        return client;
    }
}

export default new ClientModel();
