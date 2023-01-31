import express from 'express';
import config from '../config';

const app = express();

app.use(express.json())

const PORT = config.port||8081;

app.get('/', (req, res) => {
  res.send('Hellooo!');
});

app.listen(PORT, () => {
  console.log(`Server is listening at port: ${PORT}`);
});

export default app;