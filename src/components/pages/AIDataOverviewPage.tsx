import React, { useEffect, useState } from "react";
import { Typography, Card, Col, Row, Button, Timeline, Space } from "antd";
import { Heatmap, G2 } from "@ant-design/plots";
import { HeatmapConfig } from "@ant-design/charts";
import ActionsHeatmap from "../overview/ActionsHeatmap";
import { ExclamationCircleOutlined, FileImageOutlined } from "@ant-design/icons";
import { selectAllPhotos } from "../../store/photos";
import { useAppSelector } from "../../store";
import StatisticCard from "../overview/StatisticCard";
import { actions } from "../../data/actions";
import { ClassifyAction, ComputeError } from "../../models/Action";
const { Title, Text } = Typography;
const AIOverviewPage = () => {
  const numPhotos = Object.keys(useAppSelector(selectAllPhotos)).length;

  return (
    <Row gutter={[25, 25]}>
      <StatisticCard
        title="Total Photos"
        value={numPhotos}
        color="red"
        width={4}
        icon={<FileImageOutlined style={{ fontSize: 30 }} />}
      />
      <StatisticCard
        title="Tags"
        value={108}
        color="green"
        width={4}
        icon={<FileImageOutlined style={{ fontSize: 30 }} />}
      />
      <StatisticCard
        title="Faces"
        value={239}
        color="blue"
        width={4}
        icon={<FileImageOutlined style={{ fontSize: 30 }} />}
      />
      <StatisticCard
        title="Storage Used"
        value="2,932 GB"
        color="purple"
        width={6}
        icon={<FileImageOutlined style={{ fontSize: 30 }} />}
      />
      <StatisticCard
        title="Paople"
        value="8"
        color="orange"
        width={6}
        icon={<FileImageOutlined style={{ fontSize: 30 }} />}
      />
      <Col span={18}>
        <Card hoverable title="Actions">
          <ActionsHeatmap />
        </Card>
      </Col>
      <Col span={6}>
        <Card hoverable title="Timeline">
          <Timeline
            items={actions.map((a) => {
              let color: string;
              let dot;
              if (a instanceof ClassifyAction) {
                color = "green";
              } else if (a instanceof ComputeError) {
                color = "red";
                dot = <ExclamationCircleOutlined style={{ fontSize: 20 }} />
              } else {
                color = "blue";
              }
              return { children: (
                <Space direction="vertical" size={0}>
                  <Text>{a.title}</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>{a.date.getDay() + "/" + a.date.getMonth() + ", " + a.date.toLocaleTimeString().substring(0, 6) + ' PM'}</Text>
                </Space>
              ), color, dot };
            })}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card hoverable title="About">
          About Text
        </Card>
      </Col>
    </Row>
  );
};

export default AIOverviewPage;
