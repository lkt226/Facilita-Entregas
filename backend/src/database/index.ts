import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

export const createPrismaClient = () => {
  prisma = new PrismaClient();
};
  
export { prisma };
