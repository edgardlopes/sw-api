import { Request, Response } from 'express';
import { getMovies, getCharactersByMovie } from '../../utils/StarWarsProvider';
import salvarFilme from '../salvar-filme/salvar-filme';
import buscarPersonagens from './buscar-personagens';
import { buscarPersonagensRoute } from './buscar-personagens.route';
import salvarPersonagem from '../salvar-personagem/salvar-personagem';


jest.mock('./buscar-personagens');
jest.mock('express');
jest.mock('../../utils/StarWarsProvider.ts');
jest.mock('../salvar-personagem/salvar-personagem');

describe('buscarPersonagensRoute', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('quando houver algo no banco, next deve ser chamado', async () => {
    const request: Partial<Request> = {
      params: {
        id: '1',
      },
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

    (buscarPersonagens as jest.Mock).mockReturnValue([]);

    await buscarPersonagensRoute.handler[0](request as Request, response as Response, next);

    expect(next).toHaveBeenCalledTimes(1);
  });


  it('quando houver algo no banco, res.status() deve ser chamado', async () => {
    const request: Partial<Request> = {
      params: {
        id: '1',
      },
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

    (buscarPersonagens as jest.Mock).mockReturnValue([{}]);

    await buscarPersonagensRoute.handler[0](request as Request, response as Response, next);

    expect(next).toHaveBeenCalledTimes(0);
    expect(statusSpy).toHaveBeenCalledTimes(1);
    expect(jsonSpy).toHaveBeenCalledWith([{}])
  });

  it('quando nao houver personagens no banco, o segundo middleware deve ser chamado', async () => {
    const request: Partial<Request> = {
      params: {
        id: '1',
      },
    };

    const response = {
      send: (body: any) => ({}),
      status: (code: number) => ({}),
      json: (body: any) => ({}),
    };

    
    const statusSpy = jest.spyOn(response, 'status').mockImplementationOnce((code: number) => response);
    const sendSpy = jest.spyOn(response, 'send').mockImplementationOnce((body?: any) => response);
    const jsonSpy = jest.spyOn(response, 'json').mockImplementationOnce((body?: any) => response);
    
    const next = jest.fn();
    
    (getCharactersByMovie as jest.Mock).mockReturnValue([{},{},{},{},{}]);
    (salvarPersonagem as jest.Mock).mockImplementation((id: number) => {});

    await buscarPersonagensRoute.handler[1](request as Request, response as Response, next);

    expect(statusSpy).toHaveBeenCalledTimes(1);
    expect(salvarPersonagem).toHaveBeenCalledTimes(5);
    expect(statusSpy).toHaveBeenCalledWith(200);
    expect(jsonSpy).toHaveBeenCalledWith([{},{},{},{},{}]);
  });
 
});
