import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "../../../../lib/supabase/server"
import type { CareStatus, Poli } from "../../../../types/patient"
import type {
  PatientErrorResponse,
  PatientResponse,
  PatientUpdateRequest,
} from "../../../../types/patient-api"

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
const updateFields = [
  "medical_record_no",
  "national_id",
  "full_name",
  "birth_date",
  "gender",
  "phone",
  "poli",
  "care_status",
  "address",
  "avatar_url",
] as const

type PatientUpdateField = (typeof updateFields)[number]

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}

function isValueIn<T extends string>(
  value: string,
  values: readonly T[],
): value is T {
  return values.includes(value as T)
}

function errorResponse(
  code: string,
  message: string,
  status: number,
  field?: PatientUpdateField,
  details?: string,
) {
  return NextResponse.json<PatientErrorResponse>(
    { error: { code, message, field, details } },
    { status },
  )
}

function validateUpdatePayload(
  payload: unknown,
): { data: PatientUpdateRequest } | { response: ReturnType<typeof errorResponse> } {
  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return {
      response: errorResponse(
        "INVALID_PAYLOAD",
        "Payload pasien harus berupa object JSON.",
        400,
      ),
    }
  }

  const body = payload as Record<string, unknown>
  const unknownField = Object.keys(body).find(
    (field) => !updateFields.includes(field as PatientUpdateField),
  )
  if (unknownField) {
    return {
      response: errorResponse(
        "INVALID_FIELD",
        `Field ${unknownField} tidak dapat diperbarui.`,
        400,
      ),
    }
  }

  if (Object.keys(body).length === 0) {
    return {
      response: errorResponse(
        "INVALID_PAYLOAD",
        "Minimal satu field harus dikirim untuk diperbarui.",
        400,
      ),
    }
  }

  for (const field of updateFields) {
    if (field === "avatar_url" && body[field] === null) continue
    if (body[field] === undefined) continue
    if (!isNonEmptyString(body[field])) {
      return {
        response: errorResponse(
          "INVALID_FIELD",
          `${field} harus berupa teks dan tidak boleh kosong.`,
          400,
          field,
        ),
      }
    }
  }

  if (
    body.national_id !== undefined &&
    !/^\d{16}$/.test(body.national_id as string)
  ) {
    return {
      response: errorResponse(
        "INVALID_FIELD",
        "national_id harus terdiri dari 16 angka.",
        400,
        "national_id",
      ),
    }
  }

  if (
    body.gender !== undefined &&
    !isValueIn(body.gender as string, validGenders)
  ) {
    return {
      response: errorResponse("INVALID_FIELD", "gender tidak valid.", 400, "gender"),
    }
  }

  if (body.poli !== undefined && !isValueIn(body.poli as string, validPoli)) {
    return {
      response: errorResponse("INVALID_FIELD", "poli tidak valid.", 400, "poli"),
    }
  }

  if (
    body.care_status !== undefined &&
    !isValueIn(body.care_status as string, validCareStatuses)
  ) {
    return {
      response: errorResponse(
        "INVALID_FIELD",
        "care_status tidak valid.",
        400,
        "care_status",
      ),
    }
  }

  if (
    body.phone !== undefined &&
    !/^[0-9+()\-\s]{8,30}$/.test(body.phone as string)
  ) {
    return {
      response: errorResponse("INVALID_FIELD", "phone tidak valid.", 400, "phone"),
    }
  }

  const data = Object.fromEntries(
    Object.entries(body).filter(([field]) =>
      updateFields.includes(field as PatientUpdateField),
    ),
  ) as PatientUpdateRequest

  return { data }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
    return errorResponse("INVALID_ID", "ID pasien tidak valid.", 400)
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return errorResponse(
      "INVALID_JSON",
      "Request body harus berupa JSON yang valid.",
      400,
    )
  }

  const validation = validateUpdatePayload(payload)
  if ("response" in validation) return validation.response

  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("patients")
    .update(validation.data)
    .eq("id", id)
    .select()
    .maybeSingle()

  if (error) {
    const isDuplicate = error.code === "23505"
    return errorResponse(
      isDuplicate ? "DUPLICATE_PATIENT" : "DATABASE_ERROR",
      isDuplicate
        ? "No rekam medis atau NIK sudah terdaftar."
        : "Data pasien gagal diperbarui.",
      isDuplicate ? 409 : 500,
      undefined,
      error.message,
    )
  }

  if (!data) {
    return errorResponse("PATIENT_NOT_FOUND", "Pasien tidak ditemukan.", 404)
  }

  return NextResponse.json<PatientResponse>({ data })
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
    return errorResponse("INVALID_ID", "ID pasien tidak valid.", 400)
  }

  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("patients")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle()

  if (error) {
    return errorResponse(
      "DATABASE_ERROR",
      "Data pasien gagal dihapus.",
      500,
      undefined,
      error.message,
    )
  }

  if (!data) {
    return errorResponse("PATIENT_NOT_FOUND", "Pasien tidak ditemukan.", 404)
  }

  return new NextResponse(null, { status: 204 })
}
