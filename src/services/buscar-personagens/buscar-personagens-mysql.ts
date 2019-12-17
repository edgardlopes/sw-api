import { executeQuery } from "../../utils/mysql";
import IPersonagem from "../../models/filme";


const sql = 'SELECT * FROM personagem WHERE filme_id=?'

export default (filmeId: number): Promise<IPersonagem[]> => {
    return executeQuery(sql, [filmeId])
}