import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "../../../lib/supabase/server"
import type {
  PatientListQuery,
  PatientListResponse,
  PatientSortField,
  SortDirection,
  PatientCreateRequest,
  PatientErrorResponse,
  PatientResponse,
} from "../../../types/patient-api"
import type {
  CareStatus,
  Poli,
} from "../../../types/patient"

const validGenders = ["Laki-laki", "Perempuan"] as const
const validPoli: readonly Poli[] = [
  "poli umum",
  "poli_gigi",
  "Poli Jantung",
  "poli_penyakit_dalam",
  "Poli Kandungan",
  "Poli Anak",
  "Poli darurat",
]
const validCareStatuses: readonly CareStatus[] = [
  "Rawat Jalan",
  "Rawat Inap",
  "observasi",
  "Selesai",
]
const validSortFields: readonly PatientSortField[] = [
  "medical_record_no",
  "full_name",
  "birth_date",
  "created_at",
  "updated_at",
]
const validSortDirections: readonly SortDirection[] = ["asc", "desc"]

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}

function isValueIn<T extends string>(
  value: string,
  values: readonly T[],
): value is T {
  return values.includes(value as T)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search")?.trim() || undefined
  const poliParam = searchParams.get("poli") || undefined
  const careStatusParam = searchParams.get("care_status") || undefined
  const sortByParam = searchParams.get("sort_by") || "created_at"
  const sortDirectionParam = searchParams.get("sort_direction") || "desc"

  const page = Number.parseInt(searchParams.get("page") || "1", 10)
  const limit = Number.parseInt(searchParams.get("limit") || "10", 10)

  if (
    !Number.isInteger(page) ||
    page < 1 ||
    !Number.isInteger(limit) ||
    limit < 1 ||
    limit > 100
  ) {
    return NextResponse.json<PatientErrorResponse>(
      {
        error: {
          code: "INVALID_QUERY",
          message: "page harus >= 1 dan limit harus berada di antara 1-100.",
        },
      },
      { status: 400 },
    )
  }

  if (poliParam && !isValueIn(poliParam, validPoli)) {
    return NextResponse.json<PatientErrorResponse>(
      {
        error: {
          code: "INVALID_QUERY",
          message: "Nilai poli tidak valid.",
          field: "poli",
        },
      },
      { status: 400 },
    )
  }

  if (careStatusParam && !isValueIn(careStatusParam, validCareStatuses)) {
    return NextResponse.json<PatientErrorResponse>(
      {
        error: {
          code: "INVALID_QUERY",
          message: "Nilai care_status tidak valid.",
          field: "care_status",
        },
      },
      { status: 400 },
    )
  }

  if (!isValueIn(sortByParam, validSortFields)) {
    return NextResponse.json<PatientErrorResponse>(
      {
        error: {
          code: "INVALID_QUERY",
          message: "Nilai sort_by tidak valid.",
        },
      },
      { status: 400 },
    )
  }

  if (!isValueIn(sortDirectionParam, validSortDirections)) {
    return NextResponse.json<PatientErrorResponse>(
      {
        error: {
          code: "INVALID_QUERY",
          message: "Nilai sort_direction tidak valid.",
        },
      },
      { status: 400 },
    )
  }

  const query: PatientListQuery = {
    search,
    poli: poliParam as Poli | undefined,
    care_status: careStatusParam as CareStatus | undefined,
    page,
    limit,
    sort_by: sortByParam,
    sort_direction: sortDirectionParam,
  }
  const from = (query.page! - 1) * query.limit!
  const to = from + query.limit! - 1
  const supabase = await getSupabaseServerClient()

  let patientsQuery = supabase
    .from("patients")
    .select("*", { count: "exact" })
    .order(query.sort_by!, { ascending: query.sort_direction === "asc" })
    .range(from, to)

  if (query.search) {
    patientsQuery = patientsQuery.or(
      `full_name.ilike.%${query.search}%,medical_record_no.ilike.%${query.search}%`,
    )
  }

  if (query.poli) {
    patientsQuery = patientsQuery.eq("poli", query.poli)
  }

  if (query.care_status) {
    patientsQuery = patientsQuery.eq("care_status", query.care_status)
  }

  const { data, error, count } = await patientsQuery

  if (error) {
    return NextResponse.json<PatientErrorResponse>(
      {
        error: {
          code: "DATABASE_ERROR",
          message: "Data pasien gagal diambil.",
          details: error.message,
        },
      },
      { status: 500 },
    )
  }

  const total = count ?? 0
  return NextResponse.json<PatientListResponse>({
    data,
    meta: {
      page: query.page!,
      limit: query.limit!,
      total,
      total_pages: Math.ceil(total / query.limit!),
    },
  })
}

