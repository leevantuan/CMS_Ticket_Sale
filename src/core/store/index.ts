import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import ticketsSlice from '../redux/index';

const myMiddleware = (store: any) => (next: any) => (action: any) => {
  return next(action);
};

export const store = configureStore({
  reducer: {
    tickets: ticketsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
