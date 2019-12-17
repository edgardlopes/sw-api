import { documentClient } from "../../utils/dynamo.client";
import { IPersonagem } from "../../models/personagem";

export const salvarPersonagemDynamo = (personagem: IPersonagem) => {
    return documentClient.put({ TableName: 'Personagens', Item: personagem }).promise()
}