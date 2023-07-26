import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Animal } from './APIResponseTypes';

interface SearchParamsState {
  value: {
    location: string;
    breed: string;
    animal: Animal;
  };
}
const initialState: SearchParamsState = {
  value: {
    location: '',
    breed: '',
    animal: '' as Animal
  }
};

export const searchParamsSlice = createSlice({
  name: 'searchParams',
  initialState,
  reducers: {
    all: (
      state,
      action: PayloadAction<{ location: string; breed: string; animal: Animal }>
    ) => {
      state.value = action.payload;
    }
  }
});

export const { all } = searchParamsSlice.actions;
export default searchParamsSlice.reducer;
