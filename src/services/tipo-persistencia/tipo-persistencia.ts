export enum TipoPersistencia {
    MYSQL = 'MYSQL',
    DYNAMO = 'DYNAMO'
}

let tipoSelecionado = TipoPersistencia.MYSQL

export const setTipoPersistencia = (tipo: TipoPersistencia) => {
    tipoSelecionado = tipo
}

export const getTipoPersistencia = () : TipoPersistencia => {
    return tipoSelecionado
}