import { QuestionOutlined } from "@ant-design/icons";
import { Button, Card, Typography } from "antd";
import React from "react";
import { Action } from "../../models/Action";

const { Text } = Typography;
const ActionCard: React.FC<{ action: Action }> = ({ action }) => {
  return (
    <Card
      hoverable
      title={<Text strong>{action.title}</Text>}
      extra={<Button type="text" icon={<QuestionOutlined />} />}
      style={{ margin: 10 }}
    >
      <Card.Meta
        avatar={action.icon}
        description={`${action.date.toDateString()} | ${action.date
          .toTimeString()
          .substring(0, 12)} (${action.responseTime} ms)`}
        title={action.description}
      />
    </Card>
  );
};

export default ActionCard;
