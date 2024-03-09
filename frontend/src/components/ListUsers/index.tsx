'use client';

import { ScrollArea } from "@/components/ui/scroll-area"
import ListUsersIntern from "./ListUsersIntern";

export default function ListUsers() {
  const sizeCalcule = [
    '100vh', 
    'var(--header-height)', 
    'var(--footer-height)', 
    '(var(--global-padding-y) * 2)',
    '1rem',
    '40px'
  ]

  return (
    <ScrollArea style={{ height: `calc(${sizeCalcule.join(' - ')})` }} className="w-full rounded-md border p-4">
      <ListUsersIntern />
    </ScrollArea>
  )
}