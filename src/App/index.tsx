import { CurrentUserProvider } from "../contexts/CurrentUserContext";
import AppRouter from "./AppRouter";

export default function App() {
  return (
    <CurrentUserProvider>
      <AppRouter />
    </CurrentUserProvider>    
  )
}