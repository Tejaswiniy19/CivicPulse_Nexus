# CivicPulse Nexus — Six Phase Implementation Map

## Phase 1 — Executive Dashboard
- Four KPI cards: citizen satisfaction, SLA compliance, revenue, budget utilization.
- Service performance trend.
- Grievance pulse.
- Department performance table.
- Budget utilization.
- Revenue trend.
- Governance snapshot.
- Compliance posture.

## Phase 2 — Analytics
- Department-level SLA calculations.
- Citizen feedback average.
- Request workload and resolution counts.
- Grievance counts.
- Revenue aggregation.
- Budget allocation/utilization.
- Database-backed analytics endpoint: `GET /api/dashboard/overview`.

## Phase 3 — Reporting
- Citizen Satisfaction Report.
- Service Performance Report.
- Grievance Report.
- Revenue Report.
- Department Performance Report.
- Budget Utilization Report.
- Compliance Audit Report.
- CSV export from the reporting UI.
- Browser print/Save as PDF workflow.

## Phase 4 — Audit & Compliance
- Audit log entity.
- Actor/action/module/entity reference/timestamp/outcome fields.
- Seeded audit records.
- Dedicated Audit Trail UI.
- Compliance coverage status.

## Phase 5 — Backend & Data
- Spring Boot REST API.
- PostgreSQL persistence.
- JPA repositories/entities.
- Data seeding for an immediately demonstrable system.
- CRUD endpoints for service requests and grievances.
- Citizen/department/revenue/audit endpoints.
- CORS configuration.
- Environment-based database configuration.

## Phase 6 — UX
- Responsive executive layout.
- Collapsible-style compact navigation on smaller screens.
- Search toolbars.
- Status and priority badges.
- Create service request form.
- Register grievance form.
- Empty/fallback states.
- Toast feedback.
- Print/export actions.
- Mobile/tablet responsive grids.

## Validation checklist

1. Start PostgreSQL.
2. Start Spring Boot on port 8081.
3. Verify `GET /api/health`.
4. Verify `GET /api/dashboard/overview`.
5. Start Vite on port 5173.
6. Create a service request.
7. Create a grievance.
8. Refresh the dashboard and confirm database-backed values.
9. Export a report as CSV.
10. Open the Audit Trail and confirm seeded activity.
