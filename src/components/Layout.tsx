import './Layout.css';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout as ADLayout, Breadcrumb, Menu, Typography, Space, FloatButton, theme, Input, Row, Col, Avatar, Button, Badge, Select } from 'antd';
import { BarChartOutlined, BellFilled, CodepenOutlined, DingtalkOutlined, FolderOpenOutlined, HomeFilled, HomeOutlined, NotificationFilled, NotificationOutlined, PictureOutlined, RobotOutlined, SettingFilled, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { blue } from '@ant-design/colors';
import { useState } from 'react';
import { SettingsOutlined } from '@mui/icons-material';


const { Header, Content, Footer, Sider } = ADLayout;
const { Title, Text } = Typography;
const { Search } = Input;

const menuItems = [
  {
    label: 'AI',
    key: 'ai',
    icon: <RobotOutlined />,
    children: [
      {
        label: 'Actions',
        key: '/ai/actions',
        icon: <NotificationOutlined />
      }, {
        label: 'Data Overview',
        key: '/ai/data',
        icon: <BarChartOutlined />
      }
    ]
  },
  {
    label: 'Photos',
    key: '/',
    icon: <PictureOutlined />
  },
  {
    label: 'Faces',
    key: '/faces',
    icon: <TeamOutlined />
  },
  {
    label: 'Albums',
    key: '/albums',
    icon: <FolderOpenOutlined />
  }
];

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Take initial val from router-dom incase url is not index
  const [selected, setSelected] = useState(location.pathname);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ADLayout style={{ minHeight: "100vh" }}>
      <Sider
        width={214}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo">
          <CodepenOutlined
            className="logo-icon"
            style={{
              fontSize: collapsed ? 35 : 28,
              marginLeft: collapsed ? 8 : 0,
            }}
          />
          {!collapsed && (
            <Title level={3} className="logo-title">
              Smart Gallery
            </Title>
          )}
        </div>

        <Menu
          items={menuItems}
          openKeys={["ai"]}
          mode="inline"
          theme="dark"
          selectedKeys={[selected]}
          onClick={(e) => {
            setSelected(e.key);
            navigate(e.key);
          }}
        />
      </Sider>
      <ADLayout>
        <Header
          style={{
            background: "white",
            padding: 16,
            paddingLeft: 30,
            paddingRight: 30,
            height: 73,
          }}
        >
          <Row gutter={[24, 0]}>
            <Col span={9}>
              <div style={{ marginTop: 10 }}>
                <Breadcrumb
                  items={[
                    {
                      href: "/photos",
                      title: <HomeFilled/>,
                    },
                    {
                      title: "Photos",
                    },
                  ]}
                />

              </div>
            </Col>
            <Col span={6}>
              <Search
                placeholder="Type here"
                allowClear
                enterButton
                size="large"
                addonBefore={
                  <Select defaultValue="all">
                    <Select.Option value="all">All</Select.Option>
                    <Select.Option value="photos">Photos</Select.Option>
                    <Select.Option value="faces">Faces</Select.Option>
                    <Select.Option value="albums">Albums</Select.Option>
                  </Select>
                }
                suffix={<Text keyboard>Ctrl /</Text>}
              />
            </Col>
            <Col span={9}>
              <div className="header-buttons">
                <Avatar icon={<UserOutlined />} size="large" />
                <Button type="default" icon={<SettingFilled />} size="large" />
                <Badge count={5}>
                  <Button type="default" icon={<BellFilled />} size="large" />
                </Badge>
              </div>
            </Col>
          </Row>
        </Header>
        <Content style={{ margin: "20px 20px" }}>
          <Outlet />
          <FloatButton.BackTop style={{ left: 24 }} />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          yentio | using <a href="https://ant.design">ant.design</a>
        </Footer>
      </ADLayout>
    </ADLayout>
  );
}

export default Layout