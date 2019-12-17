import { executeQuery } from "../../utils/mysql";
import IFilme from "../../models/filme";
import buscarPersonagensMysql from "./buscar-personagens-mysql";
import { IPersonagem } from "../../models/personagem";

jest.mock('../../utils/mysql');

describe('buscar Personagens Mysql', () => {
 
    it('', async () => {
      const filmeId = 1;
      const outputQuery: IPersonagem[] = [];
      
      (executeQuery as jest.Mock)
        .mockReturnValueOnce(Promise
          .resolve<IPersonagem[]>(outputQuery));
        
      
      expect(await buscarPersonagensMysql(filmeId)).toEqual(outputQuery);

      expect(executeQuery).toHaveBeenCalledTimes(1)
      expect(executeQuery).toHaveBeenCalledWith('SELECT * FROM personagem WHERE filme_id=?', [filmeId])
    });
  });
  