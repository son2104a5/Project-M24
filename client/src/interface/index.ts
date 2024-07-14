export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  status: boolean;
  avatar: string;
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
  products: any[];
  quantity: number;
  price: number;
  buyAt: string;
  email: string;
  address: string;
  status: boolean;
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

export interface Errors {
  [key: string]: string;
}