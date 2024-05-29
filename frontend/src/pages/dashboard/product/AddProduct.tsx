import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { addProductShema } from "@/schemas/productSchema";
import useAddProduct from "@/hooks/useAddProduct";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { productList } from "@/constants/productList";
const AddProduct = () => {
  const form = useForm<z.infer<typeof addProductShema>>({
    resolver: zodResolver(addProductShema),
  });
  const { onSubmit, isPending } = useAddProduct();
  const fileRef = form.register("productImage");

  return (
    <>
      <section
        id="add-product"
        className="mx-auto max-w-sm md:max-w-xl lg:max-w-2xl mt-20"
      >
        <Card>
          <CardHeader>
            <CardTitle>Create New Product</CardTitle>
            <CardDescription>
              Create your new product in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title Product</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your product name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your description product"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productImage"
                  render={() => (
                    <FormItem>
                      <FormLabel>Banner</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Upload you banner"
                          {...fileRef}
                          type="file"
                          accept=".png, .jpg, .jpeg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your product price"
                          {...field}
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productCountInStock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your product stock"
                          {...field}
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Category</SelectLabel>
                              {productList?.map((item, i) => (
                                <SelectItem value={item?.title} key={i}>
                                  {item?.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {isPending ? (
                  <Button disabled className={cn("w-full")}>
                    Loading...
                  </Button>
                ) : (
                  <Button type="submit" className={cn("w-full")}>
                    Create product
                  </Button>
                )}
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <Link to={"/"} className="w-full">
              <Button className={cn("w-full")} variant={"destructive"}>
                Go Back
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </section>
    </>
  );
};

export default AddProduct;
