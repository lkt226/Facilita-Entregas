'use client';

import css from './style.module.css'

import { PostUser } from '@/assets/data/types';

import routes from '@/assets/api/routes';

import { useDispatch } from "react-redux"
import { RootDispatch } from "@/app/store"
import { refreshUserList } from '@/features/client/usersSlice'
import DefaultForm from '../DefaultForm';

export default function FormNewUser() {
    const dispatch:RootDispatch = useDispatch()

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

        routes.users.create(data).then(() => {
          dispatch(refreshUserList())
          form.reset()

        }).catch((error) => {
          console.error(error)
        })
    }

    return (
        <div className={css["form-new-client"]}>
            <h1>Novo cliente</h1>

            <DefaultForm 
              onSubmit={handleSubmit} 
              buttonLabel="Adicionar novo cliente" 
            />
        </div>
    )
}