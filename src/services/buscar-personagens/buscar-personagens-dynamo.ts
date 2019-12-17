import { documentClient } from "../../utils/dynamo.client"
import { IPersonagem } from "../../models/personagem";

export const buscarPersonagensDynamo = async (filmeId: number) => {
    return documentClient
        .scan({ 
            TableName: 'Personagens',
            FilterExpression: 'filme.id = :filme_id',
            ExpressionAttributeValues: {
                ":filme_id": filmeId
            }
        })
        .promise()
        .then(result => result.Items && result.Items as IPersonagem[]);
}