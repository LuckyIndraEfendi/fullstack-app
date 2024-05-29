import { addProductShema } from "@/schemas/productSchema";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { editProduct } from "@/api/product";
import { createProductTypes } from "@/types/jwtPayload";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "react-router-dom";
import { queryClient } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
type EditProductParams = {
  product: z.infer<typeof addProductShema>;
  id: string;
};

const useEditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const { isPending, mutate } = useMutation<
    createProductTypes,
    Error,
    EditProductParams
  >({
    mutationFn: ({ product, id }) => editProduct(product, id),
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
    mutate({ product: values, id: id ?? "" });
  };
  return { onSubmit, isPending };
};

export default useEditProduct;
