import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  picture: string;
  country: string;
  timestamp: number;
  formType: 'uncontrolled' | 'hook';
}

interface FormState {
  latestData: FormData | null;
  countries: Array<{ code: string; name: string }>;
}

const initialState: FormState = {
  latestData: null,
  countries: [
    { code: 'ru', name: 'Russia' },
    { code: 'us', name: 'USA' },
    { code: 'de', name: 'Germany' },
    { code: 'fr', name: 'France' },
    { code: 'cn', name: 'China' },
    { code: 'by', name: 'Belarus' },
  ],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormData>) => {
      state.latestData = action.payload;
    },
    clearFormData: (state) => {
      state.latestData = null;
    },
  },
});

export const { setFormData, clearFormData } = formSlice.actions;
export default formSlice.reducer;
