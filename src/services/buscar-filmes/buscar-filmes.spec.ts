import IFilme from "../../models/filme";
import { buscarFilmeMysql } from "./buscar-filme-mysql";
import { getTipoPersistencia, TipoPersistencia } from "../tipo-persistencia/tipo-persistencia";
import { buscarFilmesDynamo } from "./buscar-filmes-dynamo";
import buscarFilmes from "./buscar-filmes";

jest.mock('./buscar-filme-mysql');
jest.mock('./buscar-filmes-dynamo');
jest.mock('../tipo-persistencia/tipo-persistencia');

describe('buscarFilmes', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
  
    it('caso a configuracao seja mysql, nao deve buscar no dynamo', async () => {
      const outputQuery = [{
        id: 1,
        nome: 'Teste',
        abertura: 'blahblah',
        lancamento: new Date('2019-01-01')
      }];

      (getTipoPersistencia as jest.Mock).mockReturnValueOnce(TipoPersistencia.MYSQL);
      
      (buscarFilmeMysql as jest.Mock)
        .mockReturnValueOnce(Promise
          .resolve<IFilme[]>(outputQuery));
        
      (buscarFilmesDynamo as jest.Mock)
          .mockReturnValueOnce(Promise
            .resolve<IFilme[]>(outputQuery));
      
      expect(await buscarFilmes()).toEqual(outputQuery);

      expect(buscarFilmeMysql).toHaveBeenCalledTimes(1)
      expect(buscarFilmesDynamo).toHaveBeenCalledTimes(0)
    });
    
    it('caso a configuracao seja dynamo, nao deve buscar no mysql', async () => {
        const outputQuery = [{
          id: 1,
          nome: 'Teste',
          abertura: 'blahblah',
          lancamento: new Date('2019-01-01')
        }];
  
        (getTipoPersistencia as jest.Mock).mockReturnValueOnce(TipoPersistencia.DYNAMO);
        
        (buscarFilmeMysql as jest.Mock)
          .mockReturnValueOnce(Promise
            .resolve<IFilme[]>(outputQuery));
          
        (buscarFilmesDynamo as jest.Mock)
            .mockReturnValueOnce(Promise
              .resolve<IFilme[]>(outputQuery));
        
        expect(await buscarFilmes()).toEqual(outputQuery);
  
        expect(buscarFilmeMysql).toHaveBeenCalledTimes(0)
        expect(buscarFilmesDynamo).toHaveBeenCalledTimes(1)
    });
});