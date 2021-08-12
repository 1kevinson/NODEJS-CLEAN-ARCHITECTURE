import express from 'express';
import bodyParser from 'body-parser';
import logger from './src/infrastructure/utils/Logger';
import userRoutes from './src/interfaces/routes/UserRoutes';
import { developmentErrorHandler } from './src/infrastructure/utils/DevelopmentErrorHandler';

const app = express();

// Bodyparser to return JSON formatted data
app.use(bodyParser.json());
app.use(logger);

// Reset browser cache
app.get('/*', function (req, res, next) {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
});

app.use('/users', userRoutes);

// Catch errors after all routes middlewares
app.use(developmentErrorHandler);

app.listen({port: 3000});