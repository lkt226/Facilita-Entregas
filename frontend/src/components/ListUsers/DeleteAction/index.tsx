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
import { GetUser } from "@/assets/data/types";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  user: GetUser;
}

export default function DeleteAction({ user }: Props) {
  const dispatch:RootDispatch = useDispatch()
  const { toast } = useToast()

  const handleDelete = () => {
    routes.users.delete(user.id).then(() => {
      dispatch(refreshUserList())
      toast({
        title: 'Usuário deletado',
        description: `Você deletou o usuário de email: ${user.email}`,
        variant: 'destructive'
      })
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