import { createPrismaClient } from './database';
import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import userRoutes from './routes/userRoutes';
import trajectoryRoutes from './routes/trajectoryRoutes';

import errorMiddleware from './middlewares/errorMiddleware';

import { user as usersModel } from './models/User';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express()
const port = process.env.PORT || 5000

app.use(express.json());
app.use(cors());
app.use(helmet());


app.use('/api/users', userRoutes);
app.use('/api/trajectory', trajectoryRoutes);

// Iniciando banco de dados com prisma
createPrismaClient();

// Middleware global para tratamento de erros
app.use(errorMiddleware);


(async () => {
  const prisma = new PrismaClient();

  usersModel.forEach(async (user) => {
    const userExists = await prisma.user.findFirst({ where: { email: user.email } });
    if (userExists) return;

    await prisma.user.create({ data: user });
  });
})()

app.listen(port, () =>
  console.log('REST API Rodando no link: http://localhost:'+port),
)

export default app;