import { useMemo } from 'react'
import DashboardShell from '../layouts/DashboardShell'
import { useAuth } from '../auth/AuthContext'
import './CitizenDashboard.css'

type Application = {
  id: string
  service: string
  department: string
  submitted: string
  status: 'In Review' | 'Pending' | 'Completed'
  progress: number
}

type Service = {
  name: string
  description: string
  category: string
  eta: string
  icon: 'property' | 'certificate' | 'water' | 'document'
}

type Notification = {
  title: string
  description: string
  time: string
  type: 'success' | 'info' | 'warning'
}

const applications: Application[] = [
  {
    id: 'REQ-1028',
    service: 'Property Tax Assessment',
    department: 'Revenue Department',
    submitted: '02 Oct 2026',
    status: 'In Review',
    progress: 65,
  },
  {
    id: 'REQ-1024',
    service: 'Water Connection',
    department: 'Water & Utilities',
    submitted: '01 Oct 2026',
    status: 'Pending',
    progress: 30,
  },
  {
    id: 'REQ-1019',
    service: 'Revenue Certificate',
    department: 'Revenue Department',
    submitted: '28 Sep 2026',
    status: 'Completed',
    progress: 100,
  },
]

const services: Service[] = [
  {
    name: 'Property Tax',
    description:
      'View assessment and submit property tax services.',
    category: 'Revenue',
    eta: '3–5 working days',
    icon: 'property',
  },
  {
    name: 'Revenue Certificate',
    description:
      'Apply for eligible revenue and income certificates.',
    category: 'Certificates',
    eta: '2–4 working days',
    icon: 'certificate',
  },
  {
    name: 'Water Connection',
    description:
      'Request a new water connection or related service.',
    category: 'Utilities',
    eta: '5–7 working days',
    icon: 'water',
  },
  {
    name: 'Document Services',
    description:
      'Request eligible civic documents and certificates.',
    category: 'Citizen Services',
    eta: '2–5 working days',
    icon: 'document',
  },
]

const notifications: Notification[] = [
  {
    title: 'Application moved to review',
    description:
      'REQ-1028 is now being reviewed by the Revenue Department.',
    time: '18 min ago',
    type: 'info',
  },
  {
    title: 'Revenue Certificate completed',
    description:
      'Your certificate request REQ-1019 has been completed.',
    time: '2 hrs ago',
    type: 'success',
  },
  {
    title: 'Document verification required',
    description:
      'Additional information may be required for REQ-1024.',
    time: 'Yesterday',
    type: 'warning',
  },
]

const grievance = {
  id: 'GRV-204',
  subject: 'Delayed certificate processing',
  department: 'Revenue Department',
  status: 'Under Review',
  submitted: '30 Sep 2026',
}

