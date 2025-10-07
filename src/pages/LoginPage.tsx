import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AUTH_USER = 'admin'
const AUTH_PASS = 'admin123'

export default function LoginPage() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const navigate = useNavigate()

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (user === AUTH_USER && pass === AUTH_PASS) {
      // simpan auth flag
      localStorage.setItem('bfs_auth', 'true')
      navigate('/')
    } else {
      alert('Username atau password salah!')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-slate-800 to-slate-900">
      <form onSubmit={submit} className="w-full max-w-md bg-slate-800 text-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-amber-400">Login - PT Dummy Sejahtera</h2>
        <label className="block mb-4">
          <span className="text-sm">Username</span>
          <input
            className="mt-1 block w-full border border-slate-600 rounded p-2 bg-slate-700 text-white"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </label>
        <label className="block mb-6">
          <span className="text-sm">Password</span>
          <input
            type="password"
            className="mt-1 block w-full border border-slate-600 rounded p-2 bg-slate-700 text-white"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="w-full bg-amber-400 text-black font-semibold p-2 rounded hover:scale-105 transition"
        >
          Login
        </button>
      </form>
    </div>
  )
}
