import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import userRoutes from './routes/userRoutes';
import trajectoryRoutes from './routes/trajectoryRoutes';

import populate from './database/populate';

dotenv.config();

const app = express()
const port = process.env.PORT || 5000

app.use(express.json());
app.use(cors());
app.use(helmet());


app.use('/api/users', userRoutes);
app.use('/api/trajectory', trajectoryRoutes);

populate()

app.listen(port, () =>
  console.log('REST API Rodando no link: http://localhost:'+port),
)


export default app;