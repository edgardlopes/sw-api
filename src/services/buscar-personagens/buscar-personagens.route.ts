import { Request, Response, NextFunction } from 'express';
import buscarPersonagens from './buscar-personagens';
import { getCharactersByMovie } from '../../utils/StarWarsProvider';
import salvarPersonagem from '../salvar-personagem/salvar-personagem';
import { IPersonagem } from '../../models/personagem';
import { Route } from '../../utils';

export const buscarPersonagensRoute: Route = {
    path: '/api/v1/filmes/:id/personagens',
    method: 'get',
    handler: [
        async ({ params }: Request, res: Response, next: NextFunction) => {
            const personagensDB = await buscarPersonagens(+params.id)
            if(personagensDB && personagensDB.length > 0){
                res.status(200).json(personagensDB)
            } else {
                next()
            }
        },
        async ({ params }: Request, res: Response) => {
            const characters = await getCharactersByMovie(+params.id)
            const promises: Promise<any>[] = characters
                .map((personagem: IPersonagem) => salvarPersonagem(personagem))
            try{
                await Promise.all(promises)        
            } catch (e) {
                console.error(e);
            }
            res.status(200).json(characters)
        }
    ]
}