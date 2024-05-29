import { baseURL, token } from "@/lib/utils";
import { addProductShema } from "@/schemas/productSchema";
import { z } from "zod";
import axios from "axios";

export const addProduct = async (product: z.infer<typeof addProductShema>) => {
  try {
    addProductShema.parse(product);
    const formData = new FormData();
    for (const [key, value] of Object.entries(product)) {
      if (key === "productImage" && value instanceof FileList) {
        formData.append(key, value[0]);
      } else {
        formData.append(key, String(value));
      }
    }
    const res = await axios.post(`${baseURL}/api/product`, formData, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
      withCredentials: true,
    });
    const data = await res.data;
    return data;
  } catch (error) {
    return error;
  }
};

export const getProductWithCurrenUser = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/users/products`, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
      withCredentials: true,
    });
    const data = await res.data;
    return data;
  } catch (error) {
    return error;
  }
};

export const getProductBydId = async (id: string) => {
  try {
    const res = await axios.get(`${baseURL}/api/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
      withCredentials: true,
    });
    const data = await res.data;
    return data;
  } catch (error) {
    return error;
  }
};

export const editProduct = async (
  product: z.infer<typeof addProductShema>,
  id: string
) => {
  try {
    addProductShema.parse(product);
    const formData = new FormData();
    for (const [key, value] of Object.entries(product)) {
      if (key === "productImage" && value instanceof FileList) {
        formData.append(key, value[0]);
      } else {
        formData.append(key, String(value));
      }
    }
    const res = await axios.put(`${baseURL}/api/product/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
      withCredentials: true,
    });
    const data = await res.data;
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const res = await axios.delete(`${baseURL}/api/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
      withCredentials: true,
    });
    const data = await res.data;
    return data;
  } catch (error) {
    return error;
  }
};
