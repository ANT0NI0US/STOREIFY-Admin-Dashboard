import { ReactNode } from "react";

interface PageHeadProps {
  headText: string;
  children?: ReactNode;
}

export default function PageHead({ headText, children }: PageHeadProps) {
  return (
    <div className="flexBetween bg-primary-light-color dark:bg-primary-dark-color mb-3.5 gap-2 rounded-md p-2 md:mb-5 md:p-5">
      <p className="text-base font-extrabold md:text-xl">{headText}</p>
      {children && children}
    </div>
  );
}
