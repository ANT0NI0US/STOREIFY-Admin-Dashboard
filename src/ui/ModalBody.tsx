import { FormEventHandler, ReactNode } from "react";
import Button from "./Button";

interface ModalBodyProps {
  onSubmit?: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
  type?: "form" | "div";
}

export default function ModalBody({
  onSubmit,
  children,
  type = "form",
}: ModalBodyProps) {
  return type === "form" ? (
    <form onSubmit={onSubmit}>{children}</form>
  ) : (
    <div>{children}</div>
  );
}

interface FormHeaderProps {
  title: string;
}

function FormHeader({ title }: FormHeaderProps) {
  return (
    <h1 className="bg-primary-light-color dark:bg-primary-dark-color rounded-tl-lg rounded-tr-lg border-b py-6 ps-5 text-xl font-semibold tracking-wider uppercase sm:text-2xl">
      {title}
    </h1>
  );
}

interface FormBodyProps {
  children: ReactNode;
}

function FormBody({ children }: FormBodyProps) {
  return (
    <div className="bg-secondary-light-color dark:bg-secondary-dark-color flex max-h-[calc(80vh-150px)] min-h-[26vh] flex-col gap-3.5 overflow-auto p-5 sm:gap-5 md:p-[20px] md:pb-[30px]">
      {children}
    </div>
  );
}

interface FormFooterProps {
  isLoading?: boolean;
  onCancel?: () => void;
  canSubmit?: boolean;
  SubmitTitle?: string;
  AriaLabel?: string;
  children?: ReactNode;
}

function FormFooter({
  isLoading = false,
  onCancel,
  canSubmit = false,
  SubmitTitle,
  AriaLabel,
  children,
}: FormFooterProps) {
  return (
    <div className="bg-primary-light-color dark:bg-primary-dark-color rounded-br-lg rounded-bl-lg border-t px-4 py-6">
      <div
        className={`ms-auto flex w-full gap-[10px] ${
          onCancel && (SubmitTitle || children) ? "sm:w-[60%]" : "sm:w-[30%]"
        }`}
      >
        {SubmitTitle && AriaLabel && (
          <Button
            AriaLabel={AriaLabel}
            type="submit"
            loading={isLoading}
            disabled={canSubmit}
          >
            {SubmitTitle}
          </Button>
        )}

        {children}

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

ModalBody.Header = FormHeader;
ModalBody.Body = FormBody;
ModalBody.Footer = FormFooter;
