import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Initialize items as an empty array
        summary:0,
    },
    reducers: {
        addItem: (state, action) => {
            const { name, image, cost } = action.payload;
            const existingItem = state.items.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ name, image, cost, quantity: 1 });
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.name !== action.payload.name);
        },
        updateQuantity: (state, action) => {
            const { name_it, qtd_it } = action.payload;
            const itemToUpdate = state.items.find(item => item.name === name_it);

            if (itemToUpdate) {
              itemToUpdate.quantity = qtd_it;
            }

        },
        updateCartSummary: (state) => {
          const cartIconCount = state.items.reduce((total, item) => total + item.quantity, 0);
          const totalCost = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
          state.summary = {
            cartIconCount,
            totalCost,
          };
        },
    },
});

export const { addItem, removeItem, updateQuantity, updateCartSummary } = CartSlice.actions;

export default CartSlice.reducer;
