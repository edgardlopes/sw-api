import { executeQuery } from "../../utils/mysql";
import { IPersonagem } from "../../models/personagem";


const sql = `INSERT INTO personagem (filme_id, nome, altura, peso, genero, nascimento) 
                VALUES (?, ?, ?, ?, ?, ?); `

export const salvarPersonagemMysql = async (personagem: IPersonagem): Promise<any> => {
    return executeQuery(sql, [personagem.filme.id, personagem.nome, personagem.altura, personagem.peso, personagem.genero, personagem.nascimento])
}