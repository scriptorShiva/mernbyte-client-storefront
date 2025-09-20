import { createSlice } from "@reduxjs/toolkit";

export interface CartState {
  value: number;
}

const initialState: CartState = {
  value: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      // in redux we don't have permission to directly mutate the state like this instead we have to replace the state with the new state. But in latest update in redux we have immer library which allows us to mutate the state directly
      state.value += 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment } = cartSlice.actions;

export default cartSlice.reducer;
