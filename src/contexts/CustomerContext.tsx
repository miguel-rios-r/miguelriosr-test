import { createContext, useState, useEffect, ReactNode } from "react"
import useApiRequests from "../hooks/useApiRequests"
import { ICustomer } from "../interfaces/ICustomers"

interface ICustomerContext {
  customers: ICustomer[]
  addCustomer: (data: ICustomer) => void
  removeCustomer: (id: number) => void
}

export const CustomerContext = createContext<ICustomerContext | undefined>(undefined)

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
  const { get, post, del } = useApiRequests()
  const [customers, setCustomers] = useState<ICustomer[]>([])

  const getAllCustomers = async () => {
    const response = await get("http://localhost:3001/customers")
    console.log(response)
    setCustomers(response.data)
  }

  const addCustomer = async (data: ICustomer) => {
    const response = await post("http://localhost:3001/customers", data)
    getAllCustomers()
  }

  const removeCustomer = async (id: number) => {
    console.log(`trying to delete ${id}`)
    const response = await del(`http://localhost:3001/customers/${id}`) 
    getAllCustomers()
  }

  useEffect(() => {
    if (customers.length === 0) getAllCustomers()
  }, [])

  const contextValue = {
    customers,
    addCustomer,
    removeCustomer
  }

  return <CustomerContext.Provider value={contextValue}>{children}</CustomerContext.Provider>
}