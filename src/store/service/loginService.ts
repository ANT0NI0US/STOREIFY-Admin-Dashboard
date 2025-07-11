import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "@/firebase.config";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { userProps } from "@/utils/types";
import { collection, getDocs } from "firebase/firestore";

export const signInFireBase = createAsyncThunk(
  "login/signInFireBase",
  async (
    {
      email,
      password,
      rememberMe,
    }: { email: string; password: string; rememberMe: boolean },
    thunkAPI,
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const currentUser = userCredential.user;
      const querySnapshot = await getDocs(collection(db, "users"));
      const fetchedUsers = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      })) as userProps[];
      const result = fetchedUsers.find((user) => user.uid === currentUser.uid);

      if (!result || result.type === "user") {
        throw new Error("User not found in the database");
      }

      if (rememberMe && result.uid) {
        localStorage.setItem("token", result.uid);
      } else if (!rememberMe && result.uid) {
        sessionStorage.setItem("token", result.uid);
      }
      const isAdmin = (result.type as string) === "admin" ? "true" : "false";

      if (rememberMe) {
        localStorage.setItem("isAdmin", isAdmin);
      } else {
        sessionStorage.setItem("isAdmin", isAdmin);
      }

      return thunkAPI.fulfillWithValue({ ...result });
    } catch (error) {
      toast.error("Invalid email or password.");
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getUserByToken = createAsyncThunk(
  "login/getUserByToken",
  async (token: string, thunkAPI) => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const fetchedUsers = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      })) as userProps[];
      const result = fetchedUsers.find((user) => user.uid === token);
      return thunkAPI.fulfillWithValue(result);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const sendResetPasswordEmail = createAsyncThunk(
  "auth/sendResetPasswordEmail",
  async (email: string, thunkAPI) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent successfully.");
      return thunkAPI.fulfillWithValue("Email sent");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Failed to send password reset email.");
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  },
);
