import { getTipoPersistencia, TipoPersistencia } from "../tipo-persistencia/tipo-persistencia";
import { IPersonagem } from "../../models/personagem";
import { salvarPersonagemMysql } from "./salvar-personagem-mysql";
import { salvarPersonagemDynamo } from "./salvar-personagem-dynamo";
import salvarPersonagem from "./salvar-personagem";
import { salvarFilmeDynamo } from "../salvar-filme/salvar-filme-dynamo";

jest.mock('../tipo-persistencia/tipo-persistencia');
jest.mock('./salvar-personagem-mysql');
jest.mock('./salvar-personagem-dynamo');

describe('buscarFilmes', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
  
    it('caso a configuracao seja mysql, nao deve buscar no dynamo', async () => {
      const personagem: IPersonagem = {
        filme: { id: 1 },
        nome: 'um personagem ai',
        altura: 177,
        genero: 'masc',
        nascimento: 'uma data estranha ai'
      };

      (getTipoPersistencia as jest.Mock).mockReturnValueOnce(TipoPersistencia.MYSQL);

      (salvarPersonagemMysql as jest.Mock).mockImplementation(() => {});
      (salvarPersonagemDynamo as jest.Mock).mockImplementation(() => {});
      
      salvarPersonagem(personagem);

      expect(salvarPersonagemMysql).toHaveBeenCalledTimes(1);
      expect(salvarPersonagemDynamo).toHaveBeenCalledTimes(0);
    });
    
    
});