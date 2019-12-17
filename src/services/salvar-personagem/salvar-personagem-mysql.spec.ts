import { executeQuery } from "../../utils/mysql";
import IFilme from "../../models/filme";
import salvarPersonagem from "./salvar-personagem";
import { IPersonagem } from "../../models/personagem";

jest.mock('../../utils/mysql');

describe('buscarFilmeMysql', () => {
 
    it('deve retornar sucesso quando o gateway efetivar o aceite', async () => {
      const personagem: IPersonagem = {
        filme: { id: 1},
        nome: 'luke',
        altura: 177,
        genero: 'masc',
        nascimento: 'uma data estranha ai'
      };
      
      (executeQuery as jest.Mock).mockImplementation(() => {});
      
      salvarPersonagem(personagem);

      expect(executeQuery).toHaveBeenCalledTimes(1);
    });
  });
  