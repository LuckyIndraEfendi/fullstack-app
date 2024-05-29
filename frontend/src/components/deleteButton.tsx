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
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import useDeleteProduct from "@/hooks/useDeleteProduct";
const DeleteButton = ({ id, name }: { id: string; name: string }) => {
  const { isPending, handleDeleteProduct } = useDeleteProduct();

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          className={cn(
            "h-7 w-12 text-xs bg-red-500 hover:bg-red-600 rounded-sm"
          )}
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure delete : <span className="font-bold">{name}</span>?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {isPending ? (
            <AlertDialogAction>Loading...</AlertDialogAction>
          ) : (
            <AlertDialogAction
              onClick={() => handleDeleteProduct(id)}
              className={cn("bg-red-500 hover:bg-red-600")}
            >
              Continue
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
