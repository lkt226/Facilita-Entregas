'use client';

import css from './style.module.scss'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

import { useSelector, useDispatch } from 'react-redux'
import { RootState, RootDispatch } from '@/app/store'
import { setOrderedUsersList } from '@/features/client/usersSlice';
import dynamic from "next/dynamic"

import OrderedUsersList from './OrderedUsersList'
import routes from '@/assets/api/routes'
const Map = dynamic(() => import("./Map"), { ssr:false })
  
export default function BetterRoute() {
  const { data: users } = useSelector((state: RootState) => state.client.allUsersList)
  const dispatch:RootDispatch = useDispatch()
  const usersIds = users.map(user => user.id)

  const handleBetterRoute = async () => {
    const response = await routes.trajectory.calcule(usersIds)
    const users = await response.json()
    
    if (response.status !== 200) {
      dispatch(setOrderedUsersList({
        loading: false,
        data: [],
        error: 'Erro ao calcular a melhor rota'
      }))
    } else {
      dispatch(setOrderedUsersList({
        loading: false,
        data: users,
        error: null
      }))
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={css["trigger"]} variant="outline" onClick={handleBetterRoute}>
          Visualizar melhor rota
        </Button>
      </DialogTrigger>
      
      <DialogContent className={css["dialog"]}>
        <DialogHeader>
          <DialogTitle>
            Melhor Rota
          </DialogTitle>
          <DialogDescription>
            Visualize a melhor rota para atender todos os clientes.
          </DialogDescription>
        </DialogHeader>
        <div className={css["content"]}>
          <OrderedUsersList />
          <Map />
        </div>
      </DialogContent>
    </Dialog>
  )
}