"use client"

import { X } from "lucide-react"
import { FormEvent, useEffect, useRef, useState } from "react"

export type Pasien = {
  id?: string
  noRm: string
  name: string
  nik: string
  birthDate: string
  gender: string
  phone: string
  clinic: string
  status: string
  address: string
}

type PasienModalProps = {
  isOpen: boolean
  onClose: () => void
  patient?: Pasien | null
  onSaved?: () => void
}

const inputClassName =
  "w-full rounded-xl border border-transparent bg-muted px-4 py-3 outline-none transition-colors focus:border-primary"

export function PasienModal({
  isOpen,
  onClose,
  patient = null,
  onSaved,
}: PasienModalProps) {
  const firstInputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) return

    firstInputRef.current?.focus()
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitError(null)
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const payload = {
      medical_record_no: formData.get("noRm"),
      national_id: formData.get("nik"),
      full_name: formData.get("name"),
      birth_date: formData.get("birthDate"),
      gender: formData.get("gender"),
      phone: formData.get("phone"),
      poli: formData.get("clinic"),
      care_status: formData.get("status"),
      address: formData.get("address"),
    }

    try {
      const response = await fetch(
        isEditing ? `/api/patients/${patient.id}` : "/api/patients",
        {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        },
      )
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error?.message ?? "Data pasien gagal disimpan.")
      }

      onSaved?.()
      onClose()
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Data pasien gagal disimpan.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const isEditing = patient !== null

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="patient-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-border p-6">
          <div>
            <h3 id="patient-modal-title" className="text-xl font-bold text-foreground">
              {isEditing ? "Edit Pasien" : "Tambah Pasien"}
            </h3>
            <p className="mt-1 text-sm text-secondary">
              Lengkapi data pasien dengan benar.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="rounded-xl p-2 transition-colors hover:bg-muted"
          >
            <X className="size-5 text-secondary" />
          </button>
        </div>

        <form className="p-6" onSubmit={handleSubmit}>
          {submitError && (
            <p className="mb-4 rounded-xl bg-error-light px-4 py-3 text-sm text-error" role="alert">
              {submitError}
            </p>
          )}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="patient-no-rm" className="mb-2 block text-sm font-medium text-foreground">
                No RM <span className="text-error">*</span>
              </label>
              <input ref={firstInputRef} id="patient-no-rm" name="noRm" type="text" required defaultValue={patient?.noRm ?? ""} className={inputClassName} />
            </div>
            <div>
              <label htmlFor="patient-name" className="mb-2 block text-sm font-medium text-foreground">
                Nama Lengkap <span className="text-error">*</span>
              </label>
              <input id="patient-name" name="name" type="text" required defaultValue={patient?.name ?? ""} className={inputClassName} />
            </div>
            <div>
              <label htmlFor="patient-nik" className="mb-2 block text-sm font-medium text-foreground">
                NIK <span className="text-error">*</span>
              </label>
              <input id="patient-nik" name="nik" type="text" inputMode="numeric" minLength={16} maxLength={16} required defaultValue={patient?.nik ?? ""} className={inputClassName} />
            </div>
            <div>
              <label htmlFor="patient-birth-date" className="mb-2 block text-sm font-medium text-foreground">
                Tgl Lahir <span className="text-error">*</span>
              </label>
              <input id="patient-birth-date" name="birthDate" type="date" required defaultValue={patient?.birthDate ?? ""} className={inputClassName} />
            </div>
            <div>
              <label htmlFor="patient-gender" className="mb-2 block text-sm font-medium text-foreground">
                Jenis Kelamin <span className="text-error">*</span>
              </label>
              <select id="patient-gender" name="gender" required defaultValue={patient?.gender ?? ""} className={inputClassName}>
                <option value="">Pilih jenis kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div>
              <label htmlFor="patient-phone" className="mb-2 block text-sm font-medium text-foreground">
                No HP <span className="text-error">*</span>
              </label>
              <input id="patient-phone" name="phone" type="tel" required defaultValue={patient?.phone ?? ""} className={inputClassName} />
            </div>
            <div>
              <label htmlFor="patient-clinic" className="mb-2 block text-sm font-medium text-foreground">
                Poli <span className="text-error">*</span>
              </label>
              <select id="patient-clinic" name="clinic" required defaultValue={patient?.clinic ?? ""} className={inputClassName}>
                <option value="">Pilih poli</option>
                <option value="Poli Jantung">Poli Jantung</option>
                <option value="Poli Anak">Poli Anak</option>
                <option value="poli umum">Poli Umum</option>
              </select>
            </div>
            <div>
              <label htmlFor="patient-status" className="mb-2 block text-sm font-medium text-foreground">
                Status <span className="text-error">*</span>
              </label>
              <select id="patient-status" name="status" required defaultValue={patient?.status ?? ""} className={inputClassName}>
                <option value="">Pilih status</option>
                <option value="Rawat Jalan">Rawat Jalan</option>
                <option value="Rawat Inap">Rawat Inap</option>
                <option value="Selesai">Selesai</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="patient-address" className="mb-2 block text-sm font-medium text-foreground">
                Alamat <span className="text-error">*</span>
              </label>
              <textarea id="patient-address" name="address" rows={3} required defaultValue={patient?.address ?? ""} className={`${inputClassName} resize-none`} />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-full bg-muted px-5 py-3 font-semibold text-foreground transition-colors hover:bg-gray-200">
              Batal
            </button>
            <button type="submit" disabled={isSubmitting} className="rounded-full bg-primary px-5 py-3 font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? "Menyimpan..." : isEditing ? "Simpan Perubahan" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}