import { LikeOutlined, MessageOutlined, OrderedListOutlined, QuestionOutlined, StarOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Col, List, Row, Space, Statistic, Typography } from 'antd';

import { actions } from "../../data/actions"
import { checkOnline } from '../../client/actions';
import ActionCard from '../actions/ActionCard';

const { Title, Text, Link } = Typography;


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
    <Row>
      {actions.map(action => (
        <Col span={24}>
          <ActionCard action={action}/>
        </Col>
      ))}
    </Row>
  );
};

export default AIActionsPage;
