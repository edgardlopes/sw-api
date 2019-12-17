import { Route } from "../../utils";
import { Request, Response, NextFunction } from 'express';
import { getTipoPersistencia, setTipoPersistencia } from "./tipo-persistencia";


export const getTipoPersistenciaRoute: Route = {
    path: '/api/v1/tipo-persistencia',
    method: 'get',
    handler: [
        async (req: Request, res: Response)  => {
            res.status(200).send(getTipoPersistencia());
        }
    ]
}

export const setTipoPersistenciaRoute: Route = {
    path: '/api/v1/tipo-persistencia',
    method: 'put',
    handler: [
        async (req: Request, res: Response)  => {
            setTipoPersistencia(req.body.tipo)
            res.sendStatus(204)
        }
    ]  
} 