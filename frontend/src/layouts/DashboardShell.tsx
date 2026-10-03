import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import './DashboardShell.css'

type DashboardShellProps = {
  children: ReactNode
  title: string
  subtitle?: string
  navigation?: ReactNode
}

export default function DashboardShell({
  children,
  title,
  subtitle,
  navigation,
}: DashboardShellProps) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login', {
      replace: true,
    })
  }

  return (
    <div className="dashboard-shell">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside className="dashboard-sidebar">
        {/* BRAND */}

        <div className="dashboard-brand">
          <div className="dashboard-brand-mark">
            ◈
          </div>

          <div className="dashboard-brand-text">
            <strong>CivicPulse</strong>
            <span>NEXUS</span>
          </div>
        </div>

        {/* CURRENT ROLE */}

        <div className="dashboard-role-card">
          <div className="dashboard-role-icon">
            {getRoleInitial(user?.role)}
          </div>

          <div className="dashboard-role-info">
            <span className="dashboard-role-label">
              CURRENT WORKSPACE
            </span>

            <strong>
              {getRoleLabel(user?.role)}
            </strong>

            {user?.department ? (
              <small>{user.department}</small>
            ) : null}
          </div>
        </div>

        {/* NAVIGATION */}

        <nav className="dashboard-navigation">
          {navigation}
        </nav>

        {/* SIDEBAR FOOTER */}

        <div className="dashboard-sidebar-footer">
          <div className="dashboard-security">
            <span className="security-dot" />

            <span>
              Secure workspace
            </span>
          </div>

          {/* LOGOUT */}

          <button
            type="button"
            className="dashboard-logout"
            onClick={handleLogout}
          >
            <span className="dashboard-logout-icon">
              ↪
            </span>

            <span>
              Sign out
            </span>
          </button>
        </div>
      </aside>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="dashboard-main">
        {/* HEADER */}

        <header className="dashboard-header">
          <div className="dashboard-header-title">
            <span className="dashboard-header-eyebrow">
              CIVICPULSE NEXUS
            </span>

            <h1>{title}</h1>

            {subtitle ? (
              <p>{subtitle}</p>
            ) : null}
          </div>

          {/* HEADER ACTIONS */}

          <div className="dashboard-header-actions">
            <button
              type="button"
              className="dashboard-icon-button"
              title="Notifications"
              aria-label="Notifications"
            >
              <span>♢</span>

              <i className="notification-dot" />
            </button>

            {/* USER */}

            <div className="dashboard-user">
              <div className="dashboard-user-avatar">
                {getInitials(user?.name)}
              </div>

              <div className="dashboard-user-info">
                <strong>
                  {user?.name || 'User'}
                </strong>

                <span>
                  {user?.email ||
                    'user@example.com'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}

        <section className="dashboard-content">
          {children}
        </section>
      </main>
    </div>
  )
}

/* =========================================================
   ROLE HELPERS
========================================================= */

function getRoleLabel(
  role: string | undefined,
): string {
  if (role === 'ADMIN') {
    return 'Administrator'
  }

  if (role === 'OFFICER') {
    return 'Department Officer'
  }

  if (role === 'CITIZEN') {
    return 'Citizen'
  }

  return 'Workspace'
}

function getRoleInitial(
  role: string | undefined,
): string {
  if (role === 'ADMIN') {
    return 'A'
  }

  if (role === 'OFFICER') {
    return 'O'
  }

  if (role === 'CITIZEN') {
    return 'C'
  }

  return 'C'
}

/* =========================================================
   USER INITIALS
========================================================= */

function getInitials(
  name: string | undefined,
): string {
  if (!name) {
    return 'U'
  }

  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (parts.length === 0) {
    return 'U'
  }

  if (parts.length === 1) {
    return parts[0]
      .slice(0, 2)
      .toUpperCase()
  }

  const first =
    parts[0]?.[0] ?? ''

  const last =
    parts[parts.length - 1]?.[0] ?? ''

  return `${first}${last}`.toUpperCase()
}