import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Pet } from './APIResponseTypes';

interface AdoptPetState {
  value: Pet | null;
}
const initialState: AdoptPetState = {
  value: null
};

export const adoptedPetSlice = createSlice({
  name: 'adoptedPet',
  initialState,
  reducers: {
    adopt: (state, action: PayloadAction<Pet>) => {
      state.value = action.payload;
    },
    unadopt: (state) => {
      if (state.value) {
        state.value = null;
      }
    }
  }
});

export const { adopt, unadopt } = adoptedPetSlice.actions;
export default adoptedPetSlice.reducer;
