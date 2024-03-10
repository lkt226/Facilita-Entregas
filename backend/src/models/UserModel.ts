export type UserType = {
  id?: string
  name: string
  email: string
  telphone: string
  coordinates:  number[]
}

export const usersModel: UserType[] = [
  {
    name: "Facilita",
    email: 'facilita@gmail.com',
    telphone: '15998526603',
    coordinates: [0, 0]
  }
];
