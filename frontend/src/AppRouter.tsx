import { Navigate, Route, Routes } from 'react-router-dom'

import App from './App'

import Welcome from './auth/Welcome'
import Login from './auth/Login'
import Register from './auth/Register'
import Unauthorized from './auth/Unauthorized'
import ProtectedRoute from './auth/ProtectedRoute'

import OfficerDashboard from './dashboards/OfficerDashboard'
import CitizenDashboard from './dashboards/CitizenDashboard'

export default function AppRouter() {
  return (
    <Routes>
      {/* ================================================================
          PUBLIC ROUTES
          ================================================================ */}

      <Route
        path="/"
        element={<Navigate to="/welcome" replace />}
      />

      <Route
        path="/welcome"
        element={<Welcome />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/unauthorized"
        element={<Unauthorized />}
      />

      {/* ================================================================
          ADMIN WORKSPACE
          ================================================================ */}

      <Route
        element={
          <ProtectedRoute allowedRoles={['ADMIN']} />
        }
      >
        <Route
          path="/admin/dashboard"
          element={<App />}
        />
      </Route>

      {/* ================================================================
          OFFICER WORKSPACE
          ================================================================ */}

      <Route
        element={
          <ProtectedRoute allowedRoles={['OFFICER']} />
        }
      >
        <Route
          path="/officer/dashboard"
          element={<OfficerDashboard />}
        />
      </Route>

      {/* ================================================================
          CITIZEN WORKSPACE
          ================================================================ */}

      <Route
        element={
          <ProtectedRoute allowedRoles={['CITIZEN']} />
        }
      >
        <Route
          path="/citizen/dashboard"
          element={<CitizenDashboard />}
        />
      </Route>

      {/* ================================================================
          UNKNOWN ROUTES
          ================================================================ */}

      <Route
        path="*"
        element={<Navigate to="/welcome" replace />}
      />
    </Routes>
  )
}