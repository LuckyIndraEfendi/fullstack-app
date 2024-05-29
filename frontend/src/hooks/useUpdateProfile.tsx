/* eslint-disable @typescript-eslint/no-explicit-any */
import { updateUser } from "@/api/auth";
import { ToastAction } from "@/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { profileUpdateTypes } from "@/types/userTypes";
import { queryClient } from "@/lib/utils";

const useUpdateProfile = () => {
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data: profileUpdateTypes) => {
      if (data?.status === "error") {
        return toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update profile",
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
        window.location.href = "/";
      }, 2000);
    },
  });

  const onSubmit = (values: any) => {
    mutate(values);
  };
  return { onSubmit, isPending };
};

export default useUpdateProfile;
