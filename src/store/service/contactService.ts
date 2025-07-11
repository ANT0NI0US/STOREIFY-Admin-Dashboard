import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/firebase.config";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { ContactDataProps } from "@/utils/types";

export const getContactData = createAsyncThunk(
  "contact/getContactData",
  async (_, thunkAPI) => {
    try {
      const querySnapshot = await getDocs(collection(db, "contact"));
      const doc = querySnapshot.docs[0];
      const aboutData = {
        ...doc.data(),
      } as ContactDataProps;
      return aboutData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const updateContactData = createAsyncThunk(
  "contact/updateContactData",
  async (data: ContactDataProps, thunkAPI) => {
    try {
      const querySnapshot = await getDocs(collection(db, "contact"));
      const docSnap = querySnapshot.docs[0];
      const contactRef = doc(db, "contact", docSnap.id);

      await updateDoc(contactRef, {
        address: data.address,
        email: data.email,
        phone: data.phone,
        sms: data.sms,
      });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
