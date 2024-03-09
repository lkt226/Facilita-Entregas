'use client';

import { ScrollArea } from "@/components/ui/scroll-area"
import ListUsersIntern from "./ListUsersIntern";

export default function OrderedUsersList() {
  const sizeCalcule = [
    '70vh'
  ]

  return (
    <ScrollArea style={{ height: `calc(${sizeCalcule.join(' - ')})` }} className="w-full rounded-md border p-4">
      <ListUsersIntern />
    </ScrollArea>
  )
}