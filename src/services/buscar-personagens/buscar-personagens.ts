import { getTipoPersistencia, TipoPersistencia } from "../tipo-persistencia/tipo-persistencia";
import buscarPersonagensMysql from "./buscar-personagens-mysql";
import { buscarPersonagensDynamo } from "./buscar-personagens-dynamo";

export default (filmeId: number) => {
    if(getTipoPersistencia() === TipoPersistencia.MYSQL) {
        return buscarPersonagensMysql(filmeId)
    }

    return buscarPersonagensDynamo(filmeId)
} 