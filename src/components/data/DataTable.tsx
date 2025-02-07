import { Table } from "antd"

const DataTable = (data: any[], columns: any[]) => {
  return <Table dataSource={data} columns={columns} style={{paddingInline: 40}}/>
}

export default DataTable