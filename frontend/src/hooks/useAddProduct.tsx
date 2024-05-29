import { addProductShema } from "@/schemas/productSchema";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { addProduct } from "@/api/product";
import { createProductTypes } from "@/types/jwtPayload";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { queryClient } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const useAddProduct = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isPending, mutate } = useMutation({
    mutationFn: addProduct,
    onSuccess: (data: createProductTypes) => {
      if (data?.status === "error") {
        return toast({
          variant: "destructive",
          title: "Error",
          description: data?.message,
        });
      }
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        type: "foreground",
        title: "Success",
        description: "You have successfully added a product",
        action: (
          <ToastAction altText="Go to Product">Go to Product</ToastAction>
        ),
      });
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    },
  });
  const onSubmit = (values: z.infer<typeof addProductShema>) => {
    mutate(values);
  };
  return { onSubmit, isPending };
};

export default useAddProduct;
