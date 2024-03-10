import { Request, Response } from 'express';
import { orderUsersByCoordinates } from './calcule';
import userOperations from '../../database/operations/user';

export const calculeTrajectory = async (req: Request, res: Response) => {
  const { usersIds } = req.body;

  if (!usersIds) {
    return res.status(400).json({ message: 'Nenhum usuário informado' });
  }

  const users = await userOperations.getByMultipleIds(usersIds)

  /*
    Aqui poderia ser usado o ID da empresa, sendo ela o primeiro usuário criado 
    no Banco de Dados ou se fosse uma aplicação real.
  */
  const company = await userOperations.getUniqueByEmail('facilita@gmail.com')

  if (!company) {
    return res.status(400).json({ message: 'Empresa não encontrada' });
  }

  const orderedUsers = orderUsersByCoordinates(company[0], users);

  res.json(orderedUsers);
};