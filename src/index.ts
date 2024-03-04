import express from 'express';
import { router } from './routes/router';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.set('port', process.env.PORT || 8080)
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use('/api', router());

const port: string = app.get('port');

app.listen(port, () => {
    console.log(`[server]: server running on the port: ${port}`)
});