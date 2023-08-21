import { Typography, Space, Timeline } from "antd";
import React from "react";
import { ClassifyAction, ComputeError } from "../../models/Action";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { actions } from "../../data/actions";

const { Text } = Typography;

const ActionsTimeline = () => {
  return (
    <Timeline
      items={actions.map((a) => {
        let color: string;
        let dot;
        if (a instanceof ClassifyAction) {
          color = "green";
        } else if (a instanceof ComputeError) {
          color = "red";
          dot = <ExclamationCircleOutlined style={{ fontSize: 20 }} />;
        } else {
          color = "blue";
        }
        return {
          children: (
            <Space direction="vertical" size={0}>
              <Text>{a.title}</Text>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {a.date.getDay() +
                  "/" +
                  a.date.getMonth() +
                  ", " +
                  a.date.toLocaleTimeString().substring(0, 6) +
                  " PM"}
              </Text>
            </Space>
          ),
          color,
          dot,
        };
      })}
    />
  );
};

export default ActionsTimeline;
