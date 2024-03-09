'use client';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useDispatch } from "react-redux"
import { setFilterWord } from '@/features/client/usersSlice'
import { Search } from "lucide-react";

export default function SearchUser() {
  const dispatch = useDispatch()

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterWord(e.target.value))
  }

  return (
    <div className="flex w-full items-center space-x-2">
      <Input onInput={handleSearchInput} type="text" placeholder="Buscar por nome, email ou telefone" />
      <Button className="py-1 px-2"><Search/></Button>
    </div>
  )
}