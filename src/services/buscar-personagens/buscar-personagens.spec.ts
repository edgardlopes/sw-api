import IFilme from "../../models/filme";
import { getTipoPersistencia, TipoPersistencia } from "../tipo-persistencia/tipo-persistencia";
import { IPersonagem } from "../../models/personagem";
import buscarPersonagensMysql from "./buscar-personagens-mysql";
import { buscarPersonagensDynamo } from "./buscar-personagens-dynamo";
import buscarPersonagens from "./buscar-personagens";

jest.mock('./buscar-personagens-mysql');
jest.mock('./buscar-personagens-dynamo');
jest.mock('../tipo-persistencia/tipo-persistencia');

describe('buscarFilmes', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
  
    it('caso a configuracao seja mysql, nao deve buscar no dynamo', async () => {
      const outputQuery: IPersonagem[] = [];
      const filmeId = 1;

      (getTipoPersistencia as jest.Mock).mockReturnValueOnce(TipoPersistencia.MYSQL);
      
      (buscarPersonagensMysql as jest.Mock)
        .mockReturnValueOnce(Promise
          .resolve<IPersonagem[]>(outputQuery));
        
      (buscarPersonagensDynamo as jest.Mock)
          .mockReturnValueOnce(Promise
            .resolve<IPersonagem[]>(outputQuery));
      
      expect(await buscarPersonagens(filmeId)).toEqual(outputQuery);

      expect(buscarPersonagensMysql).toHaveBeenCalledTimes(1)
      expect(buscarPersonagensDynamo).toHaveBeenCalledTimes(0)
    });
    
    it('caso a configuracao seja dynamo, nao deve buscar no mysql', async () => {
      const outputQuery: IPersonagem[] = [];
      const filmeId = 1;

      (getTipoPersistencia as jest.Mock).mockReturnValueOnce(TipoPersistencia.DYNAMO);
      
      (buscarPersonagensMysql as jest.Mock)
        .mockReturnValueOnce(Promise
          .resolve<IPersonagem[]>(outputQuery));
        
      (buscarPersonagensDynamo as jest.Mock)
          .mockReturnValueOnce(Promise
            .resolve<IPersonagem[]>(outputQuery));
      
      expect(await buscarPersonagens(filmeId)).toEqual(outputQuery);

      expect(buscarPersonagensMysql).toHaveBeenCalledTimes(0)
      expect(buscarPersonagensDynamo).toHaveBeenCalledTimes(1)
    });
});