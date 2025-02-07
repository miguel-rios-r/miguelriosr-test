import { useContext, useEffect } from "react"
import { ToursContext } from "../../contexts/ToursContext"
import MainLayout from "../../components/layout/MainLayout";
import { Table } from "antd";
import DataTable from "../../components/data/DataTable";

export default function AllTours() {
  
  const context = useContext(ToursContext);
  
  if (!context) {
    throw new Error("ToursContext must be used within a ToursProvider");
  }

  const { tours } = context;

  useEffect(() => {
    console.log(tours)
  }, [])

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      // render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Agent",
      dataIndex: "agent",
      key: "agent",
    },
    {
      title: "User Creator",
      dataIndex: "userCreator",
      key: "userCreator",
    },
    {
      title: "Quote",
      dataIndex: "quote",
      key: "quote",
    },
    {
      title: "Travel Code",
      dataIndex: "travelCode",
      key: "travelCode",
    },
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      // render: (duration) => `${duration} days`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];
  
  return (
    <MainLayout title="Tours">
      {DataTable(tours, columns)}
    </MainLayout>
  )
}