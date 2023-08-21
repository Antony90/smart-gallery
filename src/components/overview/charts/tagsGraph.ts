export const options = {
    series: [
      {
        name: "Photos",
        data: [2, 12, 4, 3, 8, 23, 9],
        color: "#fff",
      },
    ],
    toolbar: {
      show: false,
    },
    chart: {
      height: 330,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (v: Number) => v,
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#ffffff"],
      },
    },
    grid: {
      show: true,
      borderColor: "#ccc",
      strokeDashArray: 2,
    },
    xaxis: {
      categories: [
        "Nature",
        "Portrait",
        "Sunset",
        "Beach",
        "Mountains",
        "Document",
        "Landmark",
      ],
      position: "top",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },

      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      labels: {
        style: {
          colors: [
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
          ],
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: (v: Number) => v,
      },
      style: {
        colors: [
          "#fff",
          "#fff",
          "#fff",
          "#fff",
          "#fff",
          "#fff",
          "#fff",
          "#fff",
          "#fff",
          "#fff",
        ],
      },
    },

  };
