import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const connectMongoDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI ?? '', {
    autoCreate: true,
    autoIndex: false,
  });

  console.log('Connected to MongoDB');

  mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
  });
};

const bootstrapServer = async () => {
  await connectMongoDB();

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

  app.get('/health', (req, res) => {
    res.send('OK');
  });

  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
};

bootstrapServer();
