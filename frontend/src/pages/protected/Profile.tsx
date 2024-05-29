import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { getStatusUser } from "@/api/auth";
import { BallTriangle } from "react-loader-spinner";
import useUpdateProfile from "@/hooks/useUpdateProfile";
import { profileUpdateTypes } from "@/types/userTypes";
import dateFormat from "dateformat";
import { userUpdateSchema } from "@/schemas/userSchema";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import useSignOut from "@/hooks/useSignOut";

const Profile = () => {
  const { data, isLoading } = useQuery<profileUpdateTypes>({
    queryKey: ["profile"],
    queryFn: getStatusUser,
  });
  const form = useForm<z.infer<typeof userUpdateSchema>>({
    resolver: zodResolver(userUpdateSchema),
  });
  const { onSubmit, isPending } = useUpdateProfile();
  const { handleLogout, isPendingLogout } = useSignOut();
  return (
    <>
      <main className="mx-auto max-w-sm md:max-w-xl lg:max-w-3xl xl:max-w-5xl mt-16">
        {isLoading ? (
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass="w-full h-screen flex justify-center items-center"
            visible={true}
          />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                <div className="flex justify-between">
                  <div className="desc">
                    <p>
                      User Created At : &nbsp;{" "}
                      <strong>{dateFormat(data?.data?.createdAt)}</strong>
                    </p>
                    <p>
                      User Updated At : &nbsp;{" "}
                      <strong>{dateFormat(data?.data?.updatedAt)}</strong>
                    </p>
                  </div>
                  {isPendingLogout ? (
                    <Button variant={"secondary"} disabled>
                      Loading...
                    </Button>
                  ) : (
                    <Button variant={"secondary"} onClick={handleLogout}>
                      Logout
                    </Button>
                  )}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diplay Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your display name"
                            {...field}
                            defaultValue={data?.data?.name}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="disable_email">
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email address"
                          defaultValue={data?.data?.email}
                          className={cn("disabled:text-gray-700")}
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
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
                            defaultValue={data?.data?.gender}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a gender" />
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
                      Update profile
                    </Button>
                  )}
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Link to={"/"} className="w-full">
                <Button
                  type="submit"
                  variant={"destructive"}
                  className="w-full"
                >
                  Go Back to Homepage
                </Button>
              </Link>
            </CardFooter>
          </Card>
        )}
      </main>
    </>
  );
};

export default Profile;
