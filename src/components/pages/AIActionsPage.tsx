import { LikeOutlined, MessageOutlined, OrderedListOutlined, QuestionOutlined, StarOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Space, Statistic, Typography } from 'antd';

import { actions } from "../../data/actions"
import { checkOnline } from '../../client/actions';

const { Title, Text } = Typography;


const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const AIActionsPage = () => {
  const [online, setOnline] = useState(false);
  const [lastCheck, setLastCheck] = useState(new Date());
  
  const handleOnlineCheck = () => {
    checkOnline().then((status) => {
      setOnline(status);
      setLastCheck(new Date());
    });
  };

  useEffect(() => {
    handleOnlineCheck();
    const interval = setInterval(handleOnlineCheck, 720000);
    return () => clearInterval(interval);
  }, []);

  return (
    <List
      itemLayout="vertical"
      size="small"
      pagination={{
        pageSize: 5,
        position: "bottom",
        align: "center",
        style: { margin: -24 }
      }}
      dataSource={actions}
      footer={
        <div>
          <b>Status</b> {online ? "online" : "offline"} | Last check {lastCheck.toLocaleTimeString()}
        </div>
      }
      renderItem={(action) => (
        <List.Item
          key={action.title}
          actions={[
            <Button type="text" icon={<QuestionOutlined />} />,
            <Button type="text" icon={<OrderedListOutlined />} />
          ]}
          style={{ padding: 3 }}
        >
          <List.Item.Meta
            avatar={action.icon}
            title={<a href={""}>{action.title}</a>}
            description={`${action.date.toDateString()} | ${action.date.toTimeString().substring(0, 12)} (${action.responseTime} ms)`}
          />
          {action.description}
        </List.Item>
      )}
    />
  );
};

export default AIActionsPage;
