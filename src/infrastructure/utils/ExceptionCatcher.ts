import express from 'express';

export function exceptionCatcher(action: Function) {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        return action(req, res).catch(next);
    };
}

