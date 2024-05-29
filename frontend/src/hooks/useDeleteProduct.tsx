import { deleteProduct } from "@/api/product";
import { queryClient } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
const useDeleteProduct = () => {
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data: { status: string }) => {
      if (data?.status !== "success") {
        return toast({
          variant: "destructive",
          title: "Failed to delete your product",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
      toast({
        variant: "default",
        title: "Successfully to delete your product",
        description: "Successfully to delete your product",
        action: <ToastAction altText="Try again">Okay</ToastAction>,
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  const handleDeleteProduct = (id: string) => {
    mutate(id);
  };
  return { isPending, handleDeleteProduct };
};

export default useDeleteProduct;
