import { useDarkMode } from "@/hooks/useDarkMode";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface ChartsProps {
  data: number[];
  labels: string[];
  type?: "bar" | "line" | "donut";
}

export default function Charts({ data, type = "donut", labels }: ChartsProps) {
  const { isDarkMode } = useDarkMode();

  const chartColors = {
    text: isDarkMode ? "#e8d6c2" : "#4b352a",
    grid: isDarkMode ? "#6e5e48" : "#bbab8c",
    bars: isDarkMode ? [" #8c7a5a", "#bbab8c"] : ["#ccb29e", "#6e5e48"],
  };

  const donutChartData = {
    series: data,
    options: {
      labels,
      colors: chartColors.bars,
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        labels: {
          colors: chartColors.text,
        },
      },
      tooltip: {
        theme: isDarkMode ? "dark" : "light",
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                color: chartColors.text,
              },
              value: {
                show: true,
                color: chartColors.text,
              },
              total: {
                show: true,
                label: "Total",
                color: chartColors.text,
              },
            },
          },
        },
      },
    } as ApexOptions,
  };

  const barChartData = {
    options: {
      chart: {
        id: "top-products",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: labels,
        labels: {
          style: {
            colors: chartColors.text,
          },
        },
        axisBorder: {
          show: true,
          color: chartColors.text,
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: chartColors.text,
          },
        },
      },
      grid: {
        borderColor: chartColors.grid,
      },
      tooltip: {
        theme: isDarkMode ? "dark" : "light",
      },
      legend: {
        labels: {
          colors: chartColors.text,
        },
      },
      plotOptions: {
        bar: {
          distributed: true,
        },
      },
      states: {
        normal: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        hover: {
          filter: {
            type: "darken",
            value: 0.05,
          },
        },
        active: {
          filter: {
            type: "darken",
            value: 0.15,
          },
        },
      },
      colors: chartColors.bars,
    } as ApexOptions,
    series: [
      {
        name: "Top Sold",
        data,
      },
    ],
  };

  const lineChartData = {
    options: {
      chart: {
        id: "line-chart",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: labels,
        labels: {
          style: {
            colors: chartColors.text,
          },
        },
        axisBorder: {
          show: true,
          color: chartColors.text,
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: chartColors.text,
          },
        },
      },
      grid: {
        borderColor: chartColors.grid,
      },
      tooltip: {
        theme: isDarkMode ? "dark" : "light",
      },
      colors: [isDarkMode ? " #8c7a5a" : "#bbab8c"],
    } as ApexOptions,
    series: [
      {
        name: "Top Sold",
        data,
      },
    ],
  };

  const chartOptions =
    type === "bar"
      ? barChartData.options
      : type === "line"
        ? lineChartData.options
        : donutChartData.options;

  const seriesData =
    type === "bar"
      ? barChartData.series
      : type === "line"
        ? lineChartData.series
        : donutChartData.series;

  const maxWidth =
    type === "bar" || type === "line" ? "max-w-[600px]" : "max-w-[400px]";

  return (
    <div className={`w-full ${maxWidth} mx-auto`}>
      <Chart
        key={isDarkMode ? "dark" : "light"}
        options={chartOptions}
        series={seriesData}
        type={type ? type : "donut"}
        width="100%"
        height={400}
      />
    </div>
  );
}
