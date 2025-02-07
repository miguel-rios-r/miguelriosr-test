import { useNavigate } from "react-router"
import MainLayout from "../../components/layout/MainLayout"

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <MainLayout title="">
      <h1>404</h1>
      <p>Page not found</p>
      <button onClick={() => navigate("/")}>Go to home</button>
    </MainLayout>
  )
}