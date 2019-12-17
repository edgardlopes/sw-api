import { IPersonagem } from "../../models/personagem";
import { getTipoPersistencia, TipoPersistencia } from "../tipo-persistencia/tipo-persistencia";
import { salvarPersonagemMysql } from "./salvar-personagem-mysql";
import { salvarPersonagemDynamo } from "./salvar-personagem-dynamo";

export default (personagem: IPersonagem) => {
    if(getTipoPersistencia() === TipoPersistencia.MYSQL) {
        return salvarPersonagemMysql(personagem)
    }

    return salvarPersonagemDynamo(personagem)
}