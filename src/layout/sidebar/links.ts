import { CiGrid31 } from "react-icons/ci";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { PiUsersThreeLight } from "react-icons/pi";
import { LuClipboardList } from "react-icons/lu";
import { TiContacts } from "react-icons/ti";
import { arrLinks } from "@/utils/types";

export const adminLinks: Array<arrLinks> = [
  {
    href: "/",
    title: "Dashboard",
    icon: CiGrid31,
  },
  {
    href: "products",
    title: "Products",
    icon: MdOutlineProductionQuantityLimits,
  },
  {
    href: "users",
    title: "Users",
    icon: PiUsersThreeLight,
  },
  {
    href: "orders",
    title: "Orders",
    icon: LuClipboardList,
  },
  {
    href: "contact",
    title: "Contact",
    icon: TiContacts,
  },
];
