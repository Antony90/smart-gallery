import { Button, Card, Col, Row, Typography } from "antd";
import React, { ReactNode } from "react";
const { Text, Title } = Typography;

const StatisticCard: React.FC<{
  title: string;
  value: any;
  color: string;
  width: number;
  icon: ReactNode;
}> = ({ title, value, color, width, icon }) => {
  return (
    <Col span={width}>
      <Card hoverable bodyStyle={{ padding: 18 }}>
        <Row align="middle">
          <Col xs={width < 6 ? 16 : 24 - width}>
            <Text type="secondary" strong style={{ fontSize: 15 }}>
              {title}
            </Text>
            <Title level={3}>{value}</Title>
          </Col>
          <Col xs={width}>
            <Button
              type="primary"
              style={{ backgroundColor: color, height: 60, width: 60 }}
            >
              {icon}
            </Button>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default StatisticCard;
