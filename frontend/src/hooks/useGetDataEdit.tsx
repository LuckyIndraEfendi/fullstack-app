import { useQuery } from "@tanstack/react-query";
import { getProductBydId } from "@/api/product";
const useGetDataEdit = (id: string) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductBydId(id ?? ""),
  });
  return { data: data?.data, isLoading, isSuccess };
};

export default useGetDataEdit;
