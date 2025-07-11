import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import ModalFormGrid from "@/ui/ModalFormGrid";
import TextArea from "@/ui/TextArea";
import Input from "@/ui/Input";
import Choose from "@/ui/Choose";
import ModalBody from "@/ui/ModalBody";
import { isOnlySpaces } from "@/utils/helpers";
import { newProductProps, productState } from "@/utils/types";
import { addProduct, editProduct } from "@/store/service/productService";
import { AppDispatch } from "@/store";

const initialState: newProductProps = {
  productName: "",
  shortDesc: "",
  description: "",
  price: 0,
  category: "",
  imgUrl: null,
};

interface addProductFormProps {
  onCloseModal?: () => void;
  productToEdit?: newProductProps;
}

const categories = ["sofa", "mobile", "chair", "watch", "wireless"];
const allowedImagesTypes = ["jpg", "png", "webp", "jpeg"];

export default function AddProductForm({
  onCloseModal,
  productToEdit,
}: addProductFormProps) {
  const isEditingSession = Boolean(productToEdit);

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: productState) => state.product);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
    setValue,
    trigger,
    control,
    watch,
  } = useForm({
    defaultValues: initialState,
    mode: "onChange",
  });

  const imgUrl = watch("imgUrl");

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setValue(name as keyof newProductProps, files[0]);
      await trigger(name as keyof newProductProps);
    }
  };

  const validateFile = (value: string | File | null) => {
    if (!value) {
      return "This Field is required";
    }

    if (value instanceof File) {
      const fileExtension = value.type.split("/")[1];
      if (!allowedImagesTypes.includes(fileExtension)) {
        return "Only image extensions of type (jpg, png, webp) are allowed to be uploaded.";
      }
      return true;
    }

    return true;
  };

  const handleAddEditProduct = (data: newProductProps) => {
    if (productToEdit) {
      dispatch(editProduct({ ...productToEdit, ...data }))
        .unwrap()
        .then(() => {
          toast.success("Product updated successfully");
          onCloseModal?.();
        })
        .catch(() => toast.error("Something went wrong"));
    } else {
      dispatch(
        addProduct({
          ...data,
          reviews: [],
          avgRating: 5,
        }),
      )
        .unwrap()
        .then(() => {
          toast.success("Product added successfully");
          reset();
          onCloseModal?.();
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    }
  };

  useEffect(() => {
    if (productToEdit) {
      reset(productToEdit);
    }
  }, [productToEdit, reset]);

  return (
    <ModalBody onSubmit={handleSubmit(handleAddEditProduct)}>
      <ModalBody.Header
        title={`${isEditingSession ? "Edit Product" : "Add Product"}`}
      />

      <ModalBody.Body>
        <div className="mb-3.5 w-full sm:mb-5">
          <Input
            fileName="Upload Photo"
            disabled={isLoading}
            type="file"
            accept=".jpg, .png, .webp, .jpeg"
            error={errors?.imgUrl?.message}
            register={register("imgUrl", {
              validate: { validateFile },
            })}
            onChange={handleImageChange}
          />

          {imgUrl && (
            <img
              src={
                typeof imgUrl === "string"
                  ? imgUrl
                  : URL.createObjectURL(imgUrl)
              }
              alt="Selected"
              className="mx-auto mt-[10px] max-h-[200px]"
            />
          )}
        </div>
        <ModalFormGrid>
          <Input
            label="Name"
            disabled={isLoading}
            error={errors?.productName?.message}
            register={register("productName", {
              required: "This Field is required",
              validate: {
                noOnlySpaces: (value) =>
                  !isOnlySpaces(value) || "It Mustn't contains only spaces",
              },
            })}
          />

          <Input
            label="Price ($)"
            disabled={isLoading}
            error={errors?.price?.message}
            register={register("price", {
              required: "This Field is required",
            })}
          />

          <Controller
            name="category"
            control={control}
            rules={{ required: "This Field is required" }}
            render={({ field, fieldState: { error } }) => (
              <Choose
                placeholder="Select Category"
                options={categories.map((category) => ({
                  value: category,
                  label: category,
                }))}
                value={
                  field.value
                    ? { value: field.value, label: field.value }
                    : null
                }
                onChange={(selectedOption) => {
                  if (selectedOption && "value" in selectedOption) {
                    field.onChange(selectedOption.value);
                  } else {
                    field.onChange("");
                  }
                }}
                error={error?.message}
                isDisabled={isLoading}
              />
            )}
          />
        </ModalFormGrid>

        <div className="flex flex-col gap-3.5 sm:gap-5">
          <TextArea
            label="Short Description"
            disabled={isLoading}
            Rows={3}
            register={register("shortDesc", {
              required: "This Field is required",
              validate: {
                noOnlySpaces: (value) =>
                  !isOnlySpaces(value) || "It Mustn't contains only spaces",
              },
            })}
            error={errors?.shortDesc?.message}
          />

          <TextArea
            label="Description"
            disabled={isLoading}
            Rows={5}
            register={register("description", {
              required: "This Field is required",
              validate: {
                noOnlySpaces: (value) =>
                  !isOnlySpaces(value) || "It Mustn't contains only spaces",
              },
            })}
            error={errors?.description?.message}
          />
        </div>
      </ModalBody.Body>

      <ModalBody.Footer
        isLoading={isLoading}
        onCancel={onCloseModal}
        SubmitTitle={`${isEditingSession ? "Edit Product" : "Add Product"}`}
        AriaLabel={`${isEditingSession ? "Edit Product" : "Add Product"}`}
        canSubmit={!isValid || !isDirty}
      />
    </ModalBody>
  );
}
