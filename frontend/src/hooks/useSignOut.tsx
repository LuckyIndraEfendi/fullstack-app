import { signOutUser } from "@/api/auth";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
const useSignOut = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: signOutUser,
    onSuccess: (data: { status: string; message: string }) => {
      if (data?.status !== "success") {
        return toast({
          variant: "destructive",
          title: "Error",
          description: data?.message,
          action: <ToastAction altText="Try again!">Try again!</ToastAction>,
        });
      }
      toast({
        variant: "default",
        title: "Successfully logout ",
        description: data?.message,
        action: <ToastAction altText="Okay">Okay</ToastAction>,
      });
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 2000);
    },
  });
  const handleLogout = () => {
    localStorage.removeItem("token");
    mutate();
  };
  return { handleLogout, isPendingLogout: isPending };
};

export default useSignOut;
