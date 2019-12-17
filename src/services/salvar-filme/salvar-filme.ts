import { getTipoPersistencia, TipoPersistencia } from "../tipo-persistencia/tipo-persistencia";
import { salvarFilmeMysql } from "./salvar-filme-mysql";
import IFilme from "../../models/filme";
import { salvarFilmeDynamo } from "./salvar-filme-dynamo";

export default (filme: IFilme) => {
    if(getTipoPersistencia() === TipoPersistencia.MYSQL) {
        return salvarFilmeMysql(filme)
    } 

    return salvarFilmeDynamo(filme)
}