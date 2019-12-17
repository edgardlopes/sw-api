import { Request, Response, NextFunction } from 'express';

import buscarFilmes from "./buscar-filmes";
import { getMovies } from '../../utils/StarWarsProvider';
import salvarFilme from '../salvar-filme/salvar-filme';
import IFilme from '../../models/filme';
import { Route } from '../../utils';

export const buscarFilmesRoute: Route = {
    path: '/api/v1/filmes',
    method: 'get',
    handler: [
        async (req: Request, res: Response, next: NextFunction) => {
            const filmesDB = await buscarFilmes()
            if(filmesDB && filmesDB.length > 0){
                res.status(200).json(filmesDB)
            } else {
                next()
            }
        },
        async (req: Request, res: Response) => {
          
            const filmes = await getMovies()
            const promises: Promise<any>[] = filmes
                                    .map((filme: IFilme) => salvarFilme(filme));

            await Promise.all(promises)

            res.status(200).json(filmes)
        }
    ]
}