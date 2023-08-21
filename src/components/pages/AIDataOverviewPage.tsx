import React, { useEffect, useState } from "react";
import { Typography, Card, Col, Row, Button, Timeline, Space } from "antd";

import {
  blue,
  red,
  volcano,
  purple,
  green,
  lime,
  orange,
} from "@ant-design/colors";
import ActionsHeatmap from "../overview/ActionsHeatmap";
import {
  DatabaseOutlined,
  ExclamationCircleOutlined,
  FileImageOutlined,
  TagOutlined,
  UserAddOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

import { selectAllPhotos } from "../../store/photos";
import { useAppSelector } from "../../store";
import StatisticCard from "../overview/StatisticCard";
import { actions } from "../../data/actions";
import { ClassifyAction, ComputeError } from "../../models/Action";
import PopularTagsGraph from "../overview/PopularTagsGraph";
import ActionsTimeline from "../overview/ActionsTimeline";
const { Title, Text } = Typography;
const AIOverviewPage = () => {
  const numPhotos = Object.keys(useAppSelector(selectAllPhotos)).length;

  return (
    <>
      <Row gutter={[18, 18]}>
        <StatisticCard
          title="Photos Processed"
          value={numPhotos}
          color={volcano[5]}
          width={4}
          icon={<FileImageOutlined style={{ fontSize: 28 }} />}
        />
        <StatisticCard
          title="Tags Assigned"
          value={108}
          color={green[5]}
          width={4}
          icon={<TagOutlined style={{ fontSize: 28 }} />}
        />
        <StatisticCard
          title="Faces Detected"
          value={239}
          color={blue[5]}
          width={4}
          icon={<UsergroupAddOutlined style={{ fontSize: 28 }} />}
        />
        <StatisticCard
          title="Storage Used"
          value="2,932 MB"
          color={purple[5]}
          width={6}
          icon={<DatabaseOutlined style={{ fontSize: 28 }} />}
        />
        <StatisticCard
          title="Unique People"
          value="8"
          color={orange[5]}
          width={6}
          icon={<FileImageOutlined style={{ fontSize: 30 }} />}
        />
        {/* </Row>
      <Row> */}
        <Col span={9}>
          <Card
            hoverable
            title="Tags"
            bodyStyle={{ padding: 13, paddingBottom: 0 }}
          >
            <PopularTagsGraph />
            <Text
              strong
              style={{
                position: "relative",
                display: "table",
                bottom: 30,
                color: "white",
                fontSize: 15,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Top 7 Popular This Year
            </Text>
          </Card>
        </Col>
        <Col span={9}>
          <Card hoverable title="Actions">
            <ActionsHeatmap />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable title="Timeline">
            <ActionsTimeline />
          </Card>
        </Col>
        {/* </Row>    
      <Row> */}
        <Col span={8}>
          <Card hoverable title="About">
            About Text
          </Card>
        </Col>
        <Col span={10}></Col>
      </Row>
    </>
  );
};

export default AIOverviewPage;
