import { RootDispatch } from "@/app/store";
import { useDispatch } from "react-redux";

import routes from "@/assets/api/routes";

import { refreshUserList } from "@/features/client/usersSlice";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Trash } from "lucide-react"

interface Props {
  id: number;
}

export default function DeleteAction({ id }: Props) {
  const dispatch:RootDispatch = useDispatch()

  const handleDelete = () => {
    routes.users.delete(id).then(() => {
      dispatch(refreshUserList())
    }).catch((error) => {
      console.error(error)
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button><Trash/></button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Gostaria mesmo de deletar esse usuário?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa é uma ação permanente e não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}