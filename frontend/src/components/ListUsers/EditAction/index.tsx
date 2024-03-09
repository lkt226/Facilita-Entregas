'use client';

import css from './style.module.css'

import { PostUser, GetUser } from '@/assets/data/types';

import { useState } from 'react';
import { RootDispatch } from "@/app/store";
import { useDispatch } from "react-redux";
import { refreshUserList } from '@/features/client/usersSlice'

import routes from "@/assets/api/routes";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import DefaultForm from '@/components/DefaultForm';
import { FilePenLine } from "lucide-react"

interface Props {
  user: GetUser;
}

export default function EditAction({ user }: Props) {
  const dispatch:RootDispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget

    const data: PostUser = {
      name: form.username.value,
      telphone: form.telphone.value,
      email: form.email.value,
      coordinates: [
        form["coordinate-x"].value,
        form["coordinate-y"].value
      ]
    }

    routes.users.update(user.id, data).then(() => {
      dispatch(refreshUserList())
      form.reset()
      setOpen(false)
    }).catch((error) => {
      console.error(error)
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <button><FilePenLine/></button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Você está editando o usuário { user.email }
          </DialogTitle>
          <DialogDescription>
            Você pode mudar todas as informações do usuário.
          </DialogDescription>

          <div className={css["form-edit-client"]}>
            <DefaultForm 
              user={user}
              onSubmit={handleSubmit} 
              buttonLabel="Salvar dados do cliente"
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>

  )
}