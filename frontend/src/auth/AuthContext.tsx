import { createContext, useContext, useEffect, useState } from 'react'

export type Role = 'ADMIN' | 'OFFICER' | 'CITIZEN'

export type User = {
  id: string
  name: string
  email: string
  role: Role
  department?: string
}

type StoredAccount = {
  id: string
  name: string
  email: string
  password: string
  role: Role
  department?: string
}

type AuthContextType = {
  user: User | null
  login: (
    email: string,
    password: string,
    role: Role
  ) => Promise<{ success: boolean; message?: string }>
  register: (
    name: string,
    email: string,
    password: string,
    role: Role
  ) => Promise<{ success: boolean; message?: string }>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const ACCOUNTS_KEY = 'civicpulse_accounts'

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

function getStoredAccounts(): StoredAccount[] {
  try {
    const stored = localStorage.getItem(ACCOUNTS_KEY)

    if (!stored) {
      return []
    }

    const accounts = JSON.parse(stored)

    return Array.isArray(accounts) ? accounts : []
  } catch {
    return []
  }
}

function saveAccounts(accounts: StoredAccount[]) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
}

function toUser(account: StoredAccount): User {
  return {
    id: account.id,
    name: account.name,
    email: account.email,
    role: account.role,
    department: account.department,
  }
}

export function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  /*
   * IMPORTANT:
   *
   * We intentionally DO NOT restore the authenticated user
   * from localStorage.
   *
   * Every time the application starts, the user must log in again.
   */
  const [user, setUser] = useState<User | null>(null)

  /*
   * Remove any legacy authentication session created by
   * the previous version of CivicPulse.
   *
   * This runs once when the application starts.
   */
  useEffect(() => {
    localStorage.removeItem('civicpulse_auth')
  }, [])

  const login = async (
    email: string,
    password: string,
    role: Role
  ): Promise<{ success: boolean; message?: string }> => {
    const normalizedEmail = normalizeEmail(email)

    if (!normalizedEmail || !password) {
      return {
        success: false,
        message: 'Please enter your email and password.',
      }
    }

    const accounts = getStoredAccounts()

    const account = accounts.find(
      (item) => item.email === normalizedEmail
    )

    if (!account) {
      return {
        success: false,
        message:
          'No account was found with this email address. Please register first.',
      }
    }

    if (account.password !== password) {
      return {
        success: false,
        message: 'Incorrect password. Please try again.',
      }
    }

    if (account.role !== role) {
      return {
        success: false,
        message: `This account is registered as ${getRoleLabel(
          account.role
        )}. Please select the correct access role.`,
      }
    }

    const authenticatedUser = toUser(account)

    /*
     * Authentication state exists ONLY in React memory.
     *
     * It will disappear when:
     * - the browser is refreshed
     * - the tab is closed
     * - the website is reopened
     *
     * Therefore the login page will appear again.
     */
    setUser(authenticatedUser)

    return {
      success: true,
    }
  }

  const register = async (
    name: string,
    email: string,
    password: string,
    role: Role
  ): Promise<{ success: boolean; message?: string }> => {
    const cleanName = name.trim()
    const normalizedEmail = normalizeEmail(email)

    if (!cleanName) {
      return {
        success: false,
        message: 'Please enter your full name.',
      }
    }

    if (!normalizedEmail) {
      return {
        success: false,
        message: 'Please enter your email address.',
      }
    }

    if (password.length < 6) {
      return {
        success: false,
        message: 'Password must contain at least 6 characters.',
      }
    }

    const accounts = getStoredAccounts()

    const existingAccount = accounts.find(
      (item) => item.email === normalizedEmail
    )

    if (existingAccount) {
      return {
        success: false,
        message:
          'An account with this email address already exists. Please sign in.',
      }
    }

    const newAccount: StoredAccount = {
      id: `${role.toLowerCase()}-${Date.now()}`,
      name: cleanName,
      email: normalizedEmail,
      password,
      role,
      department:
        role === 'OFFICER'
          ? 'Revenue Department'
          : undefined,
    }

    accounts.push(newAccount)

    saveAccounts(accounts)

    /*
     * IMPORTANT:
     *
     * Registration does NOT automatically log the user in.
     *
     * The user must go to the Login page and authenticate
     * with the newly created credentials.
     */
    return {
      success: true,
    }
  }

  const logout = () => {
    /*
     * Remove the authenticated user from memory.
     *
     * The account itself remains registered.
     *
     * Therefore:
     *
     * Logout
     *    ↓
     * Login page
     *    ↓
     * Credentials required
     */
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function getRoleLabel(role: Role) {
  switch (role) {
    case 'ADMIN':
      return 'Administrator'

    case 'OFFICER':
      return 'Officer'

    case 'CITIZEN':
      return 'Citizen'

    default:
      return 'User'
  }
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider'
    )
  }

  return context
}