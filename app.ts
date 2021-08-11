import express from 'express';
import bodyParser from 'body-parser';
import logger from './src/infrastructure/config/Logger';
import userRoutes from './src/interfaces/routes/userRoutes';

const app = express();

// app.use(logger);
app.use(bodyParser.json());

app.use('/users', userRoutes);

app.listen({port: 3000});