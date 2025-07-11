import { ReactNode } from "react";

interface modalFormGridProps {
  children: ReactNode;
  columns?: string;
}

export default function ModalFormGrid({
  children,
  columns = "sm:grid-cols-2",
}: modalFormGridProps) {
  return (
    <div className={`flex flex-col gap-3.5 sm:grid md:gap-5 ${columns}`}>
      {children}
    </div>
  );
}
