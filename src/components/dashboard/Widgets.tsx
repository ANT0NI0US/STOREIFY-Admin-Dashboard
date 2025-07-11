import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { PiUsersThreeLight } from "react-icons/pi";
import { LuClipboardList } from "react-icons/lu";
import GridContainer from "@/ui/GridContainer";
import Spinner from "@/ui/spinner/Spinner";
import {
  orderState,
  productState,
  userState,
  WidgetProps,
} from "@/utils/types";
import { AppDispatch } from "@/store";
import { getProducts } from "@/store/service/productService";
import { getUsers } from "@/store/service/userService";
import { getOrders } from "@/store/service/ordersService";

export default function Widgets() {
  const dispatch = useDispatch<AppDispatch>();
  const { allProducts, isLoading: productsLoading } = useSelector(
    (state: productState) => state.product,
  );
  const { allUsers, isLoading: usersLoading } = useSelector(
    (state: userState) => state.user,
  );
  const { allOrders, isLoading: ordersLoading } = useSelector(
    (state: orderState) => state.order,
  );

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getUsers());
    dispatch(getOrders());
  }, [dispatch]);

  const totalAmount = allOrders.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.itemsAmount;
  }, 0);

  const serviceData: WidgetProps[] = useMemo(
    () => [
      {
        icon: LiaMoneyCheckAltSolid,
        title: "Sales",
        description: `${totalAmount}$`,
      },
      {
        icon: LuClipboardList,
        title: "Orders",
        description: allOrders.length.toString(),
      },
      {
        icon: MdOutlineProductionQuantityLimits,
        title: "Products",
        description: allProducts.length.toString(),
      },
      {
        icon: PiUsersThreeLight,
        title: "Users",
        description: allUsers.length.toString(),
      },
    ],
    [allOrders, allProducts, allUsers, totalAmount],
  );

  if (productsLoading || usersLoading || ordersLoading)
    return <Spinner height="h-[20dvh]" />;

  return (
    <GridContainer Styles="xs:grid-cols-[repeat(auto-fill,minmax(350px,1fr))]! gap-[10px]!">
      {serviceData?.map(({ icon: Icon, title, description }, index) => (
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: index % 2 === 0 ? -50 : 50 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ scale: 1.02 }}
          key={index}
          className="bg-primary-light-color dark:bg-primary-dark-color flexBetween flex-col-reverse rounded-md p-3 sm:flex-row md:p-5"
        >
          <div className="flex w-full flex-1 flex-col gap-4 text-center sm:text-start">
            <h3 className="text-lg font-medium md:text-xl">{title}</h3>
            <p className="text-2xl font-semibold">{description}</p>
          </div>
          <div className="flexCenter bg-accent-light-color dark:bg-accent-dark-color rounded-full p-3 text-4xl sm:text-2xl md:p-4">
            <Icon />
          </div>
        </motion.div>
      ))}
    </GridContainer>
  );
}
