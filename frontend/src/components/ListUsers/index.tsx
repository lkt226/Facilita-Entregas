'use client';

import css from './style.module.scss'

import { ScrollArea } from "@/components/ui/scroll-area"
import ListUsersIntern from "./ListUsersIntern";

export default function ListUsers() {

  return (
    <div className={css["list-container"]}>
      <ListUsersIntern />
    </div>
  )
}