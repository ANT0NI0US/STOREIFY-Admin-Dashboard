import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RiSave2Line } from "react-icons/ri";
import ModalFormGrid from "@/ui/ModalFormGrid";
import Input from "@/ui/Input";
import Button from "@/ui/Button";
import Spinner from "@/ui/spinner/Spinner";
import { EMAIL_REGEX } from "@/utils/constants";
import { ContactDataProps, ContactState } from "@/utils/types";
import { isOnlySpaces } from "@/utils/helpers";
import { AppDispatch } from "@/store";
import {
  getContactData,
  updateContactData,
} from "@/store/service/contactService";

const initialState: ContactDataProps = {
  address: "",
  email: "",
  phone: "",
  sms: "",
};

export default function ContactForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isDataChanging, Contacts } = useSelector(
    (state: ContactState) => state.contact,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues: initialState,
    mode: "onChange",
  });

  const handleChangeContact = (data: ContactDataProps) => {
    dispatch(updateContactData(data))
      .unwrap()
      .then(() => toast.success("Contact updated successfully"))
      .catch(() => toast.error("Something went wrong"));
  };
  useEffect(() => {
    dispatch(getContactData());
  }, [dispatch]);

  useEffect(() => {
    if (Contacts) reset(Contacts);
  }, [Contacts, reset]);

  const isWorking = isDataChanging || isLoading;

  if (isLoading) return <Spinner height="h-[50dvh]" />;

  return (
    <form onSubmit={handleSubmit(handleChangeContact)}>
      <ModalFormGrid>
        <Input
          label="Address"
          disabled={isWorking}
          error={errors?.address?.message}
          register={register("address", {
            required: "This Field is required",
            minLength: {
              value: 5,
              message: "Address must be at least 5 characters",
            },
            validate: {
              noOnlySpaces: (value) =>
                !isOnlySpaces(value) || "It Mustn't contains only spaces",
            },
          })}
        />
        <Input
          label="Email"
          disabled={isWorking}
          error={errors?.email?.message}
          register={register("email", {
            required: "This Field is required",
            validate: {
              noOnlySpaces: (value) =>
                !isOnlySpaces(value) || "It Mustn't contains only spaces",
            },
            pattern: {
              value: EMAIL_REGEX,
              message: "Enter a valid email.",
            },
          })}
        />
        <Input
          label="Phone"
          disabled={isWorking}
          error={errors?.phone?.message}
          register={register("phone", {
            required: "This Field is required",
            pattern: {
              value: /^\+?[0-9]{10,15}$/,
              message:
                "Enter a valid phone number (10–15 digits, with optional +)",
            },
          })}
        />
        <Input
          label="SMS"
          disabled={isWorking}
          error={errors?.sms?.message}
          register={register("sms", {
            required: "This Field is required",
            pattern: {
              value: /^\+?[0-9]{10,15}$/,
              message:
                "Enter a valid phone number (10–15 digits, with optional +)",
            },
          })}
        />
      </ModalFormGrid>

      <Button
        AriaLabel="Change Contact Information"
        type="submit"
        disabled={!isValid || !isDirty}
        loading={isWorking}
        Font="mt-3.5 md:mt-5 ms-auto w-[150px]!"
      >
        <RiSave2Line />
        <span>Save</span>
      </Button>
    </form>
  );
}
