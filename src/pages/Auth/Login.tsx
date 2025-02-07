import { useEffect, useState } from "react"
import { useAuth } from "../../contexts/CurrentUserContext"
import { useNavigate } from "react-router"
import MainLayout from "../../components/layout/MainLayout"
import { Button, Flex, Input, Space, Typography } from "antd"

export default function Login() {
  const navigate = useNavigate()
  const { login, currentUser } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState<string | null>(null)

  const [isValidEmail, setIsValidEmail] = useState(true)

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar email
    return emailRegex.test(value)
  }

  const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    if( e.target.name === "email" ) setIsValidEmail(validateEmail(e.target.value))
    setError(null)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const tryLogin = async () => {
    try {
      await login(formData.email, formData.password)
      navigate("/")
    } catch (err) {
      setError("Error al iniciar sesión. Verifica tus credenciales.")
    }
  }

  useEffect(() => {
    if (currentUser) navigate("/")
  }, [currentUser])

  return (
    <MainLayout title="" disabledMenu={true}>
      <Flex justify="center" style={{paddingBottom: 80}}>
        <Space direction="vertical">
          <Typography.Title style={{color: "#FFF"}}><b>ART<br/>EXPERIENCES<br/></b><span style={{fontWeight: "lighter"}}>TRAVEL</span></Typography.Title>
          <Typography.Title level={5} style={{color: "#FFF"}}>Welcome</Typography.Title>
          <Input type="email" name="email" placeholder="Email" onChange={updateFormData} />
          { formData.email !== "" && !isValidEmail && <Typography.Text style={{color:"red"}}>Type a valid email (user@email.com)</Typography.Text> }
          <Input type="password" name="password" placeholder="Password" onChange={updateFormData} />
          <Button shape="round" onClick={tryLogin} style={{width: "100%", backgroundColor: "rgba(255, 255, 255, 0.2)", border: "none", color: "#FFF"}}>Sign in</Button>
          {error && <Typography.Text style={{color:"red"}}>{error}</Typography.Text>}
          <Button style={{color: "#F2F2F2"}} type="text" onClick={() => navigate("/signup")}>Dont Have an account, create one</Button>
        </Space>
      </Flex>
    </MainLayout>
  )
}