export default function CitizenDashboard() {
  const { user } = useAuth()

  const stats = useMemo(
    () => ({
      applications: applications.length,

      pending: applications.filter(
        (application) =>
          application.status !== 'Completed',
      ).length,

      completed: applications.filter(
        (application) =>
          application.status === 'Completed',
      ).length,

      grievances: 1,
    }),
    [],
  )

  const citizenName = user?.name || 'Citizen'

  return (
    <DashboardShell
      title="Citizen Dashboard"
      subtitle="Access public services, track applications and stay informed about your civic requests."
      navigation={
        <>
          <a
            href="#overview"
            className="dashboard-nav-item active"
          >
            <span className="citizen-nav-icon">
              <GridIcon />
            </span>

            <span>Overview</span>
          </a>

          <a
            href="#applications"
            className="dashboard-nav-item"
          >
            <span className="citizen-nav-icon">
              <ApplicationIcon />
            </span>

            <span>My Applications</span>
          </a>

          <a
            href="#services"
            className="dashboard-nav-item"
          >
            <span className="citizen-nav-icon">
              <ServiceIcon />
            </span>

            <span>Services</span>
          </a>

          <a
            href="#grievances"
            className="dashboard-nav-item"
          >
            <span className="citizen-nav-icon">
              <GrievanceIcon />
            </span>

            <span>Grievances</span>
          </a>

          <a
            href="#notifications"
            className="dashboard-nav-item"
          >
            <span className="citizen-nav-icon">
              <BellIcon />
            </span>

            <span>Notifications</span>
          </a>
        </>
      }
    >
      <section
        className="citizen-dashboard"
        id="overview"
      >
        {/* ================================================================
            WELCOME HERO
            ================================================================ */}

        <section className="citizen-hero">
          <div className="citizen-hero-content">
            <span className="citizen-eyebrow">
              CITIZEN SERVICE CENTER
            </span>

            <h2>
              Welcome back,{' '}
              <span>
                {citizenName.split(' ')[0]}.
              </span>
            </h2>

            <p>
              Manage your government services,
              applications and grievances from one
              secure civic workspace.
            </p>

            <div className="citizen-hero-actions">
              <button
                type="button"
                className="citizen-primary-action"
              >
                <PlusIcon />
                Apply for a Service
              </button>

              <button
                type="button"
                className="citizen-secondary-action"
              >
                Track an Application
                <ArrowRightIcon />
              </button>
            </div>
          </div>

          <div className="citizen-hero-visual">
            <div className="citizen-visual-glow" />

            <div className="citizen-visual-ring ring-one" />

            <div className="citizen-visual-ring ring-two" />

            <div className="citizen-visual-core">
              <span>CP</span>
              <small>CITIZEN</small>
            </div>

            <div className="citizen-floating-card floating-card-top">
              <CheckIcon />

              <div>
                <strong>24/7</strong>
                <span>Digital Access</span>
              </div>
            </div>

            <div className="citizen-floating-card floating-card-bottom">
              <TrackIcon />

              <div>
                <strong>LIVE</strong>
                <span>Status Tracking</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            STATISTICS
            ================================================================ */}

        <section className="citizen-stats">
          <article className="citizen-stat-card stat-blue">
            <div className="citizen-stat-top">
              <span>MY APPLICATIONS</span>

              <span className="citizen-stat-icon">
                <ApplicationIcon />
              </span>
            </div>

            <strong>{stats.applications}</strong>

            <span>
              Total service applications
            </span>
          </article>

          <article className="citizen-stat-card stat-amber">
            <div className="citizen-stat-top">
              <span>IN PROGRESS</span>

              <span className="citizen-stat-icon">
                <ClockIcon />
              </span>
            </div>

            <strong>{stats.pending}</strong>

            <span>
              Applications awaiting action
            </span>
          </article>

          <article className="citizen-stat-card stat-green">
            <div className="citizen-stat-top">
              <span>COMPLETED</span>

              <span className="citizen-stat-icon">
                <CheckIcon />
              </span>
            </div>

            <strong>{stats.completed}</strong>

            <span>
              Successfully completed services
            </span>
          </article>

          <article className="citizen-stat-card stat-rose">
            <div className="citizen-stat-top">
              <span>GRIEVANCES</span>

              <span className="citizen-stat-icon">
                <GrievanceIcon />
              </span>
            </div>

            <strong>{stats.grievances}</strong>

            <span>
              Active grievance cases
            </span>
          </article>
        </section>

        {/* ================================================================
            APPLICATIONS + CURRENT STATUS
            ================================================================ */}

        <div className="citizen-main-grid">
          <section
            id="applications"
            className="citizen-panel applications-panel"
          >
            <div className="citizen-panel-header">
              <div>
                <span className="citizen-panel-eyebrow">
                  SERVICE TRACKING
                </span>

                <h3>My Applications</h3>

                <p>
                  Track the latest requests submitted
                  through CivicPulse.
                </p>
              </div>

              <button
                type="button"
                className="citizen-panel-action"
              >
                View all
                <ArrowRightIcon />
              </button>
            </div>

            <div className="application-list">
              {applications.map((application) => (
                <article
                  className="application-item"
                  key={application.id}
                >
                  <div className="application-main">
                    <div className="application-icon">
                      <ApplicationIcon />
                    </div>

                    <div className="application-info">
                      <div className="application-title-row">
                        <strong>
                          {application.service}
                        </strong>

                        <span
                          className={`application-status application-status-${application.status
                            .toLowerCase()
                            .replace(/\s+/g, '-')}`}
                        >
                          <span />
                          {application.status}
                        </span>
                      </div>

                      <p>
                        {application.id} ·{' '}
                        {application.department}
                      </p>

                      <div className="application-progress">
                        <div className="application-progress-track">
                          <span
                            style={{
                              width: `${application.progress}%`,
                            }}
                          />
                        </div>

                        <span>
                          {application.progress}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="application-date">
                    <small>SUBMITTED</small>

                    <strong>
                      {application.submitted}
                    </strong>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="citizen-panel status-panel">
            <div className="citizen-panel-header">
              <div>
                <span className="citizen-panel-eyebrow">
                  SERVICE STATUS
                </span>

                <h3>Current Request</h3>
              </div>
            </div>

            <div className="status-request">
              <div className="status-request-top">
                <div>
                  <span className="status-request-id">
                    REQ-1028
                  </span>

                  <strong>
                    Property Tax Assessment
                  </strong>
                </div>

                <span className="status-active">
                  Active
                </span>
              </div>

              <div className="status-timeline">
                <div className="timeline-step completed">
                  <span>
                    <CheckIcon />
                  </span>

                  <div>
                    <strong>Submitted</strong>
                    <small>
                      02 Oct · 09:42 AM
                    </small>
                  </div>
                </div>

                <div className="timeline-line completed" />

                <div className="timeline-step completed">
                  <span>
                    <CheckIcon />
                  </span>

                  <div>
                    <strong>
                      Documents verified
                    </strong>

                    <small>
                      02 Oct · 11:10 AM
                    </small>
                  </div>
                </div>

                <div className="timeline-line active" />

                <div className="timeline-step active">
                  <span>
                    <ClockIcon />
                  </span>

                  <div>
                    <strong>
                      Department review
                    </strong>

                    <small>
                      Currently processing
                    </small>
                  </div>
                </div>

                <div className="timeline-line" />

                <div className="timeline-step">
                  <span>
                    <CheckIcon />
                  </span>

                  <div>
                    <strong>Completed</strong>

                    <small>
                      Awaiting department action
                    </small>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="track-details-button"
              >
                View application details
                <ArrowRightIcon />
              </button>
            </div>
          </section>
        </div>

        {/* ================================================================
            GOVERNMENT SERVICES
            ================================================================ */}

        <section
          id="services"
          className="citizen-panel services-panel"
        >
          <div className="citizen-panel-header">
            <div>
              <span className="citizen-panel-eyebrow">
                GOVERNMENT SERVICES
              </span>

              <h3>Explore Services</h3>

              <p>
                Start a new application or access an
                available civic service.
              </p>
            </div>

            <button
              type="button"
              className="citizen-panel-action"
            >
              Browse all
              <ArrowRightIcon />
            </button>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <article
                className="service-card"
                key={service.name}
              >
                <div className="service-card-top">
                  <span className="service-card-icon">
                    <ServiceCardIcon
                      type={service.icon}
                    />
                  </span>

                  <span className="service-category">
                    {service.category}
                  </span>
                </div>

                <h4>{service.name}</h4>

                <p>{service.description}</p>

                <div className="service-card-bottom">
                  <span>
                    <ClockIcon />
                    {service.eta}
                  </span>

                  <button
                    type="button"
                    aria-label={`Apply for ${service.name}`}
                  >
                    <ArrowRightIcon />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ================================================================
            GRIEVANCE + NOTIFICATIONS
            ================================================================ */}

        <div className="citizen-bottom-grid">
          <section
            id="grievances"
            className="citizen-panel grievance-panel"
          >
            <div className="citizen-panel-header">
              <div>
                <span className="citizen-panel-eyebrow">
                  CITIZEN SUPPORT
                </span>

                <h3>My Grievance</h3>

                <p>
                  Monitor an issue submitted to a
                  government department.
                </p>
              </div>

              <button
                type="button"
                className="citizen-panel-action"
              >
                View all
                <ArrowRightIcon />
              </button>
            </div>

            <div className="grievance-content">
              <div className="grievance-heading">
                <div className="grievance-main-icon">
                  <GrievanceIcon />
                </div>

                <div>
                  <span>{grievance.id}</span>

                  <strong>
                    {grievance.subject}
                  </strong>
                </div>

                <span className="grievance-status">
                  {grievance.status}
                </span>
              </div>

              <div className="grievance-details">
                <div>
                  <small>DEPARTMENT</small>

                  <strong>
                    {grievance.department}
                  </strong>
                </div>

                <div>
                  <small>SUBMITTED</small>

                  <strong>
                    {grievance.submitted}
                  </strong>
                </div>
              </div>

              <div className="grievance-progress">
                <div className="grievance-progress-top">
                  <span>
                    Resolution progress
                  </span>

                  <strong>60%</strong>
                </div>

                <div className="grievance-progress-track">
                  <span />
                </div>
              </div>

              <button
                type="button"
                className="grievance-review-button"
              >
                View grievance details
                <ArrowRightIcon />
              </button>
            </div>

            <button
              type="button"
              className="new-grievance-button"
            >
              <PlusIcon />
              Submit a New Grievance
            </button>
          </section>

          <section
            id="notifications"
            className="citizen-panel notifications-panel"
          >
            <div className="citizen-panel-header">
              <div>
                <span className="citizen-panel-eyebrow">
                  UPDATES
                </span>

                <h3>Recent Notifications</h3>

                <p>
                  Important updates about your services.
                </p>
              </div>

              <span className="notification-count">
                {notifications.length}
              </span>
            </div>

            <div className="notification-list">
              {notifications.map((notification) => (
                <article
                  className="citizen-notification"
                  key={notification.title}
                >
                  <span
                    className={`notification-icon notification-${notification.type}`}
                  >
                    {notification.type ===
                      'success' && <CheckIcon />}

                    {notification.type ===
                      'info' && <BellIcon />}

                    {notification.type ===
                      'warning' && <AlertIcon />}
                  </span>

                  <div>
                    <strong>
                      {notification.title}
                    </strong>

                    <p>
                      {notification.description}
                    </p>

                    <small>
                      {notification.time}
                    </small>
                  </div>
                </article>
              ))}
            </div>

            <button
              type="button"
              className="notifications-footer-button"
            >
              View all notifications
              <ArrowRightIcon />
            </button>
          </section>
        </div>

        {/* ================================================================
            HELP
            ================================================================ */}

        <section className="citizen-help-strip">
          <div className="help-icon">
            <HelpIcon />
          </div>

          <div>
            <strong>
              Need help with a government service?
            </strong>

            <span>
              Find service guidance, support information
              and assistance for your applications.
            </span>
          </div>

          <button type="button">
            Visit Help Center
            <ArrowRightIcon />
          </button>
        </section>
      </section>
    </DashboardShell>
  )
}

/* ==========================================================================
   ICONS
   ========================================================================== */

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect
        x="4"
        y="4"
        width="6"
        height="6"
        rx="1"
      />
      <rect
        x="14"
        y="4"
        width="6"
        height="6"
        rx="1"
      />
      <rect
        x="4"
        y="14"
        width="6"
        height="6"
        rx="1"
      />
      <rect
        x="14"
        y="14"
        width="6"
        height="6"
        rx="1"
      />
    </svg>
  )
}

function ApplicationIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect
        x="5"
        y="3.5"
        width="14"
        height="17"
        rx="2"
      />

      <path d="M9 8h6M9 12h6M9 16h4" />
    </svg>
  )
}

function ServiceIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r="7.5"
      />

      <path d="M12 8v8M8 12h8" />
    </svg>
  )
}

function GrievanceIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M12 4.5 20 19H4L12 4.5Z" />

      <path d="M12 9v4M12 16.5v.5" />
    </svg>
  )
}

/* ========================================================================
   FIXED: ALERT ICON
   ======================================================================== */

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M12 4.5 20 19H4L12 4.5Z" />

      <path d="M12 9v4M12 16.5v.5" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M6.5 16.5h11l-1.5-2v-4a4 4 0 0 0-8 0v4l-1.5 2Z" />

      <path d="M10 19h4" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="m5 12 4.5 4.5L19 7" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r="8"
      />

      <path d="M12 7v5l3 2" />
    </svg>
  )
}

function TrackIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M5 6h14M5 12h10M5 18h14" />

      <circle
        cx="17"
        cy="12"
        r="2"
      />
    </svg>
  )
}

function HelpIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r="8"
      />

      <path d="M9.8 9a2.3 2.3 0 1 1 3.8 1.7c-1 .8-1.6 1.2-1.6 2.5" />

      <path d="M12 16.5v.5" />
    </svg>
  )
}

function ServiceCardIcon({
  type,
}: {
  type: Service['icon']
}) {
  switch (type) {
    case 'property':
      return <PropertyIcon />

    case 'certificate':
      return <CertificateIcon />

    case 'water':
      return <WaterIcon />

    case 'document':
      return <DocumentIcon />

    default:
      return <ServiceIcon />
  }
}

function PropertyIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M4 10 12 4l8 6v9H4v-9Z" />

      <path d="M9 19v-5h6v5" />
    </svg>
  )
}

function CertificateIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect
        x="5"
        y="4"
        width="14"
        height="16"
        rx="2"
      />

      <path d="M9 8h6M9 12h6" />

      <circle
        cx="12"
        cy="16"
        r="1.5"
      />
    </svg>
  )
}

function WaterIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M12 4s5 5.2 5 9a5 5 0 0 1-10 0c0-3.8 5-9 5-9Z" />

      <path d="M10 14c.3 1 1 1.7 2 2" />
    </svg>
  )
}

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M7 3.5h7l4 4V20H7V3.5Z" />

      <path d="M14 3.5V8h4M10 12h5M10 15h5" />
    </svg>
  )
}