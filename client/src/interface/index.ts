export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    status: boolean;
    avatar: string;
    address: string;
    role: string;
    cart: any[];
    history: any[];
    favourites: any[];
    phoneNumber: string;
  }
  
  export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    idCategory: number;
    stock: number;
    createdAt: string;
    updatedAt: string;
    hasPrice: number;
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

  export interface Banner {
    id: number;
    image: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface State {
    users: User[];
    products: Product[];
    categories: Category[];
    orders: Order[];
    banners: Banner[];
  }
  