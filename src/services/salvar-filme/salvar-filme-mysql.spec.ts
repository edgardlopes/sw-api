import { executeQuery } from "../../utils/mysql";
import IFilme from "../../models/filme";
import { salvarFilmeMysql } from "./salvar-filme-mysql";

jest.mock('../../utils/mysql');

describe('buscarFilmeMysql', () => {
 
    it('deve retornar sucesso quando o gateway efetivar o aceite', async () => {
      const filme: IFilme = {
        id: 1,
        nome: 'Um nome legal',
        abertura: 'tan taran tan tan taratan',
        lancamento: new Date()
      };
      
      (executeQuery as jest.Mock).mockImplementation(() => {});
      
      salvarFilmeMysql(filme);

      expect(executeQuery).toHaveBeenCalledTimes(1);
      expect(executeQuery).toHaveBeenCalledWith('INSERT INTO filme(id, nome, abertura, lancamento) VALUES (?, ?, ?, ?)', [
          filme.id, filme.nome, filme.abertura, filme.lancamento
      ]);
    });
  });
  