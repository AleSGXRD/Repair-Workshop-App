import express from 'express';

import productsRoutes from './routes/products.routes.js';

const app = express();
import cors from 'cors'

app.use(cors());
app.use(express.json());

app.use('/api', productsRoutes);

app.listen(3000);
console.log('Server on port: ', 3000);