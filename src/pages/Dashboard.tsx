import OrderStats from "@/components/dashboard/OrderStats";
import ReviewsPercentage from "@/components/dashboard/ReviewsPercentage";
import Top4CustomersTable from "@/components/dashboard/Top4CustomersTable";
import Top5ProductsChart from "@/components/dashboard/Top5ProductsChart";
import Widgets from "@/components/dashboard/Widgets";
import PageHead from "@/ui/PageHead";
import useHelmet from "@/hooks/useHelmet";

export default function Dashboard() {
  useHelmet("Dashboard");

  return (
    <>
      <PageHead headText="Dashboard" />
      <Widgets />
      <div className="my-3.5 grid grid-cols-1 gap-3.5 md:my-5 md:grid-cols-8 md:gap-5">
        <Top5ProductsChart />
        <OrderStats />
      </div>
      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-8 md:gap-5">
        <Top4CustomersTable />
        <ReviewsPercentage />
      </div>
    </>
  );
}
