import { createContext, useState, useEffect, ReactNode } from "react"
import useApiRequests from "../hooks/useApiRequests"

interface ITour {
  id: number
  date: number,
  agent: string,
  userCreator: string,
  quote: number,
  travelCode: string,
  reference: string,
  duration: number,
  status: number
}

interface IToursContext {
  tours: ITour[]
  // addTour: (newTour: ITour) => void
  // updateTour: (updatedTour: ITour) => void
  // removeTour: (id: string) => void
}

export const ToursContext = createContext<IToursContext | undefined>(undefined)

export const ToursProvider = ({ children }: { children: ReactNode }) => {
  const { get } = useApiRequests()
  // const [tours, setTours] = useState<ITour([])
  const [tours, setTours] = useState<ITour[]>([])

  const getAllTour = async () => {
    const response = await get("http://localhost:3001/tours")
    console.log(response)
    setTours(response.data)
  }

  // const addTour = (newTour: ITour) => {
  //   // setTours([...tours, newTour])
  // }

  // const updateTour = (updatedTour: ITour) => {
  //   // setTours(tours.map((tour) => (tour.id === updatedTour.id ? updatedTour : tour)))
  // }

  // const removeTour = (id: string) => {
  //   // setTours(tours.filter((tour) => tour.id !== id))
  // }

  useEffect(() => {
    if (tours.length === 0) getAllTour()
  }, [])

  const contextValue = {
    tours,
    // addTour,
    // updateTour,
    // removeTour,
  }

  return <ToursContext.Provider value={contextValue}>{children}</ToursContext.Provider>
}