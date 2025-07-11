import { ReactNode } from "react";
import Button from "./Button";
import { createContext } from "vm";

interface FormWrapperProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  type?: string;
}

const FormContext = createContext();

function Form({ onSubmit, type = "modal", children }: FormWrapperProps) {
  return (
    <FormContext.Provider value={{ type }}>
      <form onSubmit={onSubmit}>{children}</form>
    </FormContext.Provider>
  );
}

interface FormHeaderProps {
  title: string;
}

function FormHeader({ title }: FormHeaderProps) {
  return (
    <h1 className="text-primary-color-light dark:text-primary-color rounded-tl-lg rounded-tr-lg border-b bg-white py-4 ps-4 text-xl font-bold tracking-widest uppercase sm:text-3xl dark:bg-black">
      {title}
    </h1>
  );
}

interface FormBodyProps {
  children: ReactNode;
}

function FormBody({ children }: FormBodyProps) {
  return (
    <div className="flex max-h-[calc(80vh-150px)] flex-col gap-[15px] overflow-auto p-[15px] pb-[20px] md:gap-[20px] md:p-[20px] md:pb-[30px]">
      {children}
    </div>
  );
}

interface FormFooterProps {
  isLoading?: boolean;
  onCancel?: () => void;
  canSubmit?: boolean;
}

function FormFooter({
  isLoading = false,
  onCancel,
  canSubmit = true,
}: FormFooterProps) {
  return (
    <div className="rounded-br-lg rounded-bl-lg border-t bg-[#f1eded] px-4 py-6 dark:bg-[#170000]">
      <div className="ms-auto flex w-full gap-[10px] sm:w-[60%]">
        <Button
          AriaLabel="Submit"
          type="submit"
          loading={isLoading}
          disabled={canSubmit}
        >
          Submit
        </Button>
        {onCancel && (
          <Button
            AriaLabel="Cancel"
            variation="danger"
            onClick={onCancel}
            loading={isLoading}
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}

Form.Header = FormHeader;
Form.Body = FormBody;
Form.Footer = FormFooter;

export default Form;
