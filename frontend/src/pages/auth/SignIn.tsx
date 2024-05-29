import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useSignInUser from "@/hooks/useSignInUser";
import { userSignInSchema } from "@/schemas/userSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { cn } from "@/lib/utils";
const SignIn = () => {
  const form = useForm<z.infer<typeof userSignInSchema>>({
    resolver: zodResolver(userSignInSchema),
  });
  const { isPending, onSubmit, setShow, show } = useSignInUser();
  return (
    <>
      <section id="sign-in" className="flex items-center h-screen">
        <Card className="mx-auto max-w-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold ">Login</CardTitle>
            <CardDescription>
              Enter your email and password to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className={cn("relative")}>
                          <Input
                            placeholder="Enter password"
                            {...field}
                            type={show ? "password" : "text"}
                          />
                          {show ? (
                            <IoIosEye
                              className="text-2xl absolute right-3 top-2 text-gray-700 hover:cursor-pointer"
                              onClick={() => setShow(!show)}
                            />
                          ) : (
                            <IoIosEyeOff
                              className="text-2xl absolute right-3 top-2 text-gray-700 hover:cursor-pointer"
                              onClick={() => setShow(!show)}
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {isPending ? (
                  <Button disabled className="w-full">
                    Loading...
                  </Button>
                ) : (
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                )}
              </form>
            </Form>
            <span className="font-sans text-gray-700 mt-6 text-center block text-base">
              Don't have account?{" "}
              <Link to={"/auth/register"} className="text-blue-600">
                Register
              </Link>
            </span>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default SignIn;
