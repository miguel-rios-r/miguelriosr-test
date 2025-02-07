import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import Home from "../pages/Home"
import Login from "../pages/Auth/Login"
import PrivateRoute from "./PrivateRoute"
import NotFound from "../pages/NotFound"
import AllTours from "../pages/Tour/AllTours"
import CreateTour from "../pages/Tour/CreateTour"
import { ToursProvider } from "../contexts/ToursContext"
import { CustomerProvider } from "../contexts/CustomerContext"
import AllCustomers from "../pages/Customer/AllCustomers"
import CreateCustomer from "../pages/Customer/CreateCustomer"
import SignUp from "../pages/Auth/SignUp"

const AppRouter = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login/>} />
        <Route path="signup" element={<SignUp/>} />
        <Route element={<PrivateRoute/>}>
          <Route path="/" element={<Home/>} />
          <Route
          path="/tour/*"
          element={
            <ToursProvider>
              <Routes>
                <Route index element={<Navigate to="all" replace />} />
                <Route path="all" element={<AllTours />} />
                <Route path="create" element={<CreateTour />} />
              </Routes>
            </ToursProvider>
          }
        />
        <Route
          path="/customer/*"
          element={
            <CustomerProvider>
              <Routes>
                <Route index element={<Navigate to="all" replace />} />
                <Route path="all" element={<AllCustomers />} />
                <Route path="create" element={<CreateCustomer />} />
              </Routes>
            </CustomerProvider>
          }
        />
        </Route>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter