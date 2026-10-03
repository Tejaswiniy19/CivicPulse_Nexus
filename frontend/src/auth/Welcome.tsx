import { Link } from 'react-router-dom'
import './Auth.css'

export default function Welcome() {
  return (
    <div className="auth-page">

      <div className="auth-background-glow auth-glow-one" />
      <div className="auth-background-glow auth-glow-two" />

      <header className="auth-topbar">
        <Link to="/" className="auth-logo">
          <div className="auth-logo-mark">◈</div>

          <div className="auth-logo-text">
            <strong>CivicPulse</strong>
            <span>NEXUS</span>
          </div>
        </Link>

        <div className="auth-topbar-right">
          <span>Already have an account?</span>

          <Link
            to="/login"
            className="auth-topbar-button"
          >
            Sign in
          </Link>
        </div>
      </header>

      <main className="welcome-main">

        <section className="welcome-content">

          <div className="welcome-eyebrow">
            <span className="welcome-eyebrow-dot" />
            DIGITAL GOVERNANCE PLATFORM
          </div>

          <h1>
            One platform.
            <br />

            <span>Every civic interaction.</span>
          </h1>

          <p className="welcome-description">
            CivicPulse Nexus brings citizens, government officers,
            and administrators into one intelligent governance
            ecosystem.
          </p>

          <div className="welcome-actions">

            <Link
              to="/login"
              className="welcome-primary-button"
            >
              <span>Access workspace</span>
              <span className="welcome-arrow">→</span>
            </Link>

            <Link
              to="/register"
              className="welcome-secondary-button"
            >
              Create an account
            </Link>

          </div>

          <div className="welcome-trust">

            <div className="trust-item">
              <strong>03</strong>
              <span>Access roles</span>
            </div>

            <div className="trust-divider" />

            <div className="trust-item">
              <strong>01</strong>
              <span>Unified platform</span>
            </div>

            <div className="trust-divider" />

            <div className="trust-item">
              <strong>24/7</strong>
              <span>Digital access</span>
            </div>

          </div>

        </section>

        <section className="welcome-visual">

          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="visual-orbit orbit-three" />

          <div className="visual-core">

            <div className="visual-core-symbol">
              ◈
            </div>

            <span>CIVICPULSE</span>
            <strong>NEXUS</strong>

          </div>

          <div className="floating-card floating-admin">
            <div className="floating-icon">A</div>

            <div>
              <strong>Administrator</strong>
              <span>Executive control</span>
            </div>

            <div className="floating-status" />
          </div>

          <div className="floating-card floating-officer">
            <div className="floating-icon">O</div>

            <div>
              <strong>Officer</strong>
              <span>Department operations</span>
            </div>

            <div className="floating-status" />
          </div>

          <div className="floating-card floating-citizen">
            <div className="floating-icon">C</div>

            <div>
              <strong>Citizen</strong>
              <span>Public services</span>
            </div>

            <div className="floating-status" />
          </div>

        </section>

      </main>

      <footer className="auth-footer">
        <span>CivicPulse Nexus</span>
        <span>Governance & Analytics Platform</span>
        <span>Secure digital access</span>
      </footer>

    </div>
  )
}