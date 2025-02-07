import { Button, DatePicker, DatePickerProps, Flex, Form, Input, Select, Space, Typography } from "antd"
import { JSX, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { CustomerContext } from "../../contexts/CustomerContext"
import { ICustomerFormItem, ICustomer } from "../../interfaces/ICustomers"



interface IDataFormProps {
  items: ICustomerFormItem[]
  calculateId: number
}

const DataForm: React.FC<IDataFormProps> = ({ items, calculateId }) => {

  const navigate = useNavigate()
  const context = useContext(CustomerContext)
  if (!context) {
    throw new Error("CustomerContext must be used within a CustomersProvider")
  }
  const { addCustomer } = context

  const [formError, setFormError] = useState<string | null>(null)
  const [colOne, setColOne] = useState([])
  const [colTwo, setColTwo] = useState([])
  const [calculatedAge, setCalculatedAge] = useState(-1)
  const [travelCode, setTravelCode] = useState("")

  const [ customerType, setCustomerType ] = useState<number>(0)

  const [requestBody, setRequestBody] = useState<ICustomer>({
    id: 0,
    customerType: 0,
    name: "",
    surname: "",
    companyName: "",
    companyContact: "",
    document: "",
    age: 0,
    dateOfBirth: 0,
    mainTourReference: "",
    phone: "",
    language: 0,
    adress: "",
    email: "",
    reference: "",
    travelCode: "",
    passengers: 0,
  })

  const calculateAge: DatePickerProps['onChange'] = (dateString: string | any) => {
    const currentTimestamp = Date.now()
    const birthTimestamp = new Date(dateString).getTime()
    const age = Math.floor((currentTimestamp - birthTimestamp) / (1000 * 60 * 60 * 24 * 365.25));
    setCalculatedAge(age)
    setRequestBody({...requestBody, age, dateOfBirth: birthTimestamp})
    setFormError(null)
  }

  const createFormItem = (item: any) => {
    switch (item.type) {
      case "customerType":
        return (
          <Space >
            <Typography.Text >Customer Type: </Typography.Text>
            <Select  defaultValue={0} placeholder={item.label} options={item.options} onSelect={ (value) => {
              setCustomerType(value)
              setFormError(null)
            }}/>
          </Space>
        )
      case "conditionedInput":
        // Travel Agent
        if ( (customerType === 1 || customerType === 2) && item.name === "name") return <Input placeholder={item.label} required onChange={ (e) => {
          setFormError(null)
          setRequestBody({...requestBody, name: e.target.value})
        }} />
        if ( (customerType === 1 || customerType === 2) && item.name === "surname") return <Input placeholder={item.label} required onChange={ (e) => {
          setFormError(null)
          setRequestBody({...requestBody, surname: e.target.value})
        }} />
        
        // Tour Operator
        if ( (customerType === 0 || customerType === 1) && item.name === "companyName") return <Input placeholder={item.label} required onChange={ (e) => {
          setFormError(null)
          setRequestBody({...requestBody, companyName: e.target.value})
        }}/>
        if ( customerType === 0 && item.name === "companyContact") return <Input placeholder={item.label} onChange={ (e) => {
          setFormError(null)
          setRequestBody({...requestBody, companyContact: e.target.value})
        }}/>

        // Direct
        if ( customerType === 2 && item.name === "document") return <Input placeholder={item.label} required onChange={ (e) => {
          setFormError(null)
          setRequestBody({...requestBody, document: e.target.value})
        }}/>
        return null
      case "input":
        if ( item.name === "age" ) return null
        if ( item.name === "travelCode") return null 

        if (item.name === "reference") return (
          <Space>
            <Typography.Text style={{border: "1px solid #555", borderRadius: 20, paddingInline: 30, paddingBlock: 10}}>Travel Code: <b>{ travelCode === "" ? "---" : travelCode }</b></Typography.Text>
            <Input placeholder={item.label} value={requestBody.reference.toUpperCase()} onChange={ (e) => {
              const reference = e.target.value.toUpperCase()
              setFormError(null)
              setTravelCode(`${reference}X${requestBody.passengers}-${Math.ceil(Math.random() * 100)}`)
              setRequestBody({...requestBody, [item.name]: reference})
            }}/>
          </Space>
        )

        if (item.name === "passengers") return (
          <Input type="number" placeholder={item.label} onChange={ (e) => {
            const passengers = e.target.value
            setFormError(null)
            setTravelCode(`${requestBody.reference}X${passengers}-${Math.ceil(Math.random() * 100)}`)
            setRequestBody({...requestBody, [item.name]: passengers})
          }}/>
        )
        
        return (
          <Input placeholder={item.label} onChange={ (e) => {
            setFormError(null)
            setRequestBody({...requestBody, [item.name]: e.target.value})
          }}/>
        )
        return null
      case "date":
        return (
        <Space>
          <Typography.Text style={{border: "1px solid #555", borderRadius: 20, paddingInline: 30, paddingBlock: 10}}>Age: { calculatedAge < 0 ? "---" : calculatedAge } (yo)</Typography.Text>
          <Typography.Text >Data of birth</Typography.Text>
          <DatePicker onChange={calculateAge}/>
        </Space>
      )
      case "select":
        return (
          <Space >
            <Typography.Text >Language: </Typography.Text>
            <Select  defaultValue={item.options[0]} placeholder={item.label} options={item.options} onSelect={ (value) => {
              setFormError(null)
              setRequestBody({...requestBody, [item.name]: value})
            }}/>
          </Space>
        )
      default:
        return null
    } 
  }

  const groupItemsByCol = (items: any) => {
    const colOne = items.filter((item: any) => item.col === 1)
    const colTwo = items.filter((item: any) => item.col === 2)
    setColOne(colOne)
    setColTwo(colTwo)
  }

  const tryCreateCustomer = async (data: ICustomer) => {
    try {
      setFormError(null)
      if (!data.id || data.id === 0) throw new Error("Id is required")
      if ( (customerType === 1 || customerType === 2) && (!data.name || data.name === "") ) throw new Error("Name is required")
      if ( (customerType === 1 || customerType === 2) && (!data.surname || data.surname === "") ) throw new Error("Surname is required")
      if ( (customerType === 0 || customerType === 1) && (!data.companyName || data.companyName === "") ) throw new Error("Company name is required")
      if ( customerType === 0 && (!data.companyContact || data.companyContact === "") ) throw new Error("Company contact is required")
      if ( customerType === 2 && (!data.document || data.document === "") ) throw new Error("Document is required")
      if (!data.age || data.age === 0) throw new Error("Age is required")
      if (!data.dateOfBirth || data.dateOfBirth === 0) throw new Error("Date of birth is required")
      if (!data.phone || data.phone === "") throw new Error("Phone is required")
      if (!data.email || data.email === "") throw new Error("Email is required")
      if (!data.reference || data.reference === "") throw new Error("Reference is required")
      if (!data.travelCode || data.travelCode === "") throw new Error("Travel code is required")
      if (!data.passengers || data.passengers === 0) throw new Error("Passengers is required")
      await addCustomer(data)
      return true
    } catch (err: any) {
      setFormError(err.message)
      console.error(err)
      return false
    }
  }

  useEffect(() => {
    groupItemsByCol(items)
  }, [items])

  return(
    <>
      <Flex justify="center" style={{backgroundColor: "#FFF", paddingInline: 60, paddingTop: 40}}>
        <Space direction="vertical" style={{width: "50%", margin: 10}}>
          {colOne.map((item: any, index: number) => (
            <div key={index}>
              {createFormItem(item)}
            </div>
          ))}
        </Space>
        <Space direction="vertical" style={{width: "50%", margin: 10}}>
          {colTwo.map((item: any, index: number) => (
            <div key={index}>
              {createFormItem(item)}
            </div>
          ))}
        </Space>
    </Flex>
    <Flex justify="center" style={{backgroundColor: "#FFF"}}>
      <Typography.Text style={{color: "red"}}>{formError}</Typography.Text>
    </Flex>
    <Flex justify="end" style={{backgroundColor: "#FFF", padding: 20,  borderRadius: "0 0 18px 18px"}}>
      <Button color="default" variant="solid" size="large" shape="round" onClick={async () => {
        const formSend = await tryCreateCustomer({...requestBody, id: calculateId})
        if (formSend) navigate("/customer/all")
      }}>Create Customer</Button>
    </Flex>
    </>
  )
}

export default DataForm