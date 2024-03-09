import { Prisma } from '@prisma/client';

export const user: Prisma.UserCreateInput[] = [
  {
    name: "Facilita",
    email: 'facilita@gmail.com',
    telphone: '15998526603',
    coordinates: [0, 0]
  }
];
