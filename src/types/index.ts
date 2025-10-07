export type DivisionKey =
  | 'TUNGKU'
  | 'CCM'
  | 'MEKANIK_CCM'
  | 'OHC'
  | 'SCRUP'
  | 'OPERATOR_OHC'
  | 'ELECTRIC'
  | 'CLEANING_UMUM'
  | 'MEKANIK_TUNGKU'
  | 'SERVICE_TUNGKU'

export type APDOption = { value: string; label: string }

export type Submission = {
  id: string
  tanggal: string
  nama: string
  nik: string
  divisi: DivisionKey
  apd: string
  jumlah: number
  fotoDataUrl?: string
  createdAt: string
}

export type ObatRecord = {
  id: string
  tanggal: string
  nama: string
  nik: string
  jabatan: string
  departemen: string
  perusahaan: string
  keluhan: string
  obat: string
  diagnosa: string
  keterangan?: string
  createdAt: string
}
