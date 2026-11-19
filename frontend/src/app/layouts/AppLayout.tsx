import { Layout, Menu, Typography, theme } from 'antd'
import type { MenuProps } from 'antd'
import { HomeOutlined, LoginOutlined, UserAddOutlined, CommentOutlined, HistoryOutlined } from '@ant-design/icons'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '@/shared/config/routes'

const { Header, Content, Footer } = Layout
const { Title } = Typography

type MenuItem = Required<MenuProps>['items'][number] & { key: string }

const menuItems: MenuItem[] = [
  { key: ROUTES.home, icon: <HomeOutlined />, label: <Link to={ROUTES.home}>Главная</Link> },
  { key: ROUTES.classify, icon: <CommentOutlined />, label: <Link to={ROUTES.classify}>Классификатор</Link> },
  { key: ROUTES.history, icon: <HistoryOutlined />, label: <Link to={ROUTES.history}>История</Link> },
  { key: ROUTES.login, icon: <LoginOutlined />, label: <Link to={ROUTES.login}>Вход</Link> },
  { key: ROUTES.register, icon: <UserAddOutlined />, label: <Link to={ROUTES.register}>Регистрация</Link> },
]

export function AppLayout() {
  const location = useLocation()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const selectedKey = menuItems.find((item) => item.key === location.pathname)?.key ?? ROUTES.home

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
          {/* key меняется при переходе на другую страницу — анимация появления запускается заново */}
          <div key={location.pathname} className="page-transition">
            <Outlet />
          </div>
        </div>
      </Content>

      <Footer style={{ textAlign: 'center', color: '#666' }}>
        Классификатор комментариев © {new Date().getFullYear()}
      </Footer>
    </Layout>
  )
}
