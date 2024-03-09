import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { orderUsersByCoordinates } from './calcule';

const prisma = new PrismaClient();

export const calculeTrajectory = async (req: Request, res: Response) => {
  const { usersIds } = req.body;

  if (!usersIds) {
    return res.status(400).json({ message: 'Nenhum usuário informado' });
  }

  const users = await prisma.user.findMany({
    where: {
      id: {
        in: usersIds
      }
    }
  });

  /*
    Aqui poderia ser usado o ID da empresa, sendo ela o primeiro usuário criado 
    no Banco de Dados ou se fosse uma aplicação real.
  */
  const company = await prisma.user.findFirst({
    where: {
      email: 'facilita@gmail.com',
    }
  });

  if (!company) {
    return res.status(400).json({ message: 'Empresa não encontrada' });
  }

  const orderedUsers = orderUsersByCoordinates(company, users);

  res.json(orderedUsers);
};