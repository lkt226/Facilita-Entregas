import { Request, Response, NextFunction } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const isPrismaError = (error: any): error is Prisma.PrismaClientKnownRequestError => {
  return error instanceof Prisma.PrismaClientKnownRequestError;
};

const errorMiddleware = async (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (isPrismaError(err)) {
    return res.status(400).json({ error: 'Erro no banco de dados' });
  }

  console.error(err);
  res.status(500).json({ error: 'Erro interno no servidor' });
};

export default errorMiddleware;
