import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import FormAPDPage from './pages/FormAPDPage'
import FormObatPage from './pages/FormObatPage'

export default function App() {
  const location = useLocation()
  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/" element={<DashboardPage/>} />
          <Route path="/apd" element={<FormAPDPage/>} />
          <Route path="/obat" element={<FormObatPage/>} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}
