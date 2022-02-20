import express from 'express';
import 'express-async-error';
import cors from 'cors';
import moargan from 'helmet';
import helmet from 'helmet';
import tweetsRouter from './router/tweet.js';
import authRouter from './router/auth.js';
import { config } from './config.js';
import { initSocket } from './connection/socket.js';
import { connectDB } from './db/database.js';

const app = express();

const corsOption = {
    origin: config.cors.allowedOrigin,
    optionSuccessStatus: 200,
};

app.use(express.json());
app.use(helmet());
app.use(cors(corsOption)); // option
app.use(moargan('tiny'));

app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
});

sequelize.sync().then(() => {
    console.log(`server is started... ${new Date()}`);
    const server = app.listen(config.port);
    initSocket(server);
});
