'use client';

import css from './style.module.scss'

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GetUser } from '@/assets/data/types';

interface Props {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  buttonLabel: string
  user?: GetUser
}

export default function DefaultForm (props: Props) {
  return (
    <form className={css["default-form"]} onSubmit={props.onSubmit}>
        <Label htmlFor="username">
            <span>Nome</span>
            <Input id="username" type="text" placeholder="Nome do seu cliente" defaultValue={props.user?.name} required />
        </Label>
        <Label htmlFor="telphone">
            <span>Telefone</span>
            <Input id="telphone" type="tel" placeholder="Telefone do seu cliente" defaultValue={props.user?.telphone} maxLength={11} required />
        </Label>
        <Label className={css["email"]} htmlFor="email">
            <span>E-mail</span>
            <Input id="email" type="email" placeholder="E-mail do seu cliente" defaultValue={props.user?.email} required />
        </Label>
        <div className={css["coordinates"]}>
            <h2>Coordenadas</h2>
            <Label htmlFor="coordinate-x">
                <span>X</span>
                <Input id="coordinate-x" type="number" defaultValue={props.user?.coordinates[0]} required />
            </Label>
            <Label htmlFor="coordinate-y">
                <span>Y</span>
                <Input id="coordinate-y" type="number" defaultValue={props.user?.coordinates[1]} required />
            </Label>
        </div>
        <Button type="submit" variant="default">{ props.buttonLabel }</Button>
    </form>
  )
}