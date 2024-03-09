'use client';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { useSelector, useDispatch } from "react-redux"
import { RootState, RootDispatch } from "@/app/store"
import { refreshUserList } from '@/features/client/usersSlice'

import { useEffect, useState } from "react";

import DeleteAction from "./DeleteAction";
import EditAction from "./EditAction";

export default function ListUsersIntern() {
  const dispatch:RootDispatch = useDispatch()
  
  const { loading, data: usersList, error } = useSelector((state: RootState) => state.client.allUsersList)
  const filterWord = useSelector((state: RootState) => state.client.filterWord).toLowerCase()

  const [filteredUsers, setFilteredUsers] = useState(usersList)

  useEffect(() => { dispatch(refreshUserList()) }, [dispatch]);
  useEffect(() => setFilteredUsers(usersList), [usersList])

  useEffect(() => {
    setFilteredUsers(usersList.filter((user) => {
      const text = `${user.name} ${user.email} ${user.telphone}`.toLowerCase()
      return filterWord === "" || text.includes(filterWord)
    }))
  }, [filterWord])

  return (
      <Table>
        <TableCaption>
          { loading ? "Carregando..." : `Total de clientes: ${filteredUsers.length}` }
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead className="w-[30px] text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="overflow-y-auto h-full">
          {
            filteredUsers.map((user) => (
              <TableRow key={user.email}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.telphone}</TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <EditAction user={user} />
                  <DeleteAction id={user.id} />
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
  )
}