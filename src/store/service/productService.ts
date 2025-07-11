import { createAsyncThunk } from "@reduxjs/toolkit";
import { db, storage } from "@/firebase.config";
import { newProductProps, productCardProps } from "@/utils/types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, thunkAPI) => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const allProducts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as productCardProps[];
      return allProducts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (newProduct: newProductProps, thunkAPI) => {
    try {
      let downloadURL: string | null = null;

      // Check if imgUrl is a File
      if (newProduct.imgUrl instanceof File) {
        const storageRef = ref(
          storage,
          `productImage/${Date.now() + newProduct.productName}`,
        );

        const uploadTaskSnapshot = await uploadBytesResumable(
          storageRef,
          newProduct.imgUrl,
        );
        downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
      } else if (typeof newProduct.imgUrl === "string") {
        // If imgUrl is already a string, use it directly
        downloadURL = newProduct.imgUrl;
      }

      if (downloadURL) {
        const docRef = await addDoc(collection(db, "products"), {
          category: newProduct.category,
          description: newProduct.description,
          imgUrl: downloadURL,
          price: newProduct.price,
          productName: newProduct.productName,
          shortDesc: newProduct.shortDesc,
          reviews: newProduct.reviews,
          avgRating: newProduct.avgRating,
        });

        // Modify newProduct to store the download URL
        newProduct.imgUrl = downloadURL;
        newProduct.id = docRef.id;

        return thunkAPI.fulfillWithValue(newProduct);
      } else {
        throw new Error("Invalid imgUrl");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const editProduct = createAsyncThunk(
  "product/editProduct",
  async (updatedProduct: newProductProps, thunkAPI) => {
    try {
      let downloadURL = updatedProduct.imgUrl;

      if (updatedProduct.imgUrl instanceof File) {
        const storageRef = ref(
          storage,
          `productImage/${Date.now() + updatedProduct.productName}`,
        );
        const uploadTask = await uploadBytesResumable(
          storageRef,
          updatedProduct.imgUrl,
        );
        downloadURL = await getDownloadURL(uploadTask.ref);
      }

      await setDoc(doc(db, "products", updatedProduct.id!), {
        ...updatedProduct,
        imgUrl: downloadURL,
      });

      return { ...updatedProduct, imgUrl: downloadURL };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async ({ id, imgUrl }: { id: string; imgUrl: string }, thunkAPI) => {
    try {
      await deleteDoc(doc(db, "products", id));
      const storage = getStorage();
      const desertRef = ref(storage, imgUrl);
      await deleteObject(desertRef);
      return thunkAPI.fulfillWithValue(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
