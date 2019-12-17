import IFilme from "./filme";

export interface IPersonagem {
    filme: IFilme
    nome: string
    altura: number
    peso?: number
    genero: string
    nascimento: string
}