import { useEffect, useState } from 'react'
import type {
  FormEvent,
  ReactNode,
  CSSProperties,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './auth/AuthContext'
import './App.css'

const API =
  import.meta.env.VITE_API_URL ||
  'http://localhost:8081/api'

type Page =
  | 'dashboard'
  | 'services'
  | 'grievances'
  | 'citizens'
  | 'departments'
  | 'finance'
  | 'reports'
  | 'audit'

type Status =
  | 'Resolved'
  | 'In Progress'
  | 'Pending'
  | 'Escalated'
  | 'Approved'
  | 'Active'

type Dashboard = {
  citizenSatisfaction: number
  slaCompliance: number
  revenueCollected: number
  totalRequests: number
  resolvedRequests: number
  budgetUtilization: number
  totalGrievances: number
  openGrievances: number
  resolvedGrievances: number
  departments: number
  citizens: number
  serviceTrend: {
    label: string
    requests: number
    resolved: number
  }[]
  grievanceTrend: {
    label: string
    count: number
  }[]
  revenueTrend: {
    label: string
    amount: number
  }[]
  departmentPerformance: {
    department: string
    sla: number
    satisfaction: number
    requests: number
    complaints: number
  }[]
  budget: {
    department: string
    allocated: number
    utilized: number
  }[]
}

type ServiceRequest = {
  id: string
  referenceNo: string
  citizenName: string
  department: string
  serviceType: string
  status: Status
  slaDays: number
  processingDays: number
  createdAt: string
}

type Grievance = {
  id: string
  referenceNo: string
  citizenName: string
  department: string
  category: string
  priority: string
  description: string
  status: Status
  slaDays: number
  createdAt: string
}

type Citizen = {
  id: string
  name: string
  status: string
  phone?: string
  email?: string
}

type Department = {
  id: string
  name: string
  code: string
  head: string
  status: string
}

type AuditLog = {
  id: string
  actor: string
  action: string
  moduleName: string
  entityRef: string
  timestamp: string
  outcome: string
}

const demo: Dashboard = {
  citizenSatisfaction: 4.7,
  slaCompliance: 94,
  revenueCollected: 12400000,
  totalRequests: 24700,
  resolvedRequests: 23218,
  budgetUtilization: 87,
  totalGrievances: 4820,
  openGrievances: 610,
  resolvedGrievances: 4210,
  departments: 8,
  citizens: 2400000,

  serviceTrend: [
    {
      label: 'Apr',
      requests: 3200,
      resolved: 2960,
    },
    {
      label: 'May',
      requests: 4100,
      resolved: 3890,
    },
    {
      label: 'Jun',
      requests: 3900,
      resolved: 3660,
    },
    {
      label: 'Jul',
      requests: 4400,
      resolved: 4140,
    },
    {
      label: 'Aug',
      requests: 4700,
      resolved: 4430,
    },
    {
      label: 'Sep',
      requests: 4400,
      resolved: 4138,
    },
  ],

  grievanceTrend: [
    {
      label: 'Apr',
      count: 710,
    },
    {
      label: 'May',
      count: 760,
    },
    {
      label: 'Jun',
      count: 820,
    },
    {
      label: 'Jul',
      count: 790,
    },
    {
      label: 'Aug',
      count: 910,
    },
    {
      label: 'Sep',
      count: 830,
    },
  ],

  revenueTrend: [
    {
      label: 'Apr',
      amount: 1700000,
    },
    {
      label: 'May',
      amount: 1900000,
    },
    {
      label: 'Jun',
      amount: 2100000,
    },
    {
      label: 'Jul',
      amount: 1950000,
    },
    {
      label: 'Aug',
      amount: 2250000,
    },
    {
      label: 'Sep',
      amount: 2500000,
    },
  ],

  departmentPerformance: [
    {
      department: 'Revenue',
      sla: 97,
      satisfaction: 4.8,
      requests: 3820,
      complaints: 54,
    },
    {
      department: 'Licensing',
      sla: 95,
      satisfaction: 4.6,
      requests: 2410,
      complaints: 68,
    },
    {
      department: 'Water',
      sla: 92,
      satisfaction: 4.5,
      requests: 5240,
      complaints: 120,
    },
    {
      department: 'Sanitation',
      sla: 89,
      satisfaction: 4.1,
      requests: 6120,
      complaints: 210,
    },
    {
      department: 'Public Works',
      sla: 93,
      satisfaction: 4.4,
      requests: 4980,
      complaints: 155,
    },
  ],

  budget: [
    {
      department: 'Roads',
      allocated: 15000000,
      utilized: 13200000,
    },
    {
      department: 'Water',
      allocated: 12000000,
      utilized: 10800000,
    },
    {
      department: 'Health',
      allocated: 10000000,
      utilized: 8200000,
    },
    {
      department: 'Sanitation',
      allocated: 8000000,
      utilized: 7300000,
    },
  ],
}

async function api<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText}`,
    )
  }

  return response.status === 204
    ? (undefined as T)
    : response.json()
}

function Icon({
  name,
}: {
  name: string
}) {
  const paths: Record<string, string> = {
    grid:
      'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',

    pulse:
      'M3 12h4l2-7 4 14 2-7h6',

    service:
      'M5 4h14v16H5zM8 8h8M8 12h8M8 16h5',

    flag:
      'M5 21V4m0 0c5-3 9 3 14 0v10c-5 3-9-3-14 0',

    users:
      'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',

    building:
      'M4 21V5l8-3 8 3v16M8 9h2M14 9h2M8 13h2M14 13h2M8 17h2M14 17h2',

    wallet:
      'M3 7h18v13H3zM3 7l2-4h14l2 4M16 14h5',

    report:
      'M6 2h9l5 5v15H6zM15 2v6h6M9 13h6M9 17h6',

    audit:
      'M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7zM9 12l2 2 4-4',

    search:
      'M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z',

    bell:
      'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4',

    chevron:
      'M9 18l6-6-6-6',

    download:
      'M12 3v12m0 0 4-4m-4 4-4-4M5 21h14',

    plus:
      'M12 5v14M5 12h14',

    close:
      'M6 6l12 12M18 6L6 18',

    refresh:
      'M20 11a8 8 0 1 0 1 4M20 4v7h-7',

    logout:
      'M10 17l5-5-5-5M15 12H3M21 3v18',
  }

  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        d={paths[name] || paths.grid}
      />
    </svg>
  )
}

function App() {
  const [page, setPage] =
    useState<Page>('dashboard')

  const [dashboard, setDashboard] =
    useState<Dashboard>(demo)

  const [loading, setLoading] =
    useState(false)

  const [toast, setToast] =
    useState('')

  const navigate = useNavigate()

  const {
    user,
    logout,
  } = useAuth()

  const handleLogout = () => {
    logout()

    navigate('/login', {
      replace: true,
    })
  }

  const loadDashboard = async () => {
    setLoading(true)

    try {
      setDashboard(
        await api<Dashboard>(
          '/dashboard/overview',
        ),
      )
    } catch {
      setDashboard(demo)

      setToast(
        'Backend unavailable — showing live-ready demo data',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  useEffect(() => {
    if (!toast) {
      return
    }

    const t = setTimeout(
      () => setToast(''),
      3500,
    )

    return () => clearTimeout(t)
  }, [toast])

  const nav = [
    ['dashboard', 'Overview', 'grid'],
    ['services', 'Services', 'service'],
    ['grievances', 'Grievances', 'flag'],
    ['citizens', 'Citizens', 'users'],
    ['departments', 'Departments', 'building'],
    ['finance', 'Finance & Budget', 'wallet'],
    ['reports', 'Reports', 'report'],
    ['audit', 'Audit Trail', 'audit'],
  ] as [Page, string, string][]

  return (
    <div className="shell">
      {/* =====================================================
          ADMIN SIDEBAR
      ====================================================== */}

      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <Icon name="pulse" />
          </div>

          <div>
            <strong>CivicPulse</strong>
            <span>NEXUS</span>
          </div>
        </div>

        <div className="workspace">
          <span>GOVERNANCE OS</span>
          <b>Executive Workspace</b>
        </div>

        <nav>
          {nav.map(
            ([key, label, icon]) => (
              <button
                key={key}
                className={
                  page === key
                    ? 'nav-item active'
                    : 'nav-item'
                }
                onClick={() =>
                  setPage(key)
                }
                type="button"
              >
                <Icon name={icon} />

                <span>{label}</span>

                {key === 'grievances' &&
                  dashboard.openGrievances >
                    0 && (
                    <em>
                      {
                        dashboard.openGrievances
                      }
                    </em>
                  )}
              </button>
            ),
          )}
        </nav>

        {/* SIDEBAR FOOTER */}

        <div className="sidebar-bottom">
          <button
            type="button"
            className="admin-sidebar-logout"
            title="Sign out"
            aria-label="Sign out"
            onClick={handleLogout}
          >
            <Icon name="logout" />
            <span>Sign out</span>
          </button>

          <div className="status-dot">
            <i />
            Systems operational
          </div>

          <small>
            v1.0 • Governance Analytics
          </small>
        </div>
      </aside>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="main">
        {/* TOPBAR */}

        <header className="topbar">
          <div className="crumb">
            <span>
              Municipal Administration
            </span>

            <Icon name="chevron" />

            <b>
              {
                nav.find(
                  (n) => n[0] === page,
                )?.[1]
              }
            </b>
          </div>

          <div className="top-actions">
            <button
              type="button"
              className="icon-button"
              title="Refresh"
              aria-label="Refresh dashboard"
              onClick={loadDashboard}
            >
              <Icon name="refresh" />
            </button>

            <button
              type="button"
              className="icon-button"
              title="Notifications"
              aria-label="Notifications"
            >
              <Icon name="bell" />
            </button>

            <div className="avatar">
              {getInitials(user?.name)}
            </div>

            <div className="admin">
              <b>
                {user?.name ||
                  'Admin Officer'}
              </b>

              <span>
                {user?.role === 'ADMIN'
                  ? 'Executive access'
                  : 'Administrator'}
              </span>
            </div>

            <button
              type="button"
              className="admin-logout-button"
              onClick={handleLogout}
              title="Sign out"
              aria-label="Sign out"
            >
              <span>↪</span>
              <span>Sign out</span>
            </button>
          </div>
        </header>

        {/* CONTENT */}

        <section className="content">
          {page === 'dashboard' && (
            <DashboardPage
              data={dashboard}
              loading={loading}
              onRefresh={loadDashboard}
            />
          )}

          {page === 'services' && (
            <ServicePage
              setToast={setToast}
            />
          )}

          {page === 'grievances' && (
            <GrievancePage
              setToast={setToast}
            />
          )}

          {page === 'citizens' && (
            <CitizensPage
              setToast={setToast}
            />
          )}

          {page === 'departments' && (
            <DepartmentsPage />
          )}

          {page === 'finance' && (
            <FinancePage
              data={dashboard}
            />
          )}

          {page === 'reports' && (
            <ReportsPage
              data={dashboard}
              setToast={setToast}
            />
          )}

          {page === 'audit' && (
            <AuditPage />
          )}
        </section>
      </main>

      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}
    </div>
  )
}

/* =========================================================
   PAGE HEADER
========================================================= */

function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="page-header">
      <div>
        <div className="eyebrow">
          {eyebrow}
        </div>

        <h1>{title}</h1>

        <p>{description}</p>
      </div>

      {action}
    </div>
  )
}

/* =========================================================
   KPI
========================================================= */

function Kpi({
  label,
  value,
  meta,
  trend,
  icon,
}: {
  label: string
  value: string
  meta: string
  trend?: string
  icon: string
}) {
  return (
    <div className="kpi">
      <div className="kpi-top">
        <span>{label}</span>

        <div className="kpi-icon">
          <Icon name={icon} />
        </div>
      </div>

      <strong>{value}</strong>

      <div className="kpi-meta">
        <span>{meta}</span>

        {trend && <b>{trend}</b>}
      </div>
    </div>
  )
}

/* =========================================================
   CHART
========================================================= */

function Chart({
  data,
  type = 'line',
  valueKey = 'requests',
}: {
  data: any[]
  type?: 'line' | 'bar'
  valueKey?: string
}) {
  const max = Math.max(
    ...data.map((d) =>
      Number(d[valueKey] || 0),
    ),
    1,
  )

  if (type === 'bar') {
    return (
      <div className="bar-chart">
        {data.map((d, i) => (
          <div
            className="bar-col"
            key={i}
          >
            <div className="bar-value">
              {Math.round(
                Number(
                  d[valueKey],
                ) / 1000,
              )}
              k
            </div>

            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  height: `${
                    (Number(
                      d[valueKey],
                    ) /
                      max) *
                    100
                  }%`,
                }}
              />
            </div>

            <span>{d.label}</span>
          </div>
        ))}
      </div>
    )
  }

  const w = 600
  const h = 190
  const p = 20

  const pts = data
    .map(
      (d, i) =>
        `${p +
          (i *
            (w - 2 * p)) /
            Math.max(
              data.length - 1,
              1,
            )},${
          h -
          p -
          (Number(
            d[valueKey],
          ) /
            max) *
            (h - 2 * p)
        }`,
    )
    .join(' ')

  return (
    <div className="line-chart">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="area"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="currentColor"
              stopOpacity=".18"
            />

            <stop
              offset="100%"
              stopColor="currentColor"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        <polyline
          points={`${p},${
            h - p
          } ${pts} ${
            w - p
          },${h - p}`}
          fill="url(#area)"
          stroke="none"
        />

        <polyline
          points={pts}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {data.map((d, i) => {
          const x =
            p +
            (i *
              (w - 2 * p)) /
              Math.max(
                data.length - 1,
                1,
              )

          const y =
            h -
            p -
            (Number(
              d[valueKey],
            ) /
              max) *
              (h - 2 * p)

          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="currentColor"
            />
          )
        })}
      </svg>

      <div className="chart-labels">
        {data.map((d, i) => (
          <span key={i}>
            {d.label}
          </span>
        ))}
      </div>
    </div>
  )
}

/* =========================================================
   DASHBOARD PAGE
========================================================= */

function DashboardPage({
  data,
  loading,
  onRefresh,
}: {
  data: Dashboard
  loading: boolean
  onRefresh: () => void
}) {
  return (
    <div>
      <PageHeader
        eyebrow="MILESTONE 4 • GOVERNANCE ANALYTICS"
        title="Executive Dashboard"
        description="A decision cockpit for service delivery, citizen sentiment, finance, departmental performance and compliance."
        action={
          <button
            className="primary-button"
            onClick={onRefresh}
            type="button"
          >
            <Icon name="refresh" />

            {loading
              ? 'Refreshing'
              : 'Sync data'}
          </button>
        }
      />

      <div className="kpi-grid">
        <Kpi
          label="Citizen satisfaction"
          value={`${data.citizenSatisfaction.toFixed(
            1,
          )} / 5`}
          meta="Overall feedback score"
          trend="+0.3 this quarter"
          icon="users"
        />

        <Kpi
          label="SLA compliance"
          value={`${data.slaCompliance}%`}
          meta="Requests within SLA"
          trend="+4.2% vs last month"
          icon="service"
        />

        <Kpi
          label="Revenue collected"
          value={money(
            data.revenueCollected,
          )}
          meta="Current reporting period"
          trend="+12.8% YoY"
          icon="wallet"
        />

        <Kpi
          label="Budget utilized"
          value={`${data.budgetUtilization}%`}
          meta="Across active departments"
          trend="On plan"
          icon="building"
        />
      </div>

      <div className="grid-2">
        <Panel
          title="Service performance"
          subtitle={`${fmt(
            data.totalRequests,
          )} requests • ${fmt(
            data.resolvedRequests,
          )} resolved`}
          action={
            <span className="chip success">
              94% resolved
            </span>
          }
        >
          <Chart
            data={data.serviceTrend}
            valueKey="resolved"
          />

          <div className="mini-metrics">
            <div>
              <span>
                Total requests
              </span>

              <b>
                {fmt(
                  data.totalRequests,
                )}
              </b>
            </div>

            <div>
              <span>Resolved</span>

              <b>
                {fmt(
                  data.resolvedRequests,
                )}
              </b>
            </div>

            <div>
              <span>Backlog</span>

              <b>
                {fmt(
                  data.totalRequests -
                    data.resolvedRequests,
                )}
              </b>
            </div>
          </div>
        </Panel>

        <Panel
          title="Grievance pulse"
          subtitle="Incoming citizen complaints by month"
          action={
            <span className="chip warning">
              {data.openGrievances} open
            </span>
          }
        >
          <Chart
            data={data.grievanceTrend}
            valueKey="count"
          />

          <div className="insight">
            <div className="insight-icon">
              !
            </div>

            <div>
              <b>
                Resolution workload
              </b>

              <p>
                {Math.round(
                  (data.resolvedGrievances /
                    data.totalGrievances) *
                    100,
                )}
                % of all recorded grievances
                are resolved.
              </p>
            </div>
          </div>
        </Panel>
      </div>

      <div className="grid-2">
        <Panel
          title="Department performance"
          subtitle="SLA, satisfaction and workload"
        >
          <div className="performance-table">
            {data.departmentPerformance.map(
              (d) => (
                <div
                  className="performance-row"
                  key={d.department}
                >
                  <div className="dept-name">
                    <span className="dept-avatar">
                      {d.department[0]}
                    </span>

                    <div>
                      <b>
                        {d.department}
                      </b>

                      <small>
                        {fmt(
                          d.requests,
                        )}{' '}
                        requests •{' '}
                        {d.complaints}{' '}
                        complaints
                      </small>
                    </div>
                  </div>

                  <div className="score">
                    <span>SLA</span>

                    <b>{d.sla}%</b>

                    <div className="progress">
                      <i
                        style={{
                          width: `${d.sla}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="score satisfaction">
                    <span>
                      Citizen score
                    </span>

                    <b>
                      {d.satisfaction.toFixed(
                        1,
                      )}
                    </b>
                  </div>
                </div>
              ),
            )}
          </div>
        </Panel>

        <Panel
          title="Budget utilization"
          subtitle="Allocated versus utilized funds"
          action={
            <span className="chip neutral">
              {data.budgetUtilization}%
              overall
            </span>
          }
        >
          <div className="budget-list">
            {data.budget.map((b) => {
              const p = Math.round(
                (b.utilized /
                  b.allocated) *
                  100,
              )

              return (
                <div
                  key={b.department}
                  className="budget-item"
                >
                  <div>
                    <b>{b.department}</b>

                    <span>
                      {money(
                        b.utilized,
                      )}{' '}
                      /{' '}
                      {money(
                        b.allocated,
                      )}
                    </span>
                  </div>

                  <div className="progress wide">
                    <i
                      style={{
                        width: `${p}%`,
                      }}
                    />
                  </div>

                  <strong>{p}%</strong>
                </div>
              )
            })}
          </div>
        </Panel>
      </div>

      <div className="grid-3">
        <Panel
          title="Revenue trend"
          subtitle="Monthly collection"
        >
          <Chart
            data={data.revenueTrend}
            valueKey="amount"
            type="bar"
          />
        </Panel>

        <Panel
          title="Governance snapshot"
          subtitle="Current operational footprint"
        >
          <div className="snapshot">
            <div>
              <b>
                {fmt(data.citizens)}
              </b>
              <span>Citizens</span>
            </div>

            <div>
              <b>{data.departments}</b>
              <span>Departments</span>
            </div>

            <div>
              <b>
                {fmt(
                  data.totalGrievances,
                )}
              </b>
              <span>Grievances</span>
            </div>

            <div>
              <b>
                {fmt(
                  data.totalRequests,
                )}
              </b>
              <span>Requests</span>
            </div>
          </div>
        </Panel>

        <Panel
          title="Compliance posture"
          subtitle="Audit readiness"
        >
          <div className="compliance">
            <div
              className="ring"
              style={
                {
                  '--value': '94%',
                } as CSSProperties
              }
            >
              <strong>94%</strong>
              <span>Ready</span>
            </div>

            <div>
              <b>Controls monitored</b>

              <p>
                Service SLA, budget approvals,
                grievance actions and revenue
                entries are audit-traceable.
              </p>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  )
}

/* =========================================================
   PANEL
========================================================= */

function Panel({
  title,
  subtitle,
  action,
  children,
}: {
  title: string
  subtitle: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="panel">
      <div className="panel-head">
        <div>
          <h2>{title}</h2>
          <span>{subtitle}</span>
        </div>

        {action}
      </div>

      {children}
    </div>
  )
}

/* =========================================================
   SERVICES
========================================================= */

function ServicePage({
  setToast,
}: {
  setToast: (s: string) => void
}) {
  const [rows, setRows] =
    useState<ServiceRequest[]>([])

  const [q, setQ] = useState('')
  const [show, setShow] =
    useState(false)

  const load = async () => {
    try {
      setRows(
        await api<ServiceRequest[]>(
          '/services/requests',
        ),
      )
    } catch {
      setRows([
        {
          id: '1',
          referenceNo:
            'SRV-2026-1048',
          citizenName:
            'Priya Sharma',
          department: 'Revenue',
          serviceType:
            'Property Tax Certificate',
          status: 'Approved',
          slaDays: 5,
          processingDays: 3,
          createdAt:
            '2026-09-28',
        },
        {
          id: '2',
          referenceNo:
            'SRV-2026-1049',
          citizenName:
            'Ramesh Kumar',
          department: 'Water',
          serviceType:
            'New Water Connection',
          status: 'In Progress',
          slaDays: 10,
          processingDays: 6,
          createdAt:
            '2026-09-27',
        },
      ])
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = rows.filter(
    (r) =>
      Object.values(r)
        .join(' ')
        .toLowerCase()
        .includes(q.toLowerCase()),
  )

  return (
    <div>
      <PageHeader
        eyebrow="PHASE 1 • SERVICE MANAGEMENT"
        title="Service requests"
        description="Track public-service demand, SLA commitments, processing time and resolution status."
        action={
          <button
            className="primary-button"
            onClick={() => setShow(true)}
            type="button"
          >
            <Icon name="plus" />
            New request
          </button>
        }
      />

      <Toolbar
        search={q}
        setSearch={setQ}
        onRefresh={load}
      />

      <DataTable
        headers={[
          'Reference',
          'Citizen',
          'Department',
          'Service',
          'Status',
          'SLA',
          'Created',
        ]}
        rows={filtered.map((r) => [
          <b key={`${r.id}-ref`}>
            {r.referenceNo}
          </b>,
          r.citizenName,
          r.department,
          r.serviceType,
          <StatusBadge
            key={`${r.id}-status`}
            status={r.status}
          />,
          `${r.processingDays}/${r.slaDays} days`,
          new Date(
            r.createdAt,
          ).toLocaleDateString(),
        ])}
      />

      {show && (
        <ServiceForm
          onClose={() =>
            setShow(false)
          }
          onSaved={() => {
            setShow(false)
            setToast(
              'Service request created',
            )
            load()
          }}
        />
      )}
    </div>
  )
}

function ServiceForm({
  onClose,
  onSaved,
}: {
  onClose: () => void
  onSaved: () => void
}) {
  const [form, setForm] =
    useState({
      citizenName: '',
      department: 'Revenue',
      serviceType:
        'Property Tax Certificate',
    })

  const submit = async (
    e: FormEvent,
  ) => {
    e.preventDefault()

    try {
      await api(
        '/services/requests',
        {
          method: 'POST',
          body: JSON.stringify({
            ...form,
            status: 'Pending',
            slaDays: 7,
            processingDays: 0,
          }),
        },
      )

      onSaved()
    } catch {
      onSaved()
    }
  }

  return (
    <Modal
      title="Create service request"
      onClose={onClose}
    >
      <form
        onSubmit={submit}
        className="form-grid"
      >
        <label>
          Citizen name

          <input
            required
            value={form.citizenName}
            onChange={(e) =>
              setForm({
                ...form,
                citizenName:
                  e.target.value,
              })
            }
          />
        </label>

        <label>
          Department

          <select
            value={form.department}
            onChange={(e) =>
              setForm({
                ...form,
                department:
                  e.target.value,
              })
            }
          >
            <option>Revenue</option>
            <option>Water</option>
            <option>Sanitation</option>
            <option>Licensing</option>
            <option>Public Works</option>
          </select>
        </label>

        <label className="full">
          Service type

          <input
            required
            value={form.serviceType}
            onChange={(e) =>
              setForm({
                ...form,
                serviceType:
                  e.target.value,
              })
            }
          />
        </label>

        <div className="form-actions">
          <button
            type="button"
            className="ghost-button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button className="primary-button">
            Create request
          </button>
        </div>
      </form>
    </Modal>
  )
}

/* =========================================================
   GRIEVANCES
========================================================= */

function GrievancePage({
  setToast,
}: {
  setToast: (s: string) => void
}) {
  const [rows, setRows] =
    useState<Grievance[]>([])

  const [q, setQ] = useState('')
  const [show, setShow] =
    useState(false)

  const load = async () => {
    try {
      setRows(
        await api<Grievance[]>(
          '/grievances',
        ),
      )
    } catch {
      setRows([
        {
          id: '1',
          referenceNo:
            'GRV-2026-847',
          citizenName:
            'Ramesh Kumar',
          department: 'Water',
          category:
            'Water Supply',
          priority: 'High',
          description:
            'Low pressure in residential area',
          status: 'In Progress',
          slaDays: 3,
          createdAt:
            '2026-09-28',
        },
        {
          id: '2',
          referenceNo:
            'GRV-2026-848',
          citizenName:
            'Priya Sharma',
          department:
            'Public Works',
          category:
            'Street Light',
          priority: 'Medium',
          description:
            'Street light not working',
          status: 'Resolved',
          slaDays: 5,
          createdAt:
            '2026-09-26',
        },
      ])
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = rows.filter(
    (r) =>
      Object.values(r)
        .join(' ')
        .toLowerCase()
        .includes(q.toLowerCase()),
  )

  return (
    <div>
      <PageHeader
        eyebrow="PHASE 1 • CITIZEN VOICE"
        title="Grievance management"
        description="Prioritize, route and monitor citizen complaints with SLA visibility and a complete resolution trail."
        action={
          <button
            className="primary-button"
            onClick={() => setShow(true)}
            type="button"
          >
            <Icon name="plus" />
            Register grievance
          </button>
        }
      />

      <Toolbar
        search={q}
        setSearch={setQ}
        onRefresh={load}
      />

      <DataTable
        headers={[
          'Reference',
          'Citizen',
          'Category',
          'Department',
          'Priority',
          'Status',
          'Created',
        ]}
        rows={filtered.map((r) => [
          <b key={`${r.id}-ref`}>
            {r.referenceNo}
          </b>,
          r.citizenName,
          r.category,
          r.department,
          <Priority
            key={`${r.id}-priority`}
            p={r.priority}
          />,
          <StatusBadge
            key={`${r.id}-status`}
            status={r.status}
          />,
          new Date(
            r.createdAt,
          ).toLocaleDateString(),
        ])}
      />

      {show && (
        <GrievanceForm
          onClose={() =>
            setShow(false)
          }
          onSaved={() => {
            setShow(false)
            setToast(
              'Grievance registered',
            )
            load()
          }}
        />
      )}
    </div>
  )
}

function GrievanceForm({
  onClose,
  onSaved,
}: {
  onClose: () => void
  onSaved: () => void
}) {
  const [form, setForm] =
    useState({
      citizenName: '',
      department: 'Water',
      category:
        'Water Supply',
      priority: 'Medium',
      description: '',
    })

  const submit = async (
    e: FormEvent,
  ) => {
    e.preventDefault()

    try {
      await api('/grievances', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          status: 'Pending',
          slaDays: 5,
        }),
      })
    } catch {
      // Demo fallback.
    }

    onSaved()
  }

  return (
    <Modal
      title="Register grievance"
      onClose={onClose}
    >
      <form
        onSubmit={submit}
        className="form-grid"
      >
        <label>
          Citizen name

          <input
            required
            value={form.citizenName}
            onChange={(e) =>
              setForm({
                ...form,
                citizenName:
                  e.target.value,
              })
            }
          />
        </label>

        <label>
          Department

          <select
            value={form.department}
            onChange={(e) =>
              setForm({
                ...form,
                department:
                  e.target.value,
              })
            }
          >
            <option>Water</option>
            <option>Sanitation</option>
            <option>
              Public Works
            </option>
            <option>Revenue</option>
            <option>Licensing</option>
          </select>
        </label>

        <label>
          Category

          <input
            required
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category:
                  e.target.value,
              })
            }
          />
        </label>

        <label>
          Priority

          <select
            value={form.priority}
            onChange={(e) =>
              setForm({
                ...form,
                priority:
                  e.target.value,
              })
            }
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </label>

        <label className="full">
          Description

          <textarea
            required
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value,
              })
            }
          />
        </label>

        <div className="form-actions">
          <button
            type="button"
            className="ghost-button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button className="primary-button">
            Register
          </button>
        </div>
      </form>
    </Modal>
  )
}

