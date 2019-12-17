import request from 'request-promise'
import IFilme from '../models/filme'
import { IPersonagem } from '../models/personagem'

const BASE_API = 'https://swapi.co/api'

export const getMovies = async () : Promise<IFilme[]> => {
    const response = await request.get(`${BASE_API}/films`)
    return JSON.parse(response).results.map((filme: any) => ({
        id: filme.episode_id,
        nome: filme.title,
        abertura: filme.opening_crawl,
        lancamento: filme.release_date
    }))
}

export const getCharactersByMovie = async (movieId: number) : Promise<IPersonagem[]> => {
    const response = JSON.parse(await request.get(`${BASE_API}/films/${movieId}`))
    
    const promises: Promise<any>[] = response.characters
                                                .map((characterURL: string) => request.get(characterURL))
        
    const resp = await Promise.all(promises)

    return resp
        .map(character => JSON.parse(character))
        .map(personagem => ({
            filme: { id: movieId },
            nome: personagem.name,
            altura: +personagem.height,
            peso: +personagem.mass || undefined,
            genero: personagem.gender,
            nascimento: personagem.birth_year
        }))
}