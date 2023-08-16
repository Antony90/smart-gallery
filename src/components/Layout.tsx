import './Layout.css';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout as ADLayout, Breadcrumb, Menu, Typography, Space, FloatButton, theme } from 'antd';
import { CodepenOutlined, DingtalkOutlined, FolderOpenOutlined, HomeOutlined, PictureOutlined, TeamOutlined } from '@ant-design/icons';
import { blue } from '@ant-design/colors';
import { useState } from 'react';


const { Header, Content, Footer, Sider } = ADLayout;
const { Title, Text } = Typography;

const menuItems = [
  {
    label: 'Home',
    key: '/',
    icon: <HomeOutlined />
  },
  {
    label: 'Photos',
    key: '/photos',
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
]

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
    <ADLayout style={{ minHeight: '100vh' }}>
      <Sider width={214} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" >
          <CodepenOutlined className="logo-icon" style={{ fontSize: (collapsed ?  35: 28), marginLeft: collapsed ? 8: 0 }} />
          {!collapsed && <Title 
            level={3} 
            className="logo-title"
          >Smart Gallery</Title>}
        </div>

        <Menu
          items={menuItems}
          mode="inline"
          theme="dark"
          selectedKeys={[selected]}
          onClick={(e) => {
            setSelected(e.key);
            navigate(e.key)
          }}
        />
      </Sider>
      <ADLayout>
        <Content style={{ margin: '20px 20px' }}>
          <Outlet />
          <FloatButton.BackTop style={{ left: 24 }} />
        </Content>
        <Footer style={{ textAlign: 'center' }}>yentio | using <a href="https://ant.design">ant.design</a></Footer>
      </ADLayout>
    </ADLayout>
  )
}

export default Layout