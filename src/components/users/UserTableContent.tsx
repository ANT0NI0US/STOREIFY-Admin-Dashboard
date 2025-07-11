import DeleteUser from "./DeleteUser";
import Table from "@/ui/Table";
import { userProps } from "@/utils/types";

interface Props {
  user: userProps;
}

export default function UserTableContent({ user }: Props) {
  return (
    <Table.Row key={user?.id}>
      <Table.Cell>
        <img
          loading="lazy"
          src={typeof user?.photoURL === "string" ? user.photoURL : undefined}
          alt={user?.displayName}
          className="size-16 max-h-full max-w-full rounded-full object-cover object-center"
        />
      </Table.Cell>
      <Table.Cell>{user?.displayName}</Table.Cell>
      <Table.Cell>{user?.email}</Table.Cell>
      <Table.Cell>
        <DeleteUser user={user} />
      </Table.Cell>
    </Table.Row>
  );
}
