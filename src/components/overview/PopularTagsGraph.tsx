import React, { useEffect } from "react";
import ApexCharts from "apexcharts";
import { Card } from "antd";
import { options } from "./charts/tagsGraph";

const PopularTagsGraph = () => {
  useEffect(() => {
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  }, []);

  return (
    <div
      id="chart"
      style={{
        background: `transparent linear-gradient(62deg, #00369e 0%, #005cfd 53%, #a18dff 100%) 0% 0% no-repeat`,
        borderRadius: 6,
      }}
    ></div>
  );
};

export default PopularTagsGraph;
