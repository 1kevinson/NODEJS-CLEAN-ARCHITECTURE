import express from 'express';

export const developmentErrorHandler = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const status: number = err.statusCode || 500;
    const errorMessage: string = err.message;

    console.error({Status: status, ErrorMessage: errorMessage});
    res.status(status).json({status: status, error: errorMessage});
};