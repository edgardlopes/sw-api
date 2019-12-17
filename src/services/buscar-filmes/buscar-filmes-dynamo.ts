import { documentClient } from "../../utils/dynamo.client"
import IFilme from "../../models/filme";

export const buscarFilmesDynamo = async () : Promise<IFilme[]> => {
    return documentClient
        .scan({ TableName: 'Filmes' })
        .promise()
        .then(result => result.Items ? result.Items as IFilme[] : []);
}