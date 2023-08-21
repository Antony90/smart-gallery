import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { Heatmap, G2 } from "@ant-design/plots";
import { HeatmapConfig } from "@ant-design/charts";


const ActionsHeatmap = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
      fetch("https://gw.alipayobjects.com/os/antvdemo/assets/data/github-commit.json").then((resp) => {
        resp.json().then(parsed => {
          setData(parsed);
        });
      }) 
    }, []);
    
    const config: HeatmapConfig = {
      data,
      height: 200,
      autoFit: true,
      xField: "week",
      yField: "day",
      colorField: "commits",
      reflect: "y",
      theme: "light",
      shape: "boundary-polygon",
      meta: {
        day: {
          type: "cat",
          values: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        },
        week: {
          type: "cat",
        },
        commits: {
          sync: true,
        },
        date: {
          type: "cat",
        },
      },
      yAxis: {
        grid: null,
      },
      tooltip: {
        title: "date",
        showMarkers: false,
      },
      interactions: [
        {
          type: "element-active",
        },
      ],
      xAxis: {
        position: "top",
        tickLine: null,
        line: null,
        label: {
          offset: 12,
          style: {
            fontSize: 12,
            fill: "#111",
            textBaseline: "top",
          },
          formatter: (val) => {
            if (val === "2") {
              return "MAY";
            } else if (val === "6") {
              return "JUN";
            } else if (val === "10") {
              return "JUL";
            } else if (val === "15") {
              return "AUG";
            } else if (val === "19") {
              return "SEP";
            } else if (val === "24") {
              return "OCT";
            }
    
            return "";
          },
        },
      },
    };
    
    return <Heatmap {...config} />;
}

export default ActionsHeatmap

