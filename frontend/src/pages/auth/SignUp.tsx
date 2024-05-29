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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { addUserSchema } from "@/schemas/userSchema";
import UseSignUpUser from "@/hooks/useSignUpUser";

const SignUp = () => {
  const form = useForm<z.infer<typeof addUserSchema>>({
    resolver: zodResolver(addUserSchema),
  });

  const { onSubmit, isPending, setShow, show } = UseSignUpUser();

  return (
    <>
      <section id="register" className="h-screen flex items-center">
        <Card className="mx-auto max-w-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold ">Register</CardTitle>
            <CardDescription>
              Welcome! Please fill in the details below to create your new
              account.
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your display name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <FormField
                  control={form.control}
                  name="jenis_kelamin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder="Select your gender"
                              className={cn("placeholder:text-gray-500")}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Gender</SelectLabel>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
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
                    Register
                  </Button>
                )}
              </form>
            </Form>
            <span className="font-sans text-gray-700 mt-6 text-center block text-base">
              Already have account?{" "}
              <Link to={"/auth/login"} className="text-blue-600">
                Login
              </Link>
            </span>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default SignUp;
