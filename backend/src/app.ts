import express from 'express';
import config from '../config';

import placesRoutes from './routes/places-routes';

const app = express();

app.use(express.json())

const PORT = config.port||8081;

app.use('/api/places',placesRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening at port: ${PORT}`);
});

export default app;