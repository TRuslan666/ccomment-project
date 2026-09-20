import { Layout, Menu, Typography, theme } from 'antd'
import { HomeOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons'
import { Link, Outlet, useLocation } from 'react-router-dom'

const { Header, Content, Footer } = Layout
const { Title } = Typography

const menuItems = [
  { key: '/', icon: <HomeOutlined />, label: <Link to="/">Главная</Link> },
  { key: '/login', icon: <LoginOutlined />, label: <Link to="/login">Вход</Link> },
  { key: '/register', icon: <UserAddOutlined />, label: <Link to="/register">Регистрация</Link> },
]

export default function AppLayout() {
  const location = useLocation()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const selectedKey = menuItems.find((item) => item.key === location.pathname)?.key ?? '/'

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          padding: '0 24px',
          background: '#001529',
        }}
      >
        <Title level={4} style={{ color: 'rgb(54, 117, 252)', margin: 0, whiteSpace: 'nowrap' }}>
          CComment
        </Title>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={menuItems}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>

      <Content style={{ padding: '24px 16px' }}>
        <div
          className="page-container"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            padding: 24,
            minHeight: 'calc(100vh - 160px)',
          }}
        >
          <Outlet />
        </div>
      </Content>

      <Footer style={{ textAlign: 'center', color: '#666' }}>
        Классификатор комментариев © {new Date().getFullYear()} — Лабораторная работа №1
      </Footer>
    </Layout>
  )
}
