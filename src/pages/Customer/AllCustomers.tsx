import { useContext, useEffect } from "react"
import { CustomerContext } from "../../contexts/CustomerContext";
import MainLayout from "../../components/layout/MainLayout";
import { Table } from "antd";
import DataTable from "../../components/data/DataTable";

export default function AllCustomers() {
  
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("CustomerContext must be used within a CustomersProvider");
  }
  const { customers, removeCustomer } = context;

  useEffect(() => {
    console.log(customers)
  }, [])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Surname',
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
    },
    {
      title: 'Main Tour Reference',
      dataIndex: 'mainTourReference',
      key: 'mainTourReference',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
      key: 'reference',
    },
    {
      title: 'Travel Code',
      dataIndex: 'travelCode',
      key: 'travelCode',
    },
    {
      title: 'Passengers',
      dataIndex: 'passengers',
      key: 'passengers',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <button onClick={() => removeCustomer(record.id)}>Delete</button>
      ),
    },
  ]

  return (
    <MainLayout title="All Customers">
      {DataTable(customers, columns)}
    </MainLayout>
  )
}