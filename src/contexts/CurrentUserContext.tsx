import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { auth } from "../services/Firebase"
import { User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"

interface ICurrentUserContext {
  currentUser: User | null
  login: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

interface ICurrentUserProviderProps {
  children: ReactNode
}

const CurrentUserContext = createContext<ICurrentUserContext | undefined >(undefined)

export const useAuth = (): ICurrentUserContext => {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un CurrentUserProvider");
  }
  return context;
}

export const CurrentUserProvider: React.FC<ICurrentUserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    await signOut(auth);
  }

  const contextValue = {
    currentUser,
    login,
    logout,
    signUp
  }

  return (
    <CurrentUserContext.Provider value={contextValue}>
      {!loading && children}
    </CurrentUserContext.Provider>
  )
}