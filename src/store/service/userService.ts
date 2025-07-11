import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/firebase.config";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { userProps } from "@/utils/types";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { getAuth, deleteUser as deleteAuthUser } from "firebase/auth";

export const getUsers = createAsyncThunk<userProps[], void>(
  "user/getUsers",
  async (_, thunkAPI) => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const allUsers = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as userProps[];
      return thunkAPI.fulfillWithValue(allUsers);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async ({ id, photoURL }: { id: string; photoURL: string }, thunkAPI) => {
    try {
      // 1- DELETE USER FROM USERS TABLE
      await deleteDoc(doc(db, "users", id));

      // 2- DELETE USER PHOTO FROM STORAGE
      if (photoURL) {
        const storage = getStorage();
        const desertRef = ref(storage, photoURL);
        await deleteObject(desertRef);
      }
      const auth = getAuth();
      const user = auth.currentUser;

      // 3- DELETE USER FORM AUTHENTICATION
      if (user && user.uid === id) {
        await deleteAuthUser(user);
      }
      return thunkAPI.fulfillWithValue(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (userId: string, thunkAPI) => {
    try {
      const userRef = doc(db, "users", userId);
      const userSnapShot = await getDoc(userRef);

      if (userSnapShot.exists()) {
        const userData = userSnapShot.data();
        return thunkAPI.fulfillWithValue({
          id: userSnapShot.id,
          ...userData,
        }) as userProps;
      } else {
        return thunkAPI.rejectWithValue("User not found");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
