import { Submission, ObatRecord } from '../types'
import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'

export function exportApdExcel(rows: Submission[]) {
  const wsData = [['record_id','tanggal','nama','nik','divisi','apd','jumlah','createdAt']]
  rows.forEach(r => wsData.push([r.id,r.tanggal,r.nama,r.nik,r.divisi,r.apd,r.jumlah,r.createdAt]))
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.aoa_to_sheet(wsData)
  XLSX.utils.book_append_sheet(wb, ws, 'APD')
  XLSX.writeFile(wb, `apd_${new Date().toISOString()}.xlsx`)
}

export function exportObatExcel(rows: ObatRecord[]) {
  const wsData = [['id','tanggal','nama','nik','jabatan','departemen','perusahaan','keluhan','obat','diagnosa','keterangan','createdAt']]
  rows.forEach(r => wsData.push([r.id,r.tanggal,r.nama,r.nik,r.jabatan,r.departemen,r.perusahaan,r.keluhan,r.obat,r.diagnosa,r.keterangan,r.createdAt]))
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.aoa_to_sheet(wsData)
  XLSX.utils.book_append_sheet(wb, ws, 'Obat')
  XLSX.writeFile(wb, `obat_${new Date().toISOString()}.xlsx`)
}

export function exportApdPDF(rows: Submission[]) {
  const doc = new jsPDF()
  doc.text('Data Pengambilan APD', 10, 10)
  let y = 20
  rows.forEach(r => { doc.text(`${r.tanggal} | ${r.nama} | ${r.nik} | ${r.divisi} | ${r.apd} | ${r.jumlah}`, 10, y); y+=8 })
  doc.save(`apd_${new Date().toISOString()}.pdf`)
}

export function exportObatPDF(rows: ObatRecord[]) {
  const doc = new jsPDF()
  doc.text('Data Pengambilan Obat', 10, 10)
  let y = 20
  rows.forEach(r => { doc.text(`${r.tanggal} | ${r.nama} | ${r.nik} | ${r.jabatan} | ${r.obat}`, 10, y); y+=8 })
  doc.save(`obat_${new Date().toISOString()}.pdf`)
}
