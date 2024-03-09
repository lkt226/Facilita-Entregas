'use client';

import css from './style.module.css'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useSelector } from "react-redux"
import { RootState } from "@/app/store"

export default function ListUsersIntern() {
  const { loading, data, error } = useSelector((state: RootState) => state.client.orderedUsersList)
  
  const usersList = data.map((user) => {
    const telphone = user.telphone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3')
    return { ...user, telphone}
  })

  return (
    <Table>
      <TableCaption>
        { loading ? "Carregando..." : `Total de clientes: ${usersList.length}` }
      </TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="w-min">Ordem</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Telefone</TableHead>
          <TableHead>Coordenadas</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="overflow-y-auto h-full">
        {
          usersList.map((user, index) => (
            <TableRow key={user.email}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.telphone}</TableCell>
              <TableCell className="text-center">{user.coordinates.join(', ')}</TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}