function validatePatientPayload(
  payload: unknown,
): { data: PatientCreateRequest } | { error: PatientErrorResponse } {
  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return {
      error: {
        error: {
          code: "INVALID_PAYLOAD",
          message: "Payload pasien harus berupa object JSON.",
        },
      },
    }
  }

  const body = payload as Record<string, unknown>
  const requiredFields = [
    "medical_record_no",
    "national_id",
    "full_name",
    "birth_date",
    "gender",
    "phone",
    "poli",
    "care_status",
    "address",
  ] as const

  for (const field of requiredFields) {
    if (!isNonEmptyString(body[field])) {
      return {
        error: {
          error: {
            code: "INVALID_FIELD",
            message: `${field} wajib diisi.`,
            field,
          },
        },
      }
    }
  }

  if (!/^\d{16}$/.test(body.national_id as string)) {
    return {
      error: {
        error: {
          code: "INVALID_FIELD",
          message: "national_id harus terdiri dari 16 angka.",
          field: "national_id",
        },
      },
    }
  }

  if (!validGenders.includes(body.gender as (typeof validGenders)[number])) {
    return {
      error: {
        error: {
          code: "INVALID_FIELD",
          message: "gender tidak valid.",
          field: "gender",
        },
      },
    }
  }

  if (!validPoli.includes(body.poli as Poli)) {
    return {
      error: {
        error: {
          code: "INVALID_FIELD",
          message: "poli tidak valid.",
          field: "poli",
        },
      },
    }
  }

  if (!validCareStatuses.includes(body.care_status as CareStatus)) {
    return {
      error: {
        error: {
          code: "INVALID_FIELD",
          message: "care_status tidak valid.",
          field: "care_status",
        },
      },
    }
  }

  if (!/^[0-9+()\-\s]{8,30}$/.test(body.phone as string)) {
    return {
      error: {
        error: {
          code: "INVALID_FIELD",
          message: "phone tidak valid.",
          field: "phone",
        },
      },
    }
  }

  const data: PatientCreateRequest = {
    medical_record_no: body.medical_record_no as string,
    national_id: body.national_id as string,
    full_name: body.full_name as string,
    birth_date: body.birth_date as string,
    gender: body.gender as PatientCreateRequest["gender"],
    phone: body.phone as string,
    poli: body.poli as Poli,
    care_status: body.care_status as CareStatus,
    address: body.address as string,
    avatar_url: isNonEmptyString(body.avatar_url) ? body.avatar_url : null,
  }

  return { data }
}

export async function POST(request: Request) {
  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json<PatientErrorResponse>(
      {
        error: {
          code: "INVALID_JSON",
          message: "Request body harus berupa JSON yang valid.",
        },
      },
      { status: 400 },
    )
  }

  const validation = validatePatientPayload(payload)
  if ("error" in validation) {
    return NextResponse.json(validation.error, { status: 400 })
  }

  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("patients")
    .insert(validation.data)
    .select()
    .single()

  if (error) {
    const isDuplicate = error.code === "23505"
    return NextResponse.json<PatientErrorResponse>(
      {
        error: {
          code: isDuplicate ? "DUPLICATE_PATIENT" : "DATABASE_ERROR",
          message: isDuplicate
            ? "No rekam medis atau NIK sudah terdaftar."
            : "Data pasien gagal disimpan.",
          details: error.message,
        },
      },
      { status: isDuplicate ? 409 : 500 },
    )
  }

  return NextResponse.json<PatientResponse>({ data }, { status: 201 })
}
