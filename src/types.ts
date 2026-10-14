// Types for User
export interface UserState {
  email: string;
  password: string | number;
  avatarUrl?: string;
  id: string;
  token: string;
}

export interface RootState {
  user: UserState;
  cart: CartState;
}

// Type For Product
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Type For Cart
export interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  image: string;
  amount: number;
  totalPrice: number;
}

export interface Cart {
  cart: CartItem[];
  totalAmount: number;
  totalPrice: number;
}

export interface CartState {
  cart: CartItem[];
  totalAmount: number;
  totalPrice: number;
}
