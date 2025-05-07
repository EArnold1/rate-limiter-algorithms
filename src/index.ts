import { config } from 'dotenv';
config();
import express from 'express';
import router from './routes/app.routes';

const app = express();

app.enable('trust proxy');
app.use('/', router);

const PORT = process.env.PORT;

app.listen(PORT, () => console.info(`app is running on port ${PORT}`));
