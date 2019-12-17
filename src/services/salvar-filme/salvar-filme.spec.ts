import IFilme from "../../models/filme";
import { getTipoPersistencia, TipoPersistencia } from "../tipo-persistencia/tipo-persistencia";
import { salvarFilmeMysql } from "./salvar-filme-mysql";
import { salvarFilmeDynamo } from "./salvar-filme-dynamo";
import salvarFilme from "./salvar-filme";

jest.mock('../tipo-persistencia/tipo-persistencia');
jest.mock('./salvar-filme-mysql');
jest.mock('./salvar-filme-dynamo');

describe('buscarFilmes', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
  
    it('caso a configuracao seja mysql, nao deve buscar no dynamo', async () => {
      const filme: IFilme = {
        id: 1,
        nome: 'Um nome legal',
        abertura: 'tan taran tan tan taratan',
        lancamento: new Date()
      };

      (getTipoPersistencia as jest.Mock).mockReturnValueOnce(TipoPersistencia.MYSQL);

      (salvarFilmeMysql as jest.Mock).mockImplementation(() => {});
      (salvarFilmeDynamo as jest.Mock).mockImplementation(() => {});
      
      salvarFilme(filme);

      expect(salvarFilmeMysql).toHaveBeenCalledTimes(1)
      expect(salvarFilmeDynamo).toHaveBeenCalledTimes(0)
    });
    
    
});