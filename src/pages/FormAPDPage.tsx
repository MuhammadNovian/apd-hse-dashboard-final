import React, { useEffect, useRef, useState } from 'react'
import { APDOption, Submission, DivisionKey } from '../types'
import { loadApd, saveApd } from '../utils/storage'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import FormCard from '../components/FormCard'

const APD_OPTIONS: Record<DivisionKey, APDOption[]> = {
  TUNGKU: [{value:'helm',label:'Helm'},{value:'face-shield',label:'Face Shield'},{value:'sarung-tangan-kanvas',label:'Sarung Tangan Kanvas'},{value:'sepatu-pendek',label:'Sepatu Pendek'},{value:'baju',label:'Baju'}],
  CCM: [{value:'kacamata-las',label:'Kacamata Las'},{value:'face-shield',label:'Face Shield'},{value:'helm',label:'Helm'},{value:'baju',label:'Baju'}],
  MEKANIK_CCM:[{value:'helm',label:'Helm'},{value:'sepatu-pendek',label:'Sepatu Pendek'}],
  OHC:[{value:'helm',label:'Helm'}],
  SCRUP:[{value:'helm',label:'Helm'}],
  OPERATOR_OHC:[{value:'helm',label:'Helm'}],
  ELECTRIC:[{value:'helm',label:'Helm'}],
  CLEANING_UMUM:[{value:'sepatu-pendek',label:'Sepatu Pendek'}],
  MEKANIK_TUNGKU:[{value:'helm',label:'Helm'}],
  SERVICE_TUNGKU:[{value:'helm',label:'Helm'}]
}

export default function FormAPDPage(){
  const navigate = useNavigate()
  useEffect(()=>{ if(!localStorage.getItem('bfs_auth')) navigate('/login') },[])

  const [tanggal,setTanggal] = useState (() => new Date().toISOString().slice(0,10))
  const [nama,setNama] = useState('')
  const [nik,setNik] = useState('')
  const [divisi,setDivisi] = useState<DivisionKey | ''>('')
  const [apd,setApd] = useState('')
  const [jumlah,setJumlah] = useState(1)
  const [fotoFile,setFotoFile] = useState<File | null>(null)
  const [fotoPreview,setFotoPreview] = useState<string | undefined>(undefined)
  const fileRef = useRef<HTMLInputElement|null>(null)

  function reset(){ setNama(''); setNik(''); setDivisi(''); setApd(''); setJumlah(1); setFotoFile(null); setFotoPreview(undefined); if(fileRef.current) fileRef.current.value='' }

  useEffect(()=>{ if(fotoFile){ const r = new FileReader(); r.onload = ()=> setFotoPreview(String(r.result)); r.readAsDataURL(fotoFile) } },[fotoFile])

  function submit(e:React.FormEvent){
    e.preventDefault()
    const rec: Submission = { id: uuidv4(), tanggal, nama, nik, divisi: divisi as DivisionKey, apd, jumlah, fotoDataUrl: fotoPreview, createdAt: new Date().toISOString() }
    const prev = loadApd(); prev.unshift(rec); saveApd(prev); alert('Tersimpan'); reset();
  }

  return (
    <FormCard title="Form Pengambilan APD" onBack={()=>navigate('/') }>
      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block">Tanggal
          <input type="date" value={tanggal} onChange={e=>setTanggal(e.target.value)} className="mt-1 block w-full border rounded p-2 bg-slate-700 text-white" required/></label>
        <label className="block">Nama
          <input value={nama} onChange={e=>setNama(e.target.value)} className="mt-1 block w-full border rounded p-2 bg-slate-700 text-white" required/></label>
        <label className="block">NIK
          <input value={nik} onChange={e=>setNik(e.target.value)} className="mt-1 block w-full border rounded p-2 bg-slate-700 text-white" required/></label>
        <label className="block">Divisi
          <select value={divisi} onChange={e=>setDivisi(e.target.value as DivisionKey| '')} className="mt-1 block w-full border rounded p-2 bg-slate-700 text-white" required>
            <option value="">-- Pilih --</option>
            {Object.keys(APD_OPTIONS).map(k=> <option key={k} value={k}>{k.replace('_',' ')}</option>)}
          </select>
        </label>
        <label className="block">Jenis APD
          <select value={apd} onChange={e=>setApd(e.target.value)} className="mt-1 block w-full border rounded p-2 bg-slate-700 text-white" required>
            <option value="">-- Pilih --</option>
            {divisi && APD_OPTIONS[divisi].map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </label>
        <label className="block">Jumlah
          <input type="number" min={1} value={jumlah} onChange={e=>setJumlah(Number(e.target.value))} className="mt-1 block w-full border rounded p-2 bg-slate-700 text-white" required/></label>
        <label className="block md:col-span-2">Foto (opsional)
          <input ref={fileRef} type="file" accept="image/*" onChange={e=>setFotoFile(e.target.files?.[0]??null)} className="mt-1 block w-full bg-slate-700 text-white"/>
          {fotoPreview && <img src={fotoPreview} className="mt-2 w-40 h-28 object-cover rounded" />}
        </label>
        <div className="md:col-span-2 flex justify-end">
          <button type="submit" className="px-6 py-2 bg-amber-400 text-black rounded hover:scale-105 transition">Simpan</button>
        </div>
      </form>
    </FormCard>
  )
}
