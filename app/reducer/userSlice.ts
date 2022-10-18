import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";


export interface UserState {
  token: string;
  email: string;
}

const initialState: UserState = {
  token: "",
  email: "",
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { setToken, setEmail } = UserSlice.actions;

export const selectToken = (state: RootState) => state.user.token;
export const selectEmail = (state: RootState) => state.user.email;
export default UserSlice.reducer;
