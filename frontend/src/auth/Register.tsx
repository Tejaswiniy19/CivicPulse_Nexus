import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, type Role } from './AuthContext'

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState<Role>('CITIZEN')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    setError('')
    setSuccess(false)

    if (!name.trim()) {
      setError('Please enter your full name.')
      return
    }

    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }

    if (password.length < 6) {
      setError(
        'Password must contain at least 6 characters.'
      )
      return
    }

    if (password !== confirmPassword) {
      setError(
        'Passwords do not match.'
      )
      return
    }

    setLoading(true)

    try {
      const result = await register(
        name,
        email,
        password,
        role
      )

      if (!result.success) {
        setError(
          result.message ||
            'Unable to create the account.'
        )

        return
      }

      setSuccess(true)

      /*
       * IMPORTANT:
       *
       * Registration NEVER logs the user in.
       *
       * The user is explicitly redirected to Login
       * and must provide credentials again.
       */
      setTimeout(() => {
        navigate('/login', {
          replace: true,
          state: {
            registeredEmail: email.trim(),
          },
        })
      }, 1200)
    } catch {
      setError(
        'Unable to create the account. Please try again.'
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
              CIVIC ACCOUNT
            </span>

            <h1>
              Create your account
            </h1>

            <p>
              Register to access the CivicPulse Nexus governance platform.
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            <label>
              Full name

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                autoComplete="name"
                required
              />
            </label>

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
                placeholder="Create a password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="new-password"
                required
              />
            </label>

            <label>
              Confirm password

              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                autoComplete="new-password"
                required
              />
            </label>

            <label>
              Account type

              <select
                value={role}
                onChange={(event) =>
                  setRole(
                    event.target.value as Role
                  )
                }
              >
                <option value="CITIZEN">
                  Citizen
                </option>

                <option value="OFFICER">
                  Officer
                </option>

                <option value="ADMIN">
                  Admin — Development Only
                </option>
              </select>
            </label>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            {success && (
              <div className="registration-success">
                Account created successfully.
                Redirecting you to the login page...
              </div>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={loading || success}
            >
              {loading
                ? 'Creating account...'
                : success
                ? 'Account created'
                : 'Create account'}
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
            Already have an account?{' '}

            <Link to="/login">
              Sign in
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