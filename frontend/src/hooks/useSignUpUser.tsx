import { signUpUser } from "@/api/auth";
import { addUserSchema } from "@/schemas/userSchema";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useState } from "react";
type ResponseSuccess = {
  status: "success";
  message: string;
};
const UseSignUpUser = () => {
  const [show, setShow] = useState<boolean>(true);
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data: ResponseSuccess) => {
      console.log(data);
      if (data?.status !== "success") {
        return toast({
          variant: "destructive",
          title: data?.message,
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
      toast({
        type: "foreground",
        title: "Success",
        description: "You have successfully signed up",
        action: <ToastAction altText="Okay">Okay</ToastAction>,
      });
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 2000);
    },
  });
  const onSubmit = (values: z.infer<typeof addUserSchema>) => {
    mutate(values);
  };
  return { isPending, onSubmit, setShow, show };
};

export default UseSignUpUser;
