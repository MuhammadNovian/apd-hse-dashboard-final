import { Submission, ObatRecord } from '../types'

const APD_KEY = 'bfs_apd_v1'
const OBAT_KEY = 'bfs_obat_v1'

export function saveApd(records: Submission[]) {
  localStorage.setItem(APD_KEY, JSON.stringify(records))
}

export function loadApd(): Submission[] {
  try { return JSON.parse(localStorage.getItem(APD_KEY) ?? '[]') }
  catch { return [] }
}

export function saveObat(records: ObatRecord[]) {
  localStorage.setItem(OBAT_KEY, JSON.stringify(records))
}

export function loadObat(): ObatRecord[] {
  try { return JSON.parse(localStorage.getItem(OBAT_KEY) ?? '[]') }
  catch { return [] }
}
