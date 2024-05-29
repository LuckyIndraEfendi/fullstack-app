import { signInUser } from "@/api/auth";
import { userSignInSchema } from "@/schemas/userSchema";
import { JwtPayload } from "@/types/jwtPayload";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { queryClient } from "@/lib/utils";
const useSignInUser = () => {
  const [show, setShow] = useState<boolean>(true);
  const { mutate, isPending } = useMutation({
    mutationFn: signInUser,
    onSuccess: (data: JwtPayload) => {
      if (data?.status !== "success") {
        return toast({
          variant: "destructive",
          title: data?.message,
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
      queryClient.invalidateQueries({ queryKey: ["products"] });
      localStorage.setItem("token", JSON.stringify(data));
      toast({
        type: "foreground",
        title: "Success",
        description: "You have successfully signed in",
        action: <ToastAction altText="Okay">Okay</ToastAction>,
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    },
  });
  const onSubmit = (values: z.infer<typeof userSignInSchema>) => {
    mutate(values);
  };
  return { isPending, onSubmit, setShow, show };
};

export default useSignInUser;
