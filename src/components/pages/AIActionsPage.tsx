import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Avatar, List, Space, Typography } from 'antd';

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
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 4,
      }}
      dataSource={actions}
      footer={
        <div>
          <b>Status</b> {online ? "online" : "offline"} | Last check: {lastCheck.toLocaleTimeString()}
        </div>
      }
      renderItem={(action) => (
        <List.Item
          key={action.title}
          actions={[
            <IconText
              icon={StarOutlined}
              text="156"
              key="list-vertical-star-o"
            />,
            <IconText
              icon={LikeOutlined}
              text="156"
              key="list-vertical-like-o"
            />,
            <IconText
              icon={MessageOutlined}
              text="2"
              key="list-vertical-message"
            />,
          ]}
          extra={
            <img
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          <List.Item.Meta
            avatar={action.icon}
            title={<a href={""}>{action.title}</a>}
            description={`${action.date.toDateString()} | ${action.date.toTimeString().substring(0, 12)}`}
          />
          {action.description}
        </List.Item>
      )}
    />
  );
};

export default AIActionsPage;
