export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    status: boolean;
    role: string;
    cart: any[];
    phoneNumber: string;
  }
  
  export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    idCategory: string;
    stock: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Category {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Order {
    id: number;
    userId: number;
    productId: number;
    quantity: number;
    price: number;
    createdAt: string;
    updatedAt: string;
    status: string;
  }
  
  export interface Cart {
    id: number;
    userId: number;
    productId: number;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    product: Product;
    user: User;
    totalPrice: number;
    totalQuantity: number;
  }
  
  export interface State {
    users: User[];
    products: Product[];
    categories: Category[];
    orders: Order[];
    carts: Cart[];
  }
  