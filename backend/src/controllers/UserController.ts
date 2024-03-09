import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    return res.status(404).json({ message: 'Usuário não existe' });
  }

  res.json(user);
}

export const createUser = async (req: Request, res: Response) => {
  const { name, email, telphone, coordinates } = req.body;

  const userExists = await prisma.user.findFirst({ where: { email } });

  if (userExists) {
    return res.status(400).json({ message: 'Usuário já existe' });
  }

  const parsedCoordinates = coordinates.map((coordinate: string|number) => {
    return typeof coordinate === 'string' ? parseFloat(coordinate) : coordinate;
  })

  const user = await prisma.user.create({ data: { name, email, telphone, coordinates: parsedCoordinates } });

  if (!user) {
    return res.status(500).json({ message: 'Erro ao criar usuário' });
  }

  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const { name, email, telphone, coordinates } = req.body;

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    return res.status(404).json({ message: 'Usuário não existe' });
  }

  const parsedCoordinates = coordinates.map((coordinate: string|number) => {
    return typeof coordinate === 'string' ? parseFloat(coordinate) : coordinate;
  })

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { name, email, telphone, coordinates: parsedCoordinates},
  });

  res.json(updatedUser);
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    return res.status(404).json({ message: 'Usuário não existe' });
  }

  await prisma.user.delete({ where: { id: userId } });
  res.json({ message: 'Usuário deletado com sucesso' });
};
