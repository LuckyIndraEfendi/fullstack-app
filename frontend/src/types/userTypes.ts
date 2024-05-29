export interface profileUpdateTypes {
  status: string;
  data: {
    _id: string;
    name: string;
    email: string;
    password: string;
    gender: string;
    isAdmin: boolean;
    products: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}
