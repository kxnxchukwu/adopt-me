import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import adoptedPet from './adoptedPetSlice';
import searchParams from './searchParamsSlice';
import { petApi } from './petApiService';

const store = configureStore({
  reducer: {
    adoptedPet,
    searchParams,
    [petApi.reducerPath]: petApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(petApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
