import { ApexOptions } from "apexcharts";
export const barChartOptions: ApexOptions = {
  chart: {
    type: "bar",
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    events: {
      dataPointMouseEnter: function () {}, // Disable hover event
      dataPointMouseLeave: function () {}, // Disable hover event
      click: function () {},
      legendClick: function () {},
      markerClick: function () {},
    },
  },
  labels: [],
  fill: {
    type: "solid",
    colors: ["#327163"],
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
    normal: {
      filter: {
        type: "none",
      },
    },
    active: {
      allowMultipleDataPointsSelection: false,
      filter: {
        type: "none",
      },
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 2,
      borderRadiusApplication: "end",
      columnWidth: "90%",
      dataLabels: {
        position: "center",
      },
    },
  },
  dataLabels: {
    style: {
      colors: ["black"],
    },
  },
  tooltip: {
    enabled: true,
  },
  xaxis: {
    labels: {
      show: true,
      trim: true,
      rotateAlways: false,
      hideOverlappingLabels: false,
    },
    categories: [],
    axisTicks: { show: false, strokeWidth: 0 },
    axisBorder: { show: false, strokeWidth: 0 },
  } as ApexXAxis,
  yaxis: {
    show: false,
    axisTicks: { show: false },
    axisBorder: { show: false, strokeWidth: 0 },
    title: {
      text: "",
    },
  } as ApexYAxis,
  legend: {
    show: false,
  },
  grid: {
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
    borderColor: "#F2F4F7",
  },
  stroke: {
    show: false,
    colors: ["transparent"],
    width: 4,
  },
};
export const DrugReportingColumnChartOptions: ApexOptions = {
  chart: {
    type: "bar",
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  legend: {
    offsetY: 10,
    markers: {
      fillColors: ["#3F907D", "#DF7D76"],
      width: 15,
      height: 15,
      radius: 0,
    },
    itemMargin: {
      vertical: 15,
    },
  } as ApexLegend,
  fill: {
    type: "solid",
    colors: ["#3F907D", "#DF7D76"],
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: 25,
    },
  },
  dataLabels: {
    style: {
      fontSize: "12",
      fontWeight: 500,
      colors: ["black"],
    },
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    title: {
      text: "Month",
      style: {
        cssClass: " text-xs font-medium text-gray-500",
      },
    },
    categories: [],
    group: {
      style: {
        colors: ["#327163", "#DF7D76"],
      },
    },
    axisTicks: { show: false },
    axisBorder: { show: true, strokeWidth: 0 },
  } as ApexXAxis,
  yaxis: {
    title: {
      text: "Quantity",
      style: {
        cssClass: " text-xs font-medium text-gray-500",
      },
    },
    labels: {
      show: false,
    },
    axisTicks: { show: false },
    axisBorder: { show: false },
  } as ApexYAxis,
  grid: {
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
    borderColor: "#F2F4F7",
  },
};
