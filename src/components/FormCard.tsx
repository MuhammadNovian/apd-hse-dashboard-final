import React from 'react'
import { motion } from 'framer-motion'

type Props = {
  title: string
  children: React.ReactNode
  onBack?: () => void
  onSubmitLabel?: string
}

export default function FormCard({ title, children, onBack, onSubmitLabel }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="max-w-3xl mx-auto p-6 bg-slate-800 rounded-2xl shadow-lg text-white mt-8">
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
      </header>
      <div className="space-y-4">{children}</div>
      <div className="mt-6 flex items-center justify-between">
        <div>
          {onBack && <button onClick={onBack} className="px-4 py-2 bg-gray-600 text-white rounded">Kembali ke Dashboard</button>}
        </div>
      </div>
    </motion.div>
  )
}
