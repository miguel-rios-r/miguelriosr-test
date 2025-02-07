import { Button, Dropdown, Flex, Space, Typography } from "antd"
import { ReactNode } from "react"
import { useAuth } from "../../contexts/CurrentUserContext"
import { useNavigate } from "react-router"
import { DownOutlined, SettingOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

interface MainLayoutProps {
  children: ReactNode,
  title: string
  disabledMenu?: boolean
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title, disabledMenu }) => {

  const navigate = useNavigate()
  const { logout, currentUser } = useAuth()

  const tryLogout = async () => {
    try {
      await logout()
      navigate("/login")
    } catch (err) {
      console.error(err)
    }
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span onClick={() => navigate("/customer")}>All Customers</span>,
    },
    {
      key: '2',
      label: <span onClick={() => navigate("/customer/create")}>Create Customer</span>,
    },
    {
      key: '3',
      label: <span onClick={() => navigate("/tour")}>All Tours</span>,
    },
    // {
    //   key: '4',
    //   label: <span onClick={() => navigate("/tour/create")}>Create Tour</span>,
    // },
    {
      key: '5',
      label: <Button onClick={tryLogout}>Logout</Button>
    }
  ]

  return (
    <Flex  justify="center" style={{backgroundColor: "#000", margin: 40, border: '2px solid #e8e8e8', borderRadius: 20}}>
      <Space direction="vertical" size="large" style={{width: "100%"}}>
        <Flex justify="space-between"  style={{width: "100%"}}>
          <Typography.Title level={2} style={{color: "#FFF", paddingInline: 40}}>{title}</Typography.Title>
          {
            !disabledMenu &&
            <Space style={{marginRight: 40}}>
            <Typography.Text style={{color: "#FFF"}}>{currentUser?.email} | </Typography.Text>
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space style={{color: "#FFF"}}>
                  menu
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            </Space>
          }
        </Flex>
        {children}
      </Space>
    </Flex>
  )
}

export default MainLayout
