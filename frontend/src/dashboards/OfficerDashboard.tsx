import { useMemo } from 'react'
import DashboardShell from '../layouts/DashboardShell'
import { useAuth } from '../auth/AuthContext'
import './OfficerDashboard.css'

type MetricTone = 'indigo' | 'emerald' | 'amber' | 'rose'

type Metric = {
  label: string
  value: string
  change: string
  description: string
  tone: MetricTone
  icon: 'requests' | 'resolved' | 'sla' | 'grievance'
}

const metrics: Metric[] = [
  {
    label: 'Assigned Requests',
    value: '24',
    change: '+8.4%',
    description: 'vs. previous period',
    tone: 'indigo',
    icon: 'requests',
  },
  {
    label: 'Resolved Requests',
    value: '18',
    change: '+12.2%',
    description: 'this reporting period',
    tone: 'emerald',
    icon: 'resolved',
  },
  {
    label: 'SLA Compliance',
    value: '94.6%',
    change: '+2.8%',
    description: 'department performance',
    tone: 'amber',
    icon: 'sla',
  },
  {
    label: 'Open Grievances',
    value: '07',
    change: '3 urgent',
    description: 'require attention',
    tone: 'rose',
    icon: 'grievance',
  },
]

const requestRows = [
  {
    id: 'REQ-1028',
    citizen: 'A. Kumar',
    service: 'Property Tax',
    submitted: '02 Oct 2026',
    status: 'In Review',
    statusClass: 'review',
  },
  {
    id: 'REQ-1024',
    citizen: 'S. Devi',
    service: 'Water Connection',
    submitted: '01 Oct 2026',
    status: 'Pending',
    statusClass: 'pending',
  },
  {
    id: 'REQ-1019',
    citizen: 'R. Prasad',
    service: 'Revenue Certificate',
    submitted: '30 Sep 2026',
    status: 'Resolved',
    statusClass: 'resolved',
  },
  {
    id: 'REQ-1014',
    citizen: 'M. Rao',
    service: 'Property Tax',
    submitted: '29 Sep 2026',
    status: 'In Review',
    statusClass: 'review',
  },
]

const grievanceRows = [
  {
    id: 'GRV-204',
    subject: 'Delayed certificate processing',
    priority: 'High',
    age: '2 days',
  },
  {
    id: 'GRV-198',
    subject: 'Incorrect revenue assessment',
    priority: 'Medium',
    age: '4 days',
  },
  {
    id: 'GRV-193',
    subject: 'Payment status not updated',
    priority: 'Low',
    age: '6 days',
  },
]

const activityRows = [
  {
    type: 'resolved',
    title: 'Request REQ-1019 resolved',
    description: 'Revenue Certificate issued',
    time: '18 min ago',
  },
  {
    type: 'review',
    title: 'Request REQ-1028 moved to review',
    description: 'Property Tax assessment',
    time: '42 min ago',
  },
  {
    type: 'grievance',
    title: 'New grievance received',
    description: 'Delayed certificate processing',
    time: '1 hr ago',
  },
  {
    type: 'update',
    title: 'SLA status updated',
    description: 'Revenue Department',
    time: '2 hrs ago',
  },
]

