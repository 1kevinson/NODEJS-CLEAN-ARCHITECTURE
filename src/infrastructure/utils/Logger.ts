import express from 'express';
import moment from 'moment';

const logger = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const currentDateTime = moment().format('dddd h:mma D MMM YYYY');
    const method = req.method;
    const url = req.protocol + '://' + req.get('host') + req.url;

    console.log(`${currentDateTime} | METHOD: ${method} | URL: ${url} `);
    next();
};

export default logger;