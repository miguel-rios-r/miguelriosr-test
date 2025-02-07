import { useNavigate } from "react-router"
import MainLayout from "../../components/layout/MainLayout"
import { Divider, Flex, Space, Typography } from "antd"

export default function Home() {
  const navigate = useNavigate()
  
  return (
    <MainLayout title="Home">
      <Flex justify="center">
        <Space style={{marginBottom: 60}}>
          <Space onClick={() => navigate("/customer/create")} style={{padding: 100, border: "2px solid #FFF", borderRadius: "20px 0px 0px 20px"}}>
            <Typography.Title style={{color: "#FFF", cursor: "pointer"}}>
              NEW TOUR
            </Typography.Title>
          </Space>
          <Space onClick={() => navigate("/tour/all")} style={{padding: 100, border: "2px solid #FFF", borderRadius: "0 20px 20px 0", marginLeft: -10}}>
            <Typography.Title style={{color: "#FFF", cursor: "pointer"}}>
              SEARCH TOUR
            </Typography.Title>
          </Space>
        </Space>
        {/* <button onClick={() => navigate("/tour/all")}>All Tours</button>
        <button onClick={() => navigate("/tour/create")}>Create tours</button>
        <button onClick={() => navigate("/customer/all")}>All Customers</button>
        <button onClick={() => navigate("/customer/create")}>Create customer</button> */}
        <p/>
      </Flex>
    </MainLayout>
  )
}