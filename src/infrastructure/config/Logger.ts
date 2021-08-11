import express from 'express';
import moment from 'moment';

const logger = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const currentDateTime = moment().format('dddd h:mma D MMM YYYY');
    const method = req.method;
    const url = req.protocol + '://' + req.get('host') + req.url;
    const status = res.statusCode;

    console.log(`${currentDateTime} | METHOD: ${method} | URL: ${url} | STATUS: ${status}`);
    next();
};

export default logger;