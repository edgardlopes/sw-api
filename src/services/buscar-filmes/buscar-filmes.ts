import { getTipoPersistencia, TipoPersistencia } from "../tipo-persistencia/tipo-persistencia";
import { buscarFilmeMysql } from "./buscar-filme-mysql";
import { buscarFilmesDynamo } from "./buscar-filmes-dynamo";


export default () => {
    if(getTipoPersistencia() == TipoPersistencia.MYSQL) {
        return buscarFilmeMysql()
    }

    return buscarFilmesDynamo()
}