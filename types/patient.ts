export type Gender = "Laki-laki" | "Perempuan"

export type CareStatus =
  | "Rawat Jalan"
  | "Rawat Inap"
  | "observasi"
  | "Selesai"

export type Poli =
  | "poli umum"
  | "poli_gigi"
  | "Poli Jantung"
  | "poli_penyakit_dalam"
  | "Poli Kandungan"
  | "Poli Anak"
  | "Poli darurat"

export type Clinic = Poli

export const POLI_OPTIONS: readonly Poli[] = [
  "poli umum",
  "poli_gigi",
  "Poli Jantung",
  "poli_penyakit_dalam",
  "Poli Kandungan",
  "Poli Anak",
  "Poli darurat",
]

export interface Patient {
  id: string
  medical_record_no: string
  national_id: string
  full_name: string
  birth_date: string
  gender: Gender
  phone: string
  poli: Poli
  care_status: CareStatus
  address: string
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export type PatientInsert = Omit<
  Patient,
  "id" | "created_at" | "updated_at"
>

export type PatientUpdate = Partial<PatientInsert>

export interface PatientFormData {
  medical_record_no: string
  national_id: string
  full_name: string
  birth_date: string
  gender: Gender
  phone: string
  poli: Poli
  care_status: CareStatus
  address: string
  avatar_url?: string | null
}