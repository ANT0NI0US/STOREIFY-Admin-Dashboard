import React, { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

interface HeaderProps {
  children: ReactNode;
}

interface BodyProps<T> {
  data: T[];
  render: (item: T, index: number) => ReactNode;
}

interface RowProps {
  children: ReactNode;
}

interface CellProps {
  children: ReactNode;
  isHeader?: boolean;
  headerHeight?: string;
  colHeight?: string;
}

interface FooterProps {
  children: ReactNode;
}

const Table: React.FC<TableProps> & {
  Header: React.FC<HeaderProps>;
  Body: <T>(props: BodyProps<T>) => JSX.Element;
  Row: React.FC<RowProps>;
  Cell: React.FC<CellProps>;
  Footer: React.FC<FooterProps>;
} = ({ children }) => {
  return (
    <div className="shadow-accent-light-color dark:shadow-accent-dark-color overflow-x-auto rounded-tl-[12px] rounded-tr-[12px] shadow-md">
      <table className="w-full text-center text-sm">{children}</table>
    </div>
  );
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <thead className="bg-accent-light-color dark:bg-accent-dark-color text-lg font-semibold tracking-widest uppercase">
      <tr>{children}</tr>
    </thead>
  );
};

const Body = <T,>({ data, render }: BodyProps<T>): JSX.Element => {
  return <tbody>{data.map(render)}</tbody>;
};

const Row: React.FC<RowProps> = ({ children }) => {
  return (
    <tr className="border-accent-light-color even:bg-primary-light-color odd:bg-secondary-light-color dark:border-accent-dark-color dark:odd:bg-secondary-dark-color dark:even:bg-primary-dark-color not-last:border-b-[0.5px]">
      {children}
    </tr>
  );
};

const Cell: React.FC<CellProps> = ({
  children,
  isHeader = false,
  headerHeight = "",
  colHeight = "",
}) => {
  const Tag = isHeader ? "th" : "td";
  return (
    <Tag scope={isHeader ? "col" : "row"}>
      <div
        className={`flexCenter ${
          isHeader
            ? `${headerHeight ? headerHeight : "min-h-[80px]"} p-4`
            : `${colHeight ? colHeight : "min-h-[100px]"} p-2`
        } flex-col text-center`}
      >
        {children}
      </div>
    </Tag>
  );
};

const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <tfoot>
      <tr>
        <td colSpan={100}>{children}</td>
      </tr>
    </tfoot>
  );
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;
Table.Footer = Footer;

export default Table;
