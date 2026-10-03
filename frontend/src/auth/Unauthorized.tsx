import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import './Auth.css'

export default function Unauthorized() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="login-page">
      <div className="login-shell">
        <div className="login-brand">
          <div className="login-brand-mark">
            ◈
          </div>

          <div>
            <strong>CivicPulse</strong>
            <span>NEXUS</span>
          </div>
        </div>

        <div className="login-card">
          <div className="login-heading">
            <span className="login-eyebrow">
              ACCESS CONTROL
            </span>

            <h1>Access restricted</h1>

            <p>
              Your current account does not have
              permission to access this workspace.
            </p>
          </div>

          <div className="login-error">
            Current role:{' '}
            <strong>
              {user?.role || 'Unknown'}
            </strong>
          </div>

          <button
            type="button"
            className="login-button"
            onClick={() => navigate('/')}
          >
            Return to workspace
          </button>

          <div className="auth-secondary-link">
            Need a different account?{' '}
            <a
              href="/login"
              onClick={(event) => {
                event.preventDefault()
                navigate('/login')
              }}
            >
              Sign in
            </a>
          </div>
        </div>

        <p className="login-footer">
          CivicPulse Nexus · Governance & Analytics Platform
        </p>
      </div>
    </div>
  )
}