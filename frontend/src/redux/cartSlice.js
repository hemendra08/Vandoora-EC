import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => (item._id || item.id) === (action.payload._id || action.payload.id)
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }
      state.cartTotalQuantity += 1;
      state.cartTotalAmount += action.payload.price;
    },
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (item) => (item._id || item.id) !== (action.payload._id || action.payload.id)
      );
      state.cartItems = nextCartItems;
      
      // Recalculate totals
      state.cartTotalQuantity = nextCartItems.reduce((acc, item) => acc + item.cartQuantity, 0);
      state.cartTotalAmount = nextCartItems.reduce((acc, item) => acc + item.price * item.cartQuantity, 0);
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => (item._id || item.id) === (action.payload._id || action.payload.id)
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        state.cartTotalQuantity -= 1;
        state.cartTotalAmount -= action.payload.price;
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => (item._id || item.id) !== (action.payload._id || action.payload.id)
        );
        state.cartItems = nextCartItems;
        state.cartTotalQuantity -= 1;
        state.cartTotalAmount -= action.payload.price;
      }
    },
    clearCart(state) {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
