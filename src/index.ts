import express from 'express';

const PORT = process.env.APP_SERVER_PORT;

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.send('OK');
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