/* =========================================================
   CITIZENS
========================================================= */

function CitizensPage({
  setToast,
}: {
  setToast: (s: string) => void
}) {
  const [rows, setRows] =
    useState<Citizen[]>([])

  const [q, setQ] = useState('')

  const load = async () => {
    try {
      setRows(
        await api<Citizen[]>(
          '/citizens',
        ),
      )
    } catch {
      setRows([
        {
          id: '1',
          name: 'Priya Sharma',
          status: 'Active',
          phone:
            '+91 98765 43210',
          email:
            'priya@example.com',
        },
        {
          id: '2',
          name: 'Ramesh Kumar',
          status: 'Active',
          phone:
            '+91 98123 45678',
          email:
            'ramesh@example.com',
        },
        {
          id: '3',
          name: 'Amit Patel',
          status: 'Active',
          phone:
            '+91 98989 12121',
          email:
            'amit@example.com',
        },
      ])
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = rows.filter(
    (r) =>
      Object.values(r)
        .join(' ')
        .toLowerCase()
        .includes(q.toLowerCase()),
  )

  return (
    <div>
      <PageHeader
        eyebrow="PHASE 1 • CITIZEN REGISTRY"
        title="Citizen registry"
        description="A governed view of registered citizens and their service relationship."
      />

      <Toolbar
        search={q}
        setSearch={setQ}
        onRefresh={load}
      />

      <DataTable
        headers={[
          'Citizen',
          'Phone',
          'Email',
          'Status',
          'Record',
        ]}
        rows={filtered.map((r) => [
          <div
            className="person"
            key={`${r.id}-person`}
          >
            <span>
              {r.name[0]}
            </span>

            <b>{r.name}</b>
          </div>,

          r.phone || '—',

          r.email || '—',

          <StatusBadge
            key={`${r.id}-status`}
            status={
              r.status as Status
            }
          />,

          <button
            key={`${r.id}-record`}
            className="table-action"
            onClick={() =>
              setToast(
                `Citizen record: ${r.name}`,
              )
            }
            type="button"
          >
            View record
          </button>,
        ])}
      />
    </div>
  )
}

/* =========================================================
   DEPARTMENTS
========================================================= */

function DepartmentsPage() {
  const [rows, setRows] =
    useState<Department[]>([])

  const load = async () => {
    try {
      setRows(
        await api<Department[]>(
          '/departments',
        ),
      )
    } catch {
      setRows([
        {
          id: '1',
          name: 'Revenue Department',
          code: 'REV',
          head: 'Anita Rao',
          status: 'Active',
        },
        {
          id: '2',
          name: 'Water & Utilities',
          code: 'WAT',
          head: 'Suresh Menon',
          status: 'Active',
        },
        {
          id: '3',
          name: 'Public Works',
          code: 'PWD',
          head: 'Vikram Singh',
          status: 'Active',
        },
        {
          id: '4',
          name: 'Sanitation',
          code: 'SAN',
          head: 'Meena Das',
          status: 'Active',
        },
      ])
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div>
      <PageHeader
        eyebrow="PHASE 2 • DEPARTMENT ANALYTICS"
        title="Department performance"
        description="Compare workload, service-level compliance and citizen outcomes across administrative units."
      />

      <div className="department-cards">
        {rows.map((d, i) => (
          <div
            className="department-card"
            key={d.id}
          >
            <div className="dept-card-top">
              <span className="dept-avatar large">
                {d.code.slice(0, 1)}
              </span>

              <StatusBadge
                status={
                  d.status as Status
                }
              />
            </div>

            <h2>{d.name}</h2>

            <p>
              {d.code} • Head:{' '}
              {d.head}
            </p>

            <div className="dept-stats">
              <div>
                <b>
                  {
                    [97, 92, 89, 95][
                      i % 4
                    ]
                  }
                  %
                </b>

                <span>SLA</span>
              </div>

              <div>
                <b>
                  {
                    [
                      4.8,
                      4.5,
                      4.1,
                      4.6,
                    ][i % 4]
                  }
                </b>

                <span>
                  Citizen score
                </span>
              </div>

              <div>
                <b>
                  {
                    [
                      3820,
                      5240,
                      6120,
                      2410,
                    ][
                      i % 4
                    ].toLocaleString()
                  }
                </b>

                <span>Requests</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* =========================================================
   FINANCE
========================================================= */

function FinancePage({
  data,
}: {
  data: Dashboard
}) {
  return (
    <div>
      <PageHeader
        eyebrow="PHASE 2 • FINANCIAL GOVERNANCE"
        title="Revenue & budget"
        description="Track collections, utilization and departmental financial posture for the reporting period."
        action={
          <button
            className="primary-button"
            onClick={() =>
              window.print()
            }
            type="button"
          >
            <Icon name="download" />
            Export / Print
          </button>
        }
      />

      <div className="kpi-grid">
        <Kpi
          label="Revenue collected"
          value={money(
            data.revenueCollected,
          )}
          meta="Current period"
          trend="+12.8% YoY"
          icon="wallet"
        />

        <Kpi
          label="Budget utilized"
          value={`${data.budgetUtilization}%`}
          meta="Across departments"
          icon="building"
        />

        <Kpi
          label="Available balance"
          value={money(
            50000000 -
              data.revenueCollected,
          )}
          meta="Illustrative budget headroom"
          icon="report"
        />

        <Kpi
          label="Collection trend"
          value="+12.8%"
          meta="Year over year"
          icon="pulse"
        />
      </div>

      <div className="grid-2">
        <Panel
          title="Monthly revenue"
          subtitle="Collections by reporting month"
        >
          <Chart
            data={data.revenueTrend}
            valueKey="amount"
            type="bar"
          />
        </Panel>

        <Panel
          title="Budget allocation"
          subtitle="Department-level utilization"
        >
          <div className="budget-list">
            {data.budget.map((b) => {
              const p = Math.round(
                (b.utilized /
                  b.allocated) *
                  100,
              )

              return (
                <div
                  className="budget-item"
                  key={b.department}
                >
                  <div>
                    <b>
                      {b.department}
                    </b>

                    <span>
                      {money(
                        b.utilized,
                      )}{' '}
                      utilized
                    </span>
                  </div>

                  <div className="progress wide">
                    <i
                      style={{
                        width: `${p}%`,
                      }}
                    />
                  </div>

                  <strong>{p}%</strong>
                </div>
              )
            })}
          </div>
        </Panel>
      </div>
    </div>
  )
}

/* =========================================================
   REPORTS
========================================================= */

function ReportsPage({
  data,
  setToast,
}: {
  data: Dashboard
  setToast: (s: string) => void
}) {
  const reports = [
    [
      'Citizen Satisfaction Report',
      'Citizen feedback, rating trends and service experience.',
    ],
    [
      'Service Performance Report',
      'SLA adherence, processing time and backlog.',
    ],
    [
      'Grievance Report',
      'Complaint volume, priority, status and resolution.',
    ],
    [
      'Revenue Report',
      'Collection by month, department and source.',
    ],
    [
      'Department Performance Report',
      'Comparative operational performance across departments.',
    ],
    [
      'Budget Utilization Report',
      'Allocated, utilized and remaining funds.',
    ],
    [
      'Compliance Audit Report',
      'Control activity and governance audit trail.',
    ],
  ]

  const download = (
    name: string,
  ) => {
    const rows = [
      ['Metric', 'Value'],
      [
        'Citizen satisfaction',
        `${data.citizenSatisfaction}/5`,
      ],
      [
        'SLA compliance',
        `${data.slaCompliance}%`,
      ],
      [
        'Revenue collected',
        data.revenueCollected.toString(),
      ],
      [
        'Budget utilization',
        `${data.budgetUtilization}%`,
      ],
      [
        'Total requests',
        data.totalRequests.toString(),
      ],
      [
        'Total grievances',
        data.totalGrievances.toString(),
      ],
    ]

    const csv = rows
      .map((r) =>
        r
          .map(
            (x) =>
              `"${x.replaceAll(
                '"',
                '""',
              )}"`,
          )
          .join(','),
      )
      .join('\n')

    const a =
      document.createElement('a')

    a.href =
      URL.createObjectURL(
        new Blob([csv], {
          type: 'text/csv',
        }),
      )

    a.download = `${name.replaceAll(
      ' ',
      '_',
    )}.csv`

    a.click()

    URL.revokeObjectURL(a.href)

    setToast(
      `${name} exported`,
    )
  }

  return (
    <div>
      <PageHeader
        eyebrow="PHASE 3 • REPORTING"
        title="Governance reports"
        description="Generate management-ready reports from the same governed metrics powering the executive dashboard."
      />

      <div className="report-grid">
        {reports.map(
          ([name, desc]) => (
            <div
              className="report-card"
              key={name}
            >
              <div className="report-icon">
                <Icon name="report" />
              </div>

              <div>
                <h2>{name}</h2>
                <p>{desc}</p>
              </div>

              <div className="report-actions">
                <button
                  className="ghost-button"
                  onClick={() =>
                    window.print()
                  }
                  type="button"
                >
                  Preview
                </button>

                <button
                  className="primary-button small"
                  onClick={() =>
                    download(name)
                  }
                  type="button"
                >
                  <Icon name="download" />
                  CSV
                </button>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  )
}

/* =========================================================
   AUDIT
========================================================= */

function AuditPage() {
  const [rows, setRows] =
    useState<AuditLog[]>([])

  const load = async () => {
    try {
      setRows(
        await api<AuditLog[]>(
          '/audit',
        ),
      )
    } catch {
      setRows([
        {
          id: '1',
          actor: 'Admin Officer',
          action:
            'Approved service request',
          moduleName: 'Services',
          entityRef:
            'SRV-2026-1048',
          timestamp:
            '2026-09-30T15:42:00',
          outcome: 'Success',
        },
        {
          id: '2',
          actor: 'Revenue Officer',
          action:
            'Recorded payment',
          moduleName: 'Finance',
          entityRef:
            'PAY-2026-881',
          timestamp:
            '2026-09-30T14:18:00',
          outcome: 'Success',
        },
        {
          id: '3',
          actor:
            'Grievance Officer',
          action:
            'Escalated grievance',
          moduleName:
            'Grievances',
          entityRef:
            'GRV-2026-847',
          timestamp:
            '2026-09-30T12:07:00',
          outcome: 'Success',
        },
      ])
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div>
      <PageHeader
        eyebrow="PHASE 4 • COMPLIANCE"
        title="Audit trail"
        description="Immutable-style activity visibility for administrative actions, approvals and financial events."
      />

      <div className="audit-banner">
        <div className="shield">
          <Icon name="audit" />
        </div>

        <div>
          <b>
            Audit coverage active
          </b>

          <span>
            Core service, grievance,
            finance and reporting actions
            are recorded.
          </span>
        </div>

        <strong>94%</strong>
      </div>

      <DataTable
        headers={[
          'Timestamp',
          'Actor',
          'Module',
          'Action',
          'Reference',
          'Outcome',
        ]}
        rows={rows.map((r) => [
          new Date(
            r.timestamp,
          ).toLocaleString(),

          r.actor,

          r.moduleName,

          r.action,

          <code key={`${r.id}-ref`}>
            {r.entityRef}
          </code>,

          <span
            className="success-text"
            key={`${r.id}-outcome`}
          >
            ● {r.outcome}
          </span>,
        ])}
      />
    </div>
  )
}

/* =========================================================
   TOOLBAR
========================================================= */

function Toolbar({
  search,
  setSearch,
  onRefresh,
}: {
  search: string
  setSearch: (s: string) => void
  onRefresh: () => void
}) {
  return (
    <div className="toolbar">
      <div className="search">
        <Icon name="search" />

        <input
          placeholder="Search records..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value,
            )
          }
        />
      </div>

      <button
        className="ghost-button"
        onClick={onRefresh}
        type="button"
      >
        <Icon name="refresh" />
        Refresh
      </button>
    </div>
  )
}

/* =========================================================
   DATA TABLE
========================================================= */

function DataTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: React.ReactNode[][]
}) {
  return (
    <div className="table-card">
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              {headers.map((h) => (
                <th key={h}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.length ? (
              rows.map(
                (row, i) => (
                  <tr key={i}>
                    {row.map(
                      (c, j) => (
                        <td key={j}>
                          {c}
                        </td>
                      ),
                    )}
                  </tr>
                ),
              )
            ) : (
              <tr>
                <td
                  colSpan={
                    headers.length
                  }
                >
                  <div className="empty">
                    No records found.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* =========================================================
   STATUS / PRIORITY
========================================================= */

function StatusBadge({
  status,
}: {
  status: Status
}) {
  return (
    <span
      className={`status ${status
        .toLowerCase()
        .replaceAll(
          ' ',
          '-',
        )}`}
    >
      {status}
    </span>
  )
}

function Priority({
  p,
}: {
  p: string
}) {
  return (
    <span
      className={`priority ${p.toLowerCase()}`}
    >
      <i /> {p}
    </span>
  )
}

/* =========================================================
   MODAL
========================================================= */

function Modal({
  title,
  onClose,
  children,
}: {
  title: string
  onClose: () => void
  children: ReactNode
}) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-head">
          <h2>{title}</h2>

          <button
            className="icon-button"
            onClick={onClose}
            type="button"
            aria-label="Close"
          >
            <Icon name="close" />
          </button>
        </div>

        {children}
      </div>
    </div>
  )
}

/* =========================================================
   FORMATTERS
========================================================= */

function money(v: number) {
  return new Intl.NumberFormat(
    'en-IN',
    {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    },
  ).format(v)
}

function fmt(v: number) {
  return new Intl.NumberFormat(
    'en-IN',
    {
      notation: 'compact',
      maximumFractionDigits: 1,
    },
  ).format(v)
}

/* =========================================================
   USER INITIALS
========================================================= */

function getInitials(
  name: string | undefined,
): string {
  if (!name) {
    return 'AD'
  }

  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (parts.length === 0) {
    return 'AD'
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

export default App