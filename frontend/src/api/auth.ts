import { baseURL, token } from "@/lib/utils";
import { addUserSchema, userSignInSchema } from "@/schemas/userSchema";
import { z } from "zod";
import axios from "axios";
export const signUpUser = async (user: z.infer<typeof addUserSchema>) => {
  try {
    const res = await axios.post(`${baseURL}/api/auth/signup`, user, {
      headers: {
        "Content-Type": "application/json",
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

export const signInUser = async (user: z.infer<typeof userSignInSchema>) => {
  try {
    const res = await axios.post(`${baseURL}/api/auth/signin`, user, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    const data = await res.data;
    return data;
  } catch (error) {
    return error;
  }
};

export const signOutUser = async () => {
  try {
    const res = await axios.delete(`${baseURL}/api/auth/signout`, {
      headers: {
        "Content-Type": "application/json",
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

export const getStatusUser = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/users/status`, {
      headers: {
        "Content-Type": "application/json",
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

export const updateUser = async (user: z.infer<typeof addUserSchema>) => {
  try {
    const res = await axios.put(`${baseURL}/api/users/update`, user, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.token}`,
      },
    });
    const data = await res.data;
    return data;
  } catch (error) {
    return error;
  }
};
