import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    uncontrolledData: null,
    hookData: null,
    countries: [
      { code: 'ru', name: 'Russia' },
      { code: 'us', name: 'USA' },
      { code: 'de', name: 'Germany' },
      { code: 'fr', name: 'France' },
      { code: 'cn', name: 'China' },
      { code: 'by', name: 'Belarus' },
    ],
  },
  reducers: {
    setFormData: (state, action) => {
      const { formType, data } = action.payload;
      if (formType === 'uncontrolled') {
        state.uncontrolledData = data;
      } else {
        state.hookData = data;
      }
    },
  },
});

export const { setFormData } = formSlice.actions;
export default formSlice.reducer;
