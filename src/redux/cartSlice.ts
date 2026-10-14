import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "../types";

const initialState: CartState = {
  cart: [],
  totalAmount: 0,
  totalPrice: 0,
};

interface AddToCartPayload {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<AddToCartPayload>) {
      const product = action.payload;
      const existedProduct = state.cart.find((item) => item.id === product.id);

      if (existedProduct) {
        existedProduct.amount++;
        existedProduct.totalPrice += product.price;
      } else {
        const newItem: CartItem = {
          id: product.id,
          image: product.image,
          price: product.price,
          amount: 1,
          size: product.size,
          totalPrice: product.price,
          name: product.name,
        };
        state.cart.push(newItem);
      }
      state.totalAmount++;
      state.totalPrice += product.price;
    },
    increaseItemAmount(state, action: PayloadAction<{ id: number }>) {
      const { id } = action.payload;
      const product = state.cart.find((item) => item.id === id);

      if (product) {
        product.amount++;
        product.totalPrice += product.price;
        state.totalAmount++;
        state.totalPrice += product.price;
      }
    },
    decreaseItemAmount(state, action: PayloadAction<{ id: number }>) {
      const { id } = action.payload;
      const product = state.cart.find((item) => item.id === id);

      if (product && product.amount > 1) {
        product.amount--;
        product.totalPrice -= product.price;
        state.totalAmount--;
        state.totalPrice -= product.price;
      }
    },
    removeItemFromCart(state, action: PayloadAction<{ id: number }>) {
      const { id } = action.payload;
      const existedProduct = state.cart.find((item) => item.id === id);

      if (existedProduct) {
        state.cart = state.cart.filter((item) => item.id !== id);
        state.totalAmount -= existedProduct.amount;
        state.totalPrice -= existedProduct.totalPrice;
      }
    },
    clearCart(state) {
      state.cart = [];
      state.totalAmount = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addToCart,
  increaseItemAmount,
  decreaseItemAmount,
  removeItemFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
