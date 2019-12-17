import IFilme from "../../models/filme";
import { documentClient } from "../../utils/dynamo.client";

export const salvarFilmeDynamo = async (filme: IFilme) => {
    return documentClient.put({ TableName: 'Filmes', Item: filme }).promise()

}