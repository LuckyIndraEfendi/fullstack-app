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
import useEditProduct from "@/hooks/useEditProduct";
import { Link, useParams } from "react-router-dom";
import useGetDataEdit from "@/hooks/useGetDataEdit";
import { BallTriangle } from "react-loader-spinner";
import { productList } from "@/constants/productList";
const EditProduct = () => {
  const { id } = useParams<string>();

  const { data, isLoading } = useGetDataEdit(id ?? "");
  const { onSubmit, isPending } = useEditProduct();
  const form = useForm<z.infer<typeof addProductShema>>({
    resolver: zodResolver(addProductShema),
  });
  const fileRef = form.register("productImage");
  return (
    <>
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
        <section
          id="edit-product"
          className="mx-auto max-w-sm md:max-w-xl lg:max-w-2xl mt-20"
        >
          <Card>
            <CardHeader>
              <CardTitle>Edit your Product</CardTitle>
              <CardDescription>
                Edit your new product in one-click.
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
                            defaultValue={data?.productName}
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
                            defaultValue={data?.productDescription}
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
                            defaultValue={data?.productPrice}
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
                            defaultValue={data?.productCountInStock}
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
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={data?.productCategory}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Category</SelectLabel>
                                {productList?.map((item, i) => (
                                  <SelectItem value="Electric" key={i}>
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
                    <Button disabled className="w-full">
                      Loading...
                    </Button>
                  ) : (
                    <Button type="submit" className="w-full">
                      Edit Product
                    </Button>
                  )}
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Link to={"/"} className="w-full">
                <Button className="w-full" variant={"destructive"}>
                  Go Back
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </section>
      )}
    </>
  );
};

export default EditProduct;
