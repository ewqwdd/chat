import { createContext } from "react"

export interface User {
    token: string
    name: string
}

interface UserContext {
    user?: User
    setUser?: (name: string, token?: string) => void
    logout?: () => void
    error?: string
    isLoading?: boolean
}

export const userContext = createContext<UserContext>({})