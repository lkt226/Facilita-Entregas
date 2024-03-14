'use client';

import css from './style.module.scss'

import { useState } from 'react';

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GetUser } from '@/assets/data/types';
import PhoneInput from 'react-phone-input-2'

import 'react-phone-input-2/lib/style.css'

interface Props {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  buttonLabel: string
  user?: GetUser
}

export default function DefaultForm (props: Props) {
  const [telValue, setTelValue] = useState(props.user?.telphone)

  const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    setTelValue(props.user?.telphone)
    return props.onSubmit(event)
  }

  return (
    <form className={css["default-form"]} onSubmit={onSubmit}>
        <Label htmlFor="username">
            <span>Nome</span>
            <Input id="username" type="text" placeholder="Nome do seu cliente" defaultValue={props.user?.name} required />
        </Label>
        <Label htmlFor="telphone" className='relative'>
            <span>Telefone</span>
            <input 
              id="telphone" 
              required 
              pattern="^(\+[0-9]{1,4})?[0-9]{10,}$"
              minLength={12}
              value={telValue}
              className='absolute opacity-0 pointer-events-none w-full h-full'
            />
            <PhoneInput 
              containerClass={css["telphone-container"]} 
              buttonClass={css["telphone-button"]}
              inputClass={css["telphone-input"]} 
              country={'br'} 
              value={telValue}
              onChange={setTelValue}
              placeholder="+  55 (21) 99999-9999"
            />
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