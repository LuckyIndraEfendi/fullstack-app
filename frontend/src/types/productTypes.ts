export interface ProductTypes {
  status: string;
  message: string;
  data: {
    products: [
      {
        _id: string;
        productName: string;
        productPrice: number;
        productDescription: string;
        productImage: string;
        productCategory: string;
        productCountInStock: number;
        user: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
      }
    ];
  };
}
