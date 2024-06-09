import { configureStore } from "@reduxjs/toolkit";
import soundReducer from "./soundSlice";

const store = configureStore({
  reducer: {
    sound: soundReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
