import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth, type Role } from './AuthContext'

export default function Login() {
  const { login, isAuthenticated, user } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState(() => {
  const state = location.state as
    | { registeredEmail?: string }
    | null

  return state?.registeredEmail || ''
})
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<Role>('ADMIN')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  /*
   * If already authenticated during the CURRENT session,
   * redirect to the correct dashboard.
   *
   * This does NOT persist across browser refresh/reopen
   * because AuthContext intentionally does not restore
   * the user from localStorage.
   */
  if (isAuthenticated && user) {
    return (
      <Navigate
        to={getDashboardPath(user.role)}
        replace
      />
    )
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    setError('')
    setLoading(true)

    try {
      const result = await login(
        email,
        password,
        role
      )

      if (!result.success) {
        setError(
          result.message ||
            'Unable to sign in. Please check your credentials.'
        )

        return
      }

      /*
       * Role-based dashboard routing.
       */
      navigate(
        getDashboardPath(role),
        {
          replace: true,
        }
      )
    } catch {
      setError(
        'Something went wrong while signing in. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-shell">

        <div className="login-brand">
          <div className="login-brand-mark">
            ◈
          </div>

          <div>
            <strong>
              CivicPulse
            </strong>

            <span>
              NEXUS
            </span>
          </div>
        </div>

        <div className="login-card">

          <div className="login-heading">

            <span className="login-eyebrow">
              GOVERNANCE PLATFORM
            </span>

            <h1>
              Welcome back
            </h1>

            <p>
              Sign in to access your CivicPulse Nexus workspace.
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            <label>
              Email address

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                autoComplete="email"
                required
              />
            </label>

            <label>
              Password

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="current-password"
                required
              />
            </label>

            <label>
              Access role

              <select
                value={role}
                onChange={(event) =>
                  setRole(
                    event.target.value as Role
                  )
                }
              >
                <option value="ADMIN">
                  Admin — Executive Access
                </option>

                <option value="OFFICER">
                  Officer — Department Access
                </option>

                <option value="CITIZEN">
                  Citizen — Public Services
                </option>
              </select>
            </label>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading
                ? 'Authenticating...'
                : 'Sign in'}
            </button>

          </form>

          <div className="login-note">
            <span>
              Secure civic access
            </span>

            <span>
              •
            </span>

            <span>
              Role-based workspace
            </span>
          </div>

          <div className="auth-secondary-link">
            Don't have an account?{' '}

            <Link to="/register">
              Create an account
            </Link>
          </div>

        </div>

        <p className="login-footer">
          CivicPulse Nexus · Governance & Analytics Platform
        </p>

      </div>
    </div>
  )
}

function getDashboardPath(role: Role) {
  switch (role) {
    case 'ADMIN':
      return '/admin/dashboard'

    case 'OFFICER':
      return '/officer/dashboard'

    case 'CITIZEN':
      return '/citizen/dashboard'

    default:
      return '/login'
  }
}