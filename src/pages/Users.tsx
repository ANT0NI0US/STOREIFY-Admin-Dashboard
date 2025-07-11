import PageHead from "@/ui/PageHead";
import useHelmet from "@/hooks/useHelmet";
import UserTable from "@/components/users/UserTable";

export default function Users() {
  useHelmet("Users");

  return (
    <>
      <PageHead headText="Users" />
      <UserTable />
    </>
  );
}
