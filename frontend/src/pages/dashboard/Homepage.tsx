import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { baseURL, cn, generateCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DeleteButton from "@/components/deleteButton";
import { useQuery } from "@tanstack/react-query";
import { getProductWithCurrenUser } from "@/api/product";
import { ProductTypes } from "@/types/productTypes";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { token } from "@/lib/utils";
import { FaUserCircle } from "react-icons/fa";
const Homepage = () => {
  const { isLoading, data } = useQuery<ProductTypes>({
    queryKey: ["products"],
    queryFn: getProductWithCurrenUser,
  });
  if (isLoading) {
    return <Skeleton />;
  }
  console.log(data);
  return (
    <>
      <main className="mx-auto max-w-sm md:max-w-xl lg:max-w-3xl xl:max-w-5xl mt-16">
        <Link to={"/profile"} className="flex justify-end px-10">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FaUserCircle className="text-2xl lg:text-4xl" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Go to profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>

        <div className="py-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold font-sans">
            Welcome, {token?.data?.username}
          </h1>
          <Link to={"/product/add"}>
            <Button>Add new product</Button>
          </Link>
        </div>
        <Table>
          <TableCaption>A list of your recent producs.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-52">Description</TableHead>
              <TableHead>Banner</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <Skeleton />
            ) : (
              data?.data?.products?.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{i}</TableCell>
                  <TableCell className="font-medium">
                    <HoverCard>
                      <HoverCardTrigger className={cn("hover:cursor-pointer")}>
                        {item?.productName.length > 2 &&
                          `${item?.productName
                            .split(" ")
                            .slice(0, 2)
                            .join(" ")} ...`}
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <h1 className="font-bold mb-1">Name</h1>
                        {item?.productName}
                      </HoverCardContent>
                    </HoverCard>
                  </TableCell>
                  <TableCell>
                    <HoverCard>
                      <HoverCardTrigger className={cn("hover:cursor-pointer")}>
                        {item?.productDescription.length > 5 &&
                          `${item?.productDescription
                            .split(" ")
                            .slice(0, 3)
                            .join(" ")} ...`}
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <h1 className="font-bold mb-1">Description</h1>
                        {item?.productDescription}
                      </HoverCardContent>
                    </HoverCard>
                  </TableCell>
                  <TableCell>
                    <HoverCard>
                      <HoverCardTrigger>
                        <img
                          src={`${baseURL}/${item?.productImage}`}
                          className="w-11 h-11 p-1 hover:cursor-pointer"
                          alt=""
                        />
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <img
                          src={`${baseURL}/${item?.productImage}`}
                          className="w-56 h-56 p-1"
                          alt=""
                        />
                      </HoverCardContent>
                    </HoverCard>
                  </TableCell>
                  <TableCell>{item?.productCategory}</TableCell>
                  <TableCell>{item?.productCountInStock}</TableCell>
                  <TableCell>{generateCurrency(item?.productPrice)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-center">
                      <Link to={`/edit/product/${item?._id}`}>
                        <Button
                          className={cn(
                            "h-7 w-10 text-xs bg-yellow-500 hover:bg-yellow-600 rounded-sm"
                          )}
                        >
                          Edit
                        </Button>
                      </Link>
                      <DeleteButton id={item?._id} name={item?.productName} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </main>
    </>
  );
};

export default Homepage;