export default function OfficerDashboard() {
  const { user } = useAuth()

  const completionRate = useMemo(() => {
    const resolved = 18
    const total = 24

    return Math.round((resolved / total) * 100)
  }, [])

  const reportingDate = new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
    .format(new Date())
    .toUpperCase()

  const officerName = user?.name || 'Officer'
  const department = user?.department || 'Department Operations'

  return (
    <DashboardShell
      title="Officer Dashboard"
      subtitle="Monitor departmental operations, citizen requests and service-level performance."
      navigation={
        <>
          <a href="#overview" className="dashboard-nav-item active">
            <span className="officer-nav-icon">
              <GridIcon />
            </span>
            <span>Overview</span>
          </a>

          <a href="#requests" className="dashboard-nav-item">
            <span className="officer-nav-icon">
              <RequestIcon />
            </span>
            <span>Requests</span>
          </a>

          <a href="#grievances" className="dashboard-nav-item">
            <span className="officer-nav-icon">
              <AlertIcon />
            </span>
            <span>Grievances</span>
          </a>

          <a href="#services" className="dashboard-nav-item">
            <span className="officer-nav-icon">
              <ServiceIcon />
            </span>
            <span>Services</span>
          </a>

          <a href="#performance" className="dashboard-nav-item">
            <span className="officer-nav-icon">
              <PerformanceIcon />
            </span>
            <span>Performance</span>
          </a>
        </>
      }
    >
      <section id="overview" className="officer-dashboard">
        {/* HERO */}
        <section className="officer-hero">
          <div className="officer-hero-content">
            <div className="officer-hero-eyebrow">
              <span className="hero-live-dot" />
              {department.toUpperCase()}
            </div>

            <h2>
              Good evening,{' '}
              <span>{officerName.split(' ')[0]}.</span>
            </h2>

            <p>
              Here is your departmental operations snapshot
              for today.
            </p>

            <div className="officer-hero-meta">
              <div className="hero-meta-item">
                <span className="hero-meta-icon">
                  <CalendarIcon />
                </span>

                <div>
                  <small>REPORTING DATE</small>
                  <strong>{reportingDate}</strong>
                </div>
              </div>

              <div className="hero-meta-divider" />

              <div className="hero-meta-item">
                <span className="hero-meta-icon">
                  <PulseIcon />
                </span>

                <div>
                  <small>WORKSPACE STATUS</small>
                  <strong className="status-online">
                    Operational
                  </strong>
                </div>
              </div>
            </div>
          </div>

          <div className="officer-hero-visual">
            <div className="hero-orbit hero-orbit-one" />
            <div className="hero-orbit hero-orbit-two" />

            <div className="hero-visual-core">
              <span>CP</span>
              <small>LIVE</small>
            </div>

            <div className="hero-floating-stat hero-floating-one">
              <span className="floating-stat-dot green" />
              <div>
                <strong>94.6%</strong>
                <small>SLA Health</small>
              </div>
            </div>

            <div className="hero-floating-stat hero-floating-two">
              <span className="floating-stat-dot blue" />
              <div>
                <strong>18</strong>
                <small>Resolved Today</small>
              </div>
            </div>
          </div>
        </section>

        {/* KPI CARDS */}
        <section className="officer-metrics">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className={`officer-metric officer-metric-${metric.tone}`}
            >
              <div className="metric-header">
                <span className="metric-label">
                  {metric.label}
                </span>

                <span className="metric-icon">
                  <MetricIcon type={metric.icon} />
                </span>
              </div>

              <div className="metric-value">
                {metric.value}
              </div>

              <div className="metric-footer">
                <span className="metric-change">
                  {metric.change}
                </span>

                <span className="metric-description">
                  {metric.description}
                </span>
              </div>

              <div className="metric-glow" />
            </article>
          ))}
        </section>

        {/* MAIN GRID */}
        <div className="officer-content-grid">
          {/* REQUESTS */}
          <section
            id="requests"
            className="officer-panel requests-panel"
          >
            <div className="panel-header">
              <div>
                <span className="panel-eyebrow">
                  SERVICE OPERATIONS
                </span>

                <h3>Recent Requests</h3>

                <p>
                  Latest requests assigned to your department.
                </p>
              </div>

              <button
                type="button"
                className="panel-action"
              >
                View all
                <ArrowRightIcon />
              </button>
            </div>

            <div className="request-table-wrapper">
              <table className="request-table">
                <thead>
                  <tr>
                    <th>REQUEST</th>
                    <th>CITIZEN</th>
                    <th>SERVICE</th>
                    <th>SUBMITTED</th>
                    <th>STATUS</th>
                  </tr>
                </thead>

                <tbody>
                  {requestRows.map((request) => (
                    <tr key={request.id}>
                      <td>
                        <div className="request-id">
                          <span className="request-id-icon">
                            <RequestIcon />
                          </span>

                          <strong>{request.id}</strong>
                        </div>
                      </td>

                      <td>
                        <div className="citizen-cell">
                          <span className="citizen-avatar">
                            {request.citizen
                              .split(' ')
                              .map((part) => part[0])
                              .join('')}
                          </span>

                          <span>{request.citizen}</span>
                        </div>
                      </td>

                      <td>
                        <span className="service-name">
                          {request.service}
                        </span>
                      </td>

                      <td>
                        <span className="submitted-date">
                          {request.submitted}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`status-pill status-${request.statusClass}`}
                        >
                          <span className="status-dot" />
                          {request.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* PERFORMANCE */}
          <section
            id="performance"
            className="officer-panel performance-panel"
          >
            <div className="panel-header">
              <div>
                <span className="panel-eyebrow">
                  PERFORMANCE
                </span>

                <h3>Resolution Rate</h3>

                <p>Current request completion.</p>
              </div>
            </div>

            <div className="resolution-section">
              <div
                className="resolution-ring"
                style={{
                  background: `conic-gradient(#4f46e5 ${
                    completionRate * 3.6
                  }deg, #e9ecf6 0deg)`,
                }}
              >
                <div className="resolution-ring-inner">
                  <strong>{completionRate}%</strong>
                  <span>resolved</span>
                </div>
              </div>

              <div className="resolution-copy">
                <div className="resolution-status">
                  <span className="status-dot status-dot-green" />
                  <strong>Healthy performance</strong>
                </div>

                <p>
                  Your department has resolved{' '}
                  <strong>18 of 24</strong> assigned
                  requests.
                </p>
              </div>
            </div>

            <div className="performance-stats">
              <div className="performance-stat">
                <span>Resolved</span>
                <strong>18</strong>
              </div>

              <div className="performance-stat">
                <span>Pending</span>
                <strong>06</strong>
              </div>

              <div className="performance-stat">
                <span>Total</span>
                <strong>24</strong>
              </div>
            </div>
          </section>
        </div>

        {/* GRIEVANCES */}
        <section
          id="grievances"
          className="officer-panel grievances-panel"
        >
          <div className="panel-header">
            <div>
              <span className="panel-eyebrow">
                CITIZEN FEEDBACK
              </span>

              <h3>Grievances Requiring Attention</h3>

              <p>
                Review citizen issues that require departmental
                action.
              </p>
            </div>

            <button
              type="button"
              className="panel-action"
            >
              Manage grievances
              <ArrowRightIcon />
            </button>
          </div>

          <div className="grievance-grid">
            {grievanceRows.map((grievance) => (
              <article
                className="grievance-card"
                key={grievance.id}
              >
                <div className="grievance-top">
                  <span className="grievance-id">
                    {grievance.id}
                  </span>

                  <span
                    className={`priority priority-${grievance.priority.toLowerCase()}`}
                  >
                    {grievance.priority}
                  </span>
                </div>

                <div className="grievance-icon">
                  <AlertIcon />
                </div>

                <h4>{grievance.subject}</h4>

                <div className="grievance-bottom">
                  <span>
                    Open for {grievance.age}
                  </span>

                  <button type="button">
                    Review
                    <ArrowRightIcon />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SLA + ACTIVITY */}
        <div className="lower-dashboard-grid">
          <section className="officer-panel sla-panel">
            <div className="panel-header">
              <div>
                <span className="panel-eyebrow">
                  SLA TRACKING
                </span>

                <h3>Service Level Health</h3>

                <p>
                  Department compliance across active requests.
                </p>
              </div>

              <span className="health-badge">
                <span />
                Healthy
              </span>
            </div>

            <div className="sla-overview">
              <div className="sla-main-number">
                <strong>94.6%</strong>
                <span>Overall compliance</span>
              </div>

              <div className="sla-bar">
                <div
                  className="sla-bar-fill"
                  style={{ width: '94.6%' }}
                />
              </div>

              <div className="sla-scale">
                <span>0%</span>
                <span>Target 90%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="sla-items">
              <div className="sla-item">
                <div>
                  <span className="sla-item-label">
                    Property Tax
                  </span>

                  <span className="sla-item-value">
                    97.2%
                  </span>
                </div>

                <div className="mini-progress">
                  <span style={{ width: '97.2%' }} />
                </div>
              </div>

              <div className="sla-item">
                <div>
                  <span className="sla-item-label">
                    Revenue Certificate
                  </span>

                  <span className="sla-item-value">
                    93.4%
                  </span>
                </div>

                <div className="mini-progress">
                  <span style={{ width: '93.4%' }} />
                </div>
              </div>

              <div className="sla-item">
                <div>
                  <span className="sla-item-label">
                    Water Connection
                  </span>

                  <span className="sla-item-value">
                    91.8%
                  </span>
                </div>

                <div className="mini-progress">
                  <span style={{ width: '91.8%' }} />
                </div>
              </div>
            </div>
          </section>

          <section className="officer-panel activity-panel">
            <div className="panel-header">
              <div>
                <span className="panel-eyebrow">
                  ACTIVITY
                </span>

                <h3>Recent Activity</h3>

                <p>Latest departmental events.</p>
              </div>

              <button
                type="button"
                className="activity-more"
                aria-label="More activity"
              >
                <MoreIcon />
              </button>
            </div>

            <div className="activity-list">
              {activityRows.map((activity) => (
                <div
                  className="activity-item"
                  key={activity.title}
                >
                  <div
                    className={`activity-icon activity-${activity.type}`}
                  >
                    {activity.type === 'resolved' && (
                      <CheckIcon />
                    )}

                    {activity.type === 'review' && (
                      <RequestIcon />
                    )}

                    {activity.type === 'grievance' && (
                      <AlertIcon />
                    )}

                    {activity.type === 'update' && (
                      <PulseIcon />
                    )}
                  </div>

                  <div className="activity-content">
                    <strong>{activity.title}</strong>
                    <span>{activity.description}</span>
                  </div>

                  <time>{activity.time}</time>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* QUICK ACTIONS */}
        <section
          id="services"
          className="officer-panel quick-actions-panel"
        >
          <div className="panel-header">
            <div>
              <span className="panel-eyebrow">
                QUICK ACTIONS
              </span>

              <h3>Department Operations</h3>

              <p>
                Common actions for your daily workflow.
              </p>
            </div>
          </div>

          <div className="quick-action-grid">
            <button
              type="button"
              className="quick-action"
            >
              <span className="quick-action-icon">
                <RequestIcon />
              </span>

              <span className="quick-action-content">
                <strong>New Request</strong>
                <small>
                  Register a service request
                </small>
              </span>

              <ArrowRightIcon />
            </button>

            <button
              type="button"
              className="quick-action"
            >
              <span className="quick-action-icon">
                <CheckIcon />
              </span>

              <span className="quick-action-content">
                <strong>Update Status</strong>
                <small>
                  Process assigned requests
                </small>
              </span>

              <ArrowRightIcon />
            </button>

            <button
              type="button"
              className="quick-action"
            >
              <span className="quick-action-icon">
                <PerformanceIcon />
              </span>

              <span className="quick-action-content">
                <strong>Performance Report</strong>
                <small>
                  Review departmental metrics
                </small>
              </span>

              <ArrowRightIcon />
            </button>
          </div>
        </section>
      </section>
    </DashboardShell>
  )
}

/* -------------------------------------------------------------------------- */
/* ICONS                                                                       */
/* -------------------------------------------------------------------------- */

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </svg>
  )
}

function RequestIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="3.5" width="14" height="17" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </svg>
  )
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4.5 20 19H4L12 4.5Z" />
      <path d="M12 9v4M12 16.5v.5" />
    </svg>
  )
}

function ServiceIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="7.5" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  )
}

function PerformanceIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 18V10M12 18V6M19 18V3" />
      <path d="M3.5 18.5h17" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="5.5" width="16" height="14" rx="2" />
      <path d="M8 3.5v4M16 3.5v4M4 9.5h16" />
    </svg>
  )
}

function PulseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 12h4l2-5 4 10 2-5h6" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12 4.5 4.5L19 7" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  )
}

function MoreIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
  )
}

function MetricIcon({
  type,
}: {
  type: Metric['icon']
}) {
  switch (type) {
    case 'requests':
      return <RequestIcon />

    case 'resolved':
      return <CheckIcon />

    case 'sla':
      return <PulseIcon />

    case 'grievance':
      return <AlertIcon />

    default:
      return <GridIcon />
  }
}