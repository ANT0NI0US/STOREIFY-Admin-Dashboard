import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import Modal from "@/ui/Modal";
import ConfirmMessage from "@/ui/ConfirmMessage";
import Button from "@/ui/Button";
import { userProps, userState } from "@/utils/types";
import { AppDispatch } from "@/store";
import { deleteUser } from "@/store/service/userService";

interface Props {
  user: userProps;
}

export default function DeleteUser({ user }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: userState) => state.user);

  const action = () => {
    if (user?.id && typeof user.photoURL === "string") {
      dispatch(deleteUser({ id: user.id, photoURL: user.photoURL }))
        .unwrap()
        .then(() => {
          toast.success("User has been deleted successfully");
        })
        .catch(() => {
          toast.success("Something went wrong");
        });
    }
  };

  return (
    <Modal>
      <Modal.Open opens="deleteCertainUser">
        <Button
          AriaLabel="Delete User"
          variation="secondary"
          size="actions"
          Font="!w-10"
        >
          <AiFillDelete />
        </Button>
      </Modal.Open>
      <Modal.Window name="deleteCertainUser">
        <ConfirmMessage
          message={`Are you sure you wanna to delete this user "${user?.displayName}" ?`}
          onConfirm={action}
          disabled={isLoading}
        />
      </Modal.Window>
    </Modal>
  );
}
