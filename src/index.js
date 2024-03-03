import config from 'config';
import express from 'express';
import { router } from './routes/router.js';

const app = express();

app.set('port', process.env.PORT || config.get('server.port'))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use('/api', router());

const port = app.get('port');

app.listen(port, () => {
    console.log(`Server running on the port: ${port}`)
});