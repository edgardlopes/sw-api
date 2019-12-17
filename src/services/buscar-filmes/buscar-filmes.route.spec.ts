import { Request, Response } from 'express';
import buscarFilmes from './buscar-filmes';
import { buscarFilmesRoute } from './buscar-filmes.route';
import { getMovies } from '../../utils/StarWarsProvider';
import salvarFilme from '../salvar-filme/salvar-filme';


jest.mock('./buscar-filmes');
jest.mock('express');
jest.mock('../../utils/StarWarsProvider.ts');
jest.mock('../salvar-filme/salvar-filme');

describe('aceitarContratoGateway', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('quando houver algo no banco, next deve ser chamado', async () => {
    const request: Partial<Request> = {
    };

    const response = {
      send: (body: any) => ({}),
      status: (code: number) => ({}),
      json: (body: any) => ({})
    };

    const statusSpy = jest.spyOn(response, 'status').mockImplementationOnce((code: number) => response);
    const sendSpy = jest.spyOn(response, 'send').mockImplementationOnce((body?: any) => response);
    const jsonSpy = jest.spyOn(response, 'json').mockImplementationOnce((body?: any) => response);

    const next = jest.fn();

    (buscarFilmes as jest.Mock).mockReturnValue([]);

    await buscarFilmesRoute.handler[0](request as Request, response as Response, next);

    expect(next).toHaveBeenCalledTimes(1);
  });


  it('quando houver algo no banco, res.status() deve ser chamado', async () => {
    const request: Partial<Request> = {
      
    };

    const response = {
      send: (body: any) => ({}),
      status: (code: number) => ({}),
      json: (body: any) => ({})
    };

    const statusSpy = jest.spyOn(response, 'status').mockImplementationOnce((code: number) => response);
    const sendSpy = jest.spyOn(response, 'send').mockImplementationOnce((body?: any) => response);
    const jsonSpy = jest.spyOn(response, 'json').mockImplementationOnce((body?: any) => response);

    const next = jest.fn();

    (buscarFilmes as jest.Mock).mockReturnValue([{}]);

    await buscarFilmesRoute.handler[0](request as Request, response as Response, next);

    expect(next).toHaveBeenCalledTimes(0);
    expect(statusSpy).toHaveBeenCalledTimes(1);
    expect(jsonSpy).toHaveBeenCalledWith([{}])
  });

  it('quando nao houver filmes no banco, o segundo middleware deve ser chamado', async () => {
    const request: Partial<Request> = {
      
    };

    const response = {
      send: (body: any) => ({}),
      status: (code: number) => ({}),
      json: (body: any) => ({})
    };

    
    const statusSpy = jest.spyOn(response, 'status').mockImplementationOnce((code: number) => response);
    const sendSpy = jest.spyOn(response, 'send').mockImplementationOnce((body?: any) => response);
    const jsonSpy = jest.spyOn(response, 'json').mockImplementationOnce((body?: any) => response);
    
    const next = jest.fn();
    
    (getMovies as jest.Mock).mockReturnValue([{},{},{},{},{}]);
    (salvarFilme as jest.Mock).mockImplementation(() => {});

    await buscarFilmesRoute.handler[1](request as Request, response as Response, next);

    expect(statusSpy).toHaveBeenCalledTimes(1);
    expect(salvarFilme).toHaveBeenCalledTimes(5);
    expect(statusSpy).toHaveBeenCalledWith(200);
    expect(jsonSpy).toHaveBeenCalledWith([{},{},{},{},{}]);
  });
 
});
