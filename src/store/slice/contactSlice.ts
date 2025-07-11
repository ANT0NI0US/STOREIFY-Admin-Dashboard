import { createSlice } from "@reduxjs/toolkit";
import { getContactData, updateContactData } from "../service/contactService";
import { ContactServiceState } from "@/utils/types";

const initialState: ContactServiceState = {
  isLoading: false,
  Contacts: null,
  isDataChanging: false,
  errors: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContactData.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(getContactData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Contacts = action.payload;
        state.errors = null;
      })
      .addCase(getContactData.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload as string;
      })

      .addCase(updateContactData.pending, (state) => {
        state.isDataChanging = true;
        state.errors = null;
      })
      .addCase(updateContactData.fulfilled, (state, action) => {
        state.isDataChanging = false;
        state.Contacts = action.payload;
        state.errors = null;
      })
      .addCase(updateContactData.rejected, (state, action) => {
        state.isDataChanging = false;
        state.errors = action.payload as string;
      });
  },
});

export default contactSlice.reducer;
