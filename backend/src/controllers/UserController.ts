import { Request, Response } from 'express';
import userOperations from '../database/operations/user';

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await userOperations.getAll()
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const userExists = await userOperations.getUniqueById(userId)

  if (userExists.length === 0) {
    return res.status(404).json({ message: 'Usuário não existe' });
  }

  res.json(userExists);
}

export const createUser = async (req: Request, res: Response) => {
  const { name, email, telphone, coordinates } = req.body;

  const userExists = await userOperations.getUniqueByEmail(email)

  if (userExists.length > 0) {
    return res.status(400).json({ message: 'Usuário já existe' });
  }

  const parsedCoordinates = coordinates.map((coordinate: string|number) => {
    return typeof coordinate === 'string' ? parseFloat(coordinate) : coordinate;
  })

  const user = await userOperations.create(name, email, telphone, parsedCoordinates)

  if (!user) {
    return res.status(500).json({ message: 'Erro ao criar usuário' });
  }

  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const { name, email, telphone, coordinates } = req.body;

  const userExists = await userOperations.getUniqueById(userId)

  if (userExists.length === 0) {
    return res.status(404).json({ message: 'Usuário não existe' });
  }

  const parsedCoordinates = coordinates.map((coordinate: string|number) => {
    return typeof coordinate === 'string' ? parseFloat(coordinate) : coordinate;
  })

  const updatedUser = await userOperations.update(userId, name, email, telphone, parsedCoordinates)

  res.json(updatedUser);
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);

  const userExists = await userOperations.getUniqueById(userId)

  if (userExists.length === 0) {
    return res.status(404).json({ message: 'Usuário não existe' });
  }
  
  await userOperations.delete(userId)
  
  res.json({ message: 'Usuário deletado com sucesso' });
};
