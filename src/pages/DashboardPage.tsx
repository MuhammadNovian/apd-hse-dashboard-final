import React, { useEffect, useState } from 'react'
import { loadApd, saveApd, loadObat, saveObat } from '../utils/storage'
import { exportApdExcel, exportApdPDF, exportObatExcel, exportObatPDF } from '../utils/export'
import { Submission, ObatRecord } from '../types'
import { Link, useNavigate } from 'react-router-dom'

export default function DashboardPage(){
  const [apd, setApd] = useState<Submission[]>(() => loadApd())
  const [obat, setObat] = useState<ObatRecord[]>(() => loadObat())
  const [totalApd, setTotalApd] = useState(0)
  const [totalObat, setTotalObat] = useState(0)
  const navigate = useNavigate()

  useEffect(()=>{
    if(!localStorage.getItem('bfs_auth')) navigate('/login')
  },[])

  // seed dummy data if empty (only once)
  useEffect(()=>{
    let changed = false
    if(loadApd().length === 0){
      const sampleApd: Submission[] = [
        { id: 'a1', tanggal: new Date().toISOString().slice(0,10), nama: 'Andi', nik: '1001', divisi: 'TUNGKU', apd: 'helm', jumlah: 1, fotoDataUrl: undefined, createdAt: new Date().toISOString() },
        { id: 'a2', tanggal: new Date().toISOString().slice(0,10), nama: 'Budi', nik: '1002', divisi: 'CCM', apd: 'kacamata-las', jumlah: 2, fotoDataUrl: undefined, createdAt: new Date().toISOString() },
        { id: 'a3', tanggal: new Date().toISOString().slice(0,10), nama: 'Cici', nik: '1003', divisi: 'OHC', apd: 'sepatu-pendek', jumlah: 1, fotoDataUrl: undefined, createdAt: new Date().toISOString() }
      ]
      saveApd(sampleApd)
      setApd(sampleApd)
      changed = true
    }
    if(loadObat().length === 0){
      const sampleObat: ObatRecord[] = [
        { id: 'o1', tanggal: new Date().toISOString().slice(0,10), nama: 'Dedi', nik: '2001', jabatan: 'Operator', departemen: 'Produksi', perusahaan: 'PT Dummy Sejahtera', keluhan: 'Pusing', obat: 'Paracetamol', diagnosa: 'Sakit Kepala', keterangan: '', createdAt: new Date().toISOString() },
        { id: 'o2', tanggal: new Date().toISOString().slice(0,10), nama: 'Eka', nik: '2002', jabatan: 'Teknisi', departemen: 'Perawatan', perusahaan: 'PT Dummy Sejahtera', keluhan: 'Batuk', obat: 'Obat Batuk', diagnosa: 'Batuk', keterangan: '', createdAt: new Date().toISOString() }
      ]
      saveObat(sampleObat)
      setObat(sampleObat)
      changed = true
    }
    if(changed){
      // reload totals below
    }
  },[])

  useEffect(()=>{
    const t = apd.reduce((s,a)=>s+a.jumlah,0)
    setTotalApd(t)
    saveApd(apd)
  },[apd])

  useEffect(()=>{
    const t = obat.length
    setTotalObat(t)
    saveObat(obat)
  },[obat])

  function handleLogout(){
    localStorage.removeItem('bfs_auth')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header image */}
      <div className="w-full">
        <img src="/Gambar Header.jpg" alt="header" className="w-full h-32 md:h-48 lg:h-64 object-cover" />
      </div>

      <nav className="bg-gray-800 border-t border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-lg font-semibold">Dashboard PT Dummy Sejahtera</div>
          <div className="flex items-center gap-3">
            <Link to="/" className="px-3 py-2 border border-amber-400 text-amber-300 rounded hover:bg-amber-500 hover:text-white transition">Dashboard</Link>
            <Link to="/apd" className="px-3 py-2 border border-amber-400 text-amber-300 rounded hover:bg-amber-500 hover:text-white transition">Form Pengambilan APD</Link>
            <Link to="/obat" className="px-3 py-2 border border-amber-400 text-amber-300 rounded hover:bg-amber-500 hover:text-white transition">Form Pengambilan Obat</Link>
            <button onClick={handleLogout} className="px-3 py-2 bg-amber-400 text-black rounded ml-4">Logout</button>
          </div>
        </div>
      </nav>

      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="card text-slate-800">Total Pengambilan APD: <div className="text-2xl font-bold">{totalApd}</div></div>
          <div className="card text-slate-800">Total Pengambilan Obat: <div className="text-2xl font-bold">{totalObat}</div></div>
          <div className="card text-slate-800">Export:
            <div className="mt-2 space-x-2">
              <button onClick={()=>exportApdExcel(apd)} className="px-3 py-1 bg-green-600 text-white rounded">Excel APD</button>
              <button onClick={()=>exportApdPDF(apd)} className="px-3 py-1 bg-red-600 text-white rounded">PDF APD</button>
              <button onClick={()=>exportObatExcel(obat)} className="px-3 py-1 bg-green-700 text-white rounded">Excel Obat</button>
              <button onClick={()=>exportObatPDF(obat)} className="px-3 py-1 bg-red-700 text-white rounded">PDF Obat</button>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="font-semibold mb-3">Riwayat APD</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm">
              <thead className="text-left"><tr><th className="px-2 py-1">Tanggal</th><th className="px-2 py-1">Nama</th><th className="px-2 py-1">NIK</th><th className="px-2 py-1">Divisi</th><th className="px-2 py-1">APD</th><th className="px-2 py-1">Jumlah</th><th className="px-2 py-1">Foto</th></tr></thead>
              <tbody>
                {apd.map(r=> (
                  <tr key={r.id} className="border-t even:bg-slate-100">
                    <td className="px-2 py-1 text-slate-800">{r.tanggal}</td>
                    <td className="px-2 py-1 text-slate-800">{r.nama}</td>
                    <td className="px-2 py-1 text-slate-800">{r.nik}</td>
                    <td className="px-2 py-1 text-slate-800">{r.divisi}</td>
                    <td className="px-2 py-1 text-slate-800">{r.apd}</td>
                    <td className="px-2 py-1 text-slate-800">{r.jumlah}</td>
                    <td className="px-2 py-1 text-slate-800">{r.fotoDataUrl ? <img src={r.fotoDataUrl} className="w-16 h-12 object-cover" alt="foto"/> : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 card">
          <h2 className="font-semibold mb-3">Riwayat Obat</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm">
              <thead className="text-left"><tr><th className="px-2 py-1">Tanggal</th><th className="px-2 py-1">Nama</th><th className="px-2 py-1">NIK</th><th className="px-2 py-1">Jabatan</th><th className="px-2 py-1">Departemen</th><th className="px-2 py-1">Perusahaan</th><th className="px-2 py-1">Obat</th></tr></thead>
              <tbody>
                {obat.map(r=> (
                  <tr key={r.id} className="border-t even:bg-slate-100">
                    <td className="px-2 py-1 text-slate-800">{r.tanggal}</td>
                    <td className="px-2 py-1 text-slate-800">{r.nama}</td>
                    <td className="px-2 py-1 text-slate-800">{r.nik}</td>
                    <td className="px-2 py-1 text-slate-800">{r.jabatan}</td>
                    <td className="px-2 py-1 text-slate-800">{r.departemen}</td>
                    <td className="px-2 py-1 text-slate-800">{r.perusahaan}</td>
                    <td className="px-2 py-1 text-slate-800">{r.obat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
