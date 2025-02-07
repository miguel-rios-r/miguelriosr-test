import { JSX, useContext } from "react"
import { CustomerContext } from "../../contexts/CustomerContext"
import { useNavigate } from "react-router";
import MainLayout from "../../components/layout/MainLayout";
import DataForm from "../../components/form/CustomerForm";
import { ICustomerFormItem } from "../../interfaces/ICustomers";
import { Flex, Image } from "antd";

export default function CreateCustomer() {
  const navigate = useNavigate()
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("CustomerContext must be used within a CustomersProvider");
  }
  const { customers } = context

  const calculateId = () => {
    const lastItem = customers.slice(-1)[0];
    return lastItem ? lastItem.id + 1 : 1;
  }

  const dataFormItems: ICustomerFormItem[] = [
    { label: "Customer type", name: "customerType", type: "customerType", options: [{ value: 0, label: <span>Tour Operator</span> }, { value: 1, label: <span>Travel Agent</span> }, { value: 2, label: <span>Direct</span> }], col: 1 },
    { label: "Name", name: "name", type: "conditionedInput", col: 1 },
    { label: "Surname", name: "surname", type: "conditionedInput", col: 1 },
    { label: "Company name", name: "companyName", type: "conditionedInput", col: 1 },
    { label: "Company contact", name: "companyContact", type: "conditionedInput", col: 1 },
    { label: "Document", name: "document", type: "conditionedInput", col: 1 },
    { label: "Age", name: "age", type: "input", col: 1 },
    { label: "Date of birth", name: "dateOfBirth", type: "date", col: 1 },
    { label: "Main tour reference", name: "mainTourReference", type: "input", col: 1 },
    { label: "Phone", name: "phone", type: "input", col: 2 },
    { label: "Language", name: "language", type: "select", options: [{ value: "en", label: <span>Inglés</span> }, { value: "es", label: <span>Español</span> }], col: 2  },
    { label: "Adress", name: "adress", type: "input", col: 2 },
    { label: "Email", name: "email", type: "input", col: 2 },
    { label: "Reference Passenger", name: "reference", type: "input", col: 2 },
    { label: "Travel code", name: "travelCode", type: "input", col: 2 },
    { label: "Passengers", name: "passengers", type: "input", col: 2 },
  ]

  return (
    <MainLayout title="Customer data">
      <DataForm items={dataFormItems} calculateId={calculateId()}/>
    </MainLayout>
  )
}