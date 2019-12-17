import { executeQuery } from "../../utils/mysql";
import IFilme from "../../models/filme";


const sql = 'SELECT * FROM filme'

export const buscarFilmeMysql = async (): Promise<IFilme[]> => {
    return executeQuery(sql, [])
}