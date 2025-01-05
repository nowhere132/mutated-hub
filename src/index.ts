import express from 'express';
import cors from 'cors';
import router from './router';

const PORT = process.env.APP_SERVER_PORT;

const corsOptions: cors.CorsOptions = {
  origin: process.env.SECURE_CORS_ORIGIN,
  methods: process.env.SECURE_CORS_METHODS,
  allowedHeaders: process.env.SECURE_CORS_ALLOWED_HEADERS,
  exposedHeaders: process.env.SECURE_CORS_EXPOSED_HEADERS,
  credentials: process.env.SECURE_CORS_CREDENTIALS !== 'false',
  preflightContinue: process.env.SECURE_CORS_PREFLIGHT_CONTINUE === 'true',
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
