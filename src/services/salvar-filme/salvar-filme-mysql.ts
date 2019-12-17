import { executeQuery } from "../../utils/mysql";
import IFilme from "../../models/filme";


const sql = 'INSERT INTO filme(id, nome, abertura, lancamento) VALUES (?, ?, ?, ?)'

export const salvarFilmeMysql = async (filme: IFilme): Promise<any> => {
    return executeQuery(sql, [filme.id, filme.nome, filme.abertura, filme.lancamento])
}