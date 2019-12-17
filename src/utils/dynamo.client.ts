import { DynamoDB } from 'aws-sdk';
import IFilme from '../models/filme';

export const dynamodb = new DynamoDB({
  region: 'localhost',
  accessKeyId: 'xxxx',
  secretAccessKey: 'xxxx',
  endpoint: 'http://localhost:8000'
});

export const documentClient = new DynamoDB.DocumentClient(dynamodb.config);

export const apagarTabela = async () => {
  const tables: string[] = await dynamodb
    .listTables()
    .promise()
    .then(response => response.TableNames || []);
  await Promise
    .all([...tables]
      .map(element => dynamodb
        .deleteTable({ TableName: element })
        .promise()
      )
    );
};

export const criarTabela = async () => dynamodb
  .createTable({
    TableName: 'Filmes',
    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: 'HASH'
      }
    ],
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'N'
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  })
  .promise();


export const criarTabelaPersonagem = async () => dynamodb
  .createTable({
    TableName: 'Personagens',
    KeySchema: [
        {
        AttributeName: 'nome',
        KeyType: 'HASH'
        }
    ],
    AttributeDefinitions: [
        {
        AttributeName: 'nome',
        AttributeType: 'S'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
    })
    .promise();