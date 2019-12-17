import { Request, Response } from 'express';
import { getTipoPersistencia, TipoPersistencia, setTipoPersistencia } from "./tipo-persistencia";
import { getTipoPersistenciaRoute, setTipoPersistenciaRoute } from "./tipo-persistencia.route";

jest.mock('./tipo-persistencia');

describe('tipoPersistenciaRoute', () => {
    it('deve retornar status 200 com o tipo de persistencia salvo', async () => {
        const request: Partial<Request> = {
        };
    
        const response = {
            send: (body: any) => ({}),
            status: (code: number) => ({})
        };

        (getTipoPersistencia as jest.Mock).mockReturnValue(TipoPersistencia.DYNAMO);

        const statusSpy = jest.spyOn(response, 'status').mockImplementationOnce((code: number) => response);
        const sendSpy = jest.spyOn(response, 'send').mockImplementationOnce((body?: any) => response);

        await getTipoPersistenciaRoute.handler[0](request as Request, response as Response, () => {});

        expect(statusSpy).toHaveBeenCalledWith(200)
        expect(sendSpy).toHaveBeenCalledWith('DYNAMO');
    })

    it('deve alterar o tipo de persistencia', async () => {
        const request: Partial<Request> = {
            body: {
                tipo: 'DYNAMO',
            }
        };
    
        const response = {
            sendStatus: (body: any) => ({}),
        };

        const sendStatusSpy = jest.spyOn(response, 'sendStatus').mockImplementationOnce((code: number) => response);

        (setTipoPersistencia as jest.Mock).mockImplementation(() => {});

        await setTipoPersistenciaRoute.handler[0](request as Request, response as Response, () => {});

        expect(sendStatusSpy).toHaveBeenCalledWith(204);

    })
})