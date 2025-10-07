import React, { useState, useEffect } from 'react'
import { loadObat, saveObat } from '../utils/storage'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import FormCard from '../components/FormCard'

export default function FormObatPage(){
  const navigate = useNavigate()
  useEffect(()=>{ if(!localStorage.getItem('bfs_auth')) navigate('/login') },[])

  const [tanggal,setTanggal] = useState(new Date().toISOString().slice(0,10))
  const [nama,setNama] = useState('')
  const [nik,setNik] = useState('')
  const [jabatan,setJabatan] = useState('')
  const [departemen,setDepartemen] = useState('')
  const [perusahaan,setPerusahaan] = useState('PT Dummy Sejahtera')
  const [keluhan,setKeluhan] = useState('')
  const [obat,setObat] = useState('')
  const [diagnosa,setDiagnosa] = useState('')
  const [keterangan,setKeterangan] = useState('')

  function submit(e:React.FormEvent){
    e.preventDefault()
    const rec = { id: uuidv4(), tanggal,nama,nik,jabatan,departemen,perusahaan,keluhan,obat,diagnosa,keterangan, createdAt: new Date().toISOString() }
    const prev = loadObat(); prev.unshift(rec); saveObat(prev); alert('Tersimpan');
  }

  return (
    <FormCard title="Form Pengambilan Obat" onBack={()=>navigate('/') }>
      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block">Tanggal
          <input type="date" value={tanggal} onChange={e=>setTanggal(e.target.value)} className="mt-1 block w-full border rounded p-2 bg-slate-700 text-white" required/></label>
        <label className="block">Nama
          <input value={nama} onChange={e=>setNama(e.target.value)} className="mt-1 block w-full border rounded p-2 bg-slate-700 text-white" required/></label>
        <label className="block">NIK
          <input value={nik} onChange={e=>setNik(e.target.value)} className="mt-1 block w-full border rounded p-2 bg-slate-700 text-white" required/></label>
        <label className="block">Jabatan
          <input value={jabatan} onChange={e=>setJabatan(e.target.value)} className="mt-1 block w-full border rounded p-2 bg-slate-700 text-white" required/></label>
        <label className="block">Departemen
          <input value={departemen} onChange={e=>setDepartemen(e.target.value)} className="mt-1 block w-full border rounded p-2 bg-slate-700 text-white" required/></label>
        <label className="block">Perusahaan
          <input value={perusahaan} onChange={e=>setPerusahaan(e.target.value)} className="mt-1 block w-full border rounded p-2 bg-slate-700 text-white" required/></label>
        <label className="block">Keluhan
          <input value={keluhan} onChange={e=>setKeluhan(e.target.value)} className="mt-1 block w-full border rounded p-2 bg-slate-700 text-white" required/></label>
        <label className="block">Obat
          <input value={obat} onChange={e=>setObat(e.target.value)} className="mt-1 block w-full border rounded p-2 bg-slate-700 text-white" required/></label>
        <label className="block">Diagnosa
          <input value={diagnosa} onChange={e=>setDiagnosa(e.target.value)} className="mt-1 block w-full border rounded p-2 bg-slate-700 text-white" required/></label>
        <label className="block md:col-span-2">Keterangan
          <input value={keterangan} onChange={e=>setKeterangan(e.target.value)} className="mt-1 block w-full border rounded p-2 bg-slate-700 text-white"/></label>
        <div className="md:col-span-2 flex justify-end">
          <button type="submit" className="px-6 py-2 bg-amber-400 text-black rounded hover:scale-105 transition">Simpan</button>
        </div>
      </form>
    </FormCard>
  )
}
