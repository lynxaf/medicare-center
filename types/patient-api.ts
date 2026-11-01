import type {
  CareStatus,
  Poli,
  Patient,
  PatientInsert,
  PatientUpdate,
} from "./patient"

export type PatientSortField =
  | "medical_record_no"
  | "full_name"
  | "birth_date"
  | "created_at"
  | "updated_at"

export type SortDirection = "asc" | "desc"

export interface PatientListQuery {
  search?: string
  poli?: Poli
  care_status?: CareStatus
  page?: number
  limit?: number
  sort_by?: PatientSortField
  sort_direction?: SortDirection
}

export interface PatientListMeta {
  page: number
  limit: number
  total: number
  total_pages: number
}

export interface PatientListResponse {
  data: Patient[]
  meta: PatientListMeta
}

export interface PatientResponse {
  data: Patient
}

export type PatientCreateRequest = PatientInsert

export type PatientUpdateRequest = PatientUpdate

export interface PatientApiError {
  code: string
  message: string
  details?: string
  field?: keyof PatientInsert
}

export interface PatientErrorResponse {
  error: PatientApiError
}