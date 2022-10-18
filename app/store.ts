import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "@/pages/counter/counterSlice";
import userReducer from "@/app/reducer/userSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
