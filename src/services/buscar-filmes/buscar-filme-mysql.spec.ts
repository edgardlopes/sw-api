import { executeQuery } from "../../utils/mysql";
import IFilme from "../../models/filme";
import { buscarFilmeMysql } from "./buscar-filme-mysql";

jest.mock('../../utils/mysql');

describe('buscarFilmeMysql', () => {
 
    it('deve retornar sucesso quando o gateway efetivar o aceite', async () => {
      const outputQuery = [{
        id: 1,
        nome: 'Teste',
        abertura: 'blahblah',
        lancamento: new Date('2019-01-01')
      }];
      
      (executeQuery as jest.Mock)
        .mockReturnValueOnce(Promise
          .resolve<IFilme[]>(outputQuery));
        
      
      expect(await buscarFilmeMysql()).toEqual(outputQuery);

      expect(executeQuery).toHaveBeenCalledTimes(1)
      expect(executeQuery).toHaveBeenCalledWith('SELECT * FROM filme', [])
    });
  });
  