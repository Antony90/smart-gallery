import './Layout.css';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout as ADLayout, Breadcrumb, Menu, Typography, Space, FloatButton } from 'antd';
import { CodepenOutlined, DingtalkOutlined, FolderOpenOutlined, HomeOutlined, PictureOutlined, TeamOutlined } from '@ant-design/icons';
import { blue } from '@ant-design/colors';
import { useState } from 'react';
const { Header, Content, Footer } = ADLayout;
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
  return (
    <ADLayout>
      <Header className='header'> 
        {/* Logo */}
        <div className="logo" color={blue[9]}> 
          <CodepenOutlined className="logo-icon" />
          <Title 
            level={5} 
            className="logo-title"
          >Smart Gallery</Title>
        </div>

        <Menu
          items={menuItems}
          mode="horizontal"
          theme="dark"
          selectedKeys={[selected]}
          onClick={(e) => {
            setSelected(e.key);
            navigate(e.key)
          }}
        />
      </Header>
      <Content style={{ margin: '75px 50px' }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <div>
          <Outlet />
          <FloatButton.BackTop style={{ left: 24 }} />
        </div>
      </Content>
      <Footer>
        <Text>By Antony90</Text>
      </Footer>
    </ADLayout>
  )
}

export default Layout