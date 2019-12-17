import { Router, Request, Response, NextFunction } from 'express';
import middleware from '../middleware';

type Wrapper = ((router: Router) => void);

export const applyMiddleware = (middleware: Wrapper[], router: Router) => {
    for (const f of middleware) {
        f(router);
    }
};

export type Handler = (
    req: Request,
    res: Response, 
    next: NextFunction
) => Promise<void> | void;

export type Route = {
    path: string;
    method: string;
    handler: Handler[];
};

export const applyRoutes = (routes: Route[], router: Router) => {
    for(const route of routes) {
        const { method, path, handler } = route;
        (router as any)[method](path, handler);
    }
};