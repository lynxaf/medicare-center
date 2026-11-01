"use client"

import { Aside } from "../../../components/aside"
import { Header } from "../../../components/header"
import { Pasien, PasienModal } from "../../../components/modal/PasienModal"
import type { Patient } from "../../../types/patient"
import type { PatientListResponse } from "../../../types/patient-api"
import {
  Bed,
  Download,
  Eye,
  Pencil,
  Plus,
  Search,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react"
import { useEffect, useState } from "react"
export default function PasienPage() {
    const [isPatientModalOpen, setIsPatientModalOpen] = useState(false)
    const [selectedPatient, setSelectedPatient] = useState<Pasien | null>(null)
    const [patientToDelete, setPatientToDelete] = useState<Pasien | null>(null)
    const [patients, setPatients] = useState<Patient[]>([])
    const [isLoadingPatients, setIsLoadingPatients] = useState(true)
    const [patientsError, setPatientsError] = useState<string | null>(null)
    const visiblePatientCount = patients.length

    const loadPatients = async () => {
      try {
        const response = await fetch("/api/patients?limit=100")
        const result = await response.json()
        if (!response.ok) {
          throw new Error(result.error?.message ?? "Data pasien gagal diambil.")
        }
        setPatients((result as PatientListResponse).data)
        setPatientsError(null)
      } catch (error) {
        setPatientsError(
          error instanceof Error ? error.message : "Data pasien gagal diambil.",
        )
      } finally {
        setIsLoadingPatients(false)
      }
    }

    useEffect(() => {
      const timer = window.setTimeout(() => {
        void loadPatients()
      }, 0)
      return () => window.clearTimeout(timer)
    }, [])

    const openAddPatientModal = () => {
      setSelectedPatient(null)
      setIsPatientModalOpen(true)
    }

    const openEditPatientModal = (patient: Pasien) => {
      setSelectedPatient(patient)
      setIsPatientModalOpen(true)
    }

    const confirmDeletePatient = async () => {
      if (!patientToDelete?.id) return

      try {
        const response = await fetch(`/api/patients/${patientToDelete.id}`, {
          method: "DELETE",
        })
        const result = response.status === 204 ? null : await response.json()
        if (!response.ok) {
          throw new Error(result?.error?.message ?? "Data pasien gagal dihapus.")
        }

        setPatients((currentPatients) =>
          currentPatients.filter((patient) => patient.id !== patientToDelete.id),
        )
        setPatientToDelete(null)
      } catch (error) {
        setPatientsError(
          error instanceof Error ? error.message : "Data pasien gagal dihapus.",
        )
      }
    }

    return(
        <>
        <Aside />
        <main className="flex-1 lg:ml-[280px] flex flex-col bg-white min-h-screen overflow-x-hidden">
            <Header title="Manajemen Pasien" />
  {/* Page Content Area */}
  <div className="flex-1 overflow-y-auto p-5 md:p-8">
    {/* Top Bar: Search, Filters, Add Button */}
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
      <div className="relative w-full md:max-w-[360px] md:flex-1 lg:max-w-[420px]">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-secondary" />
        <input
          type="text"
          placeholder="Cari Nama/No RM..."
          className="h-12 w-full pl-11 pr-4 py-3 bg-muted rounded-xl border border-transparent focus:border-primary focus:ring-0 outline-none transition-all duration-300"
        />
      </div>
      <div className="flex w-full flex-col sm:flex-row items-stretch gap-3 md:w-auto md:items-center">
        <div className="w-full sm:w-auto">
          <select className="h-12 w-full min-w-[150px] px-4 py-3 bg-muted rounded-xl border border-transparent focus:border-primary focus:ring-0 outline-none transition-all duration-300 text-secondary font-medium">
            <option>Semua Poli</option>
            <option>Poli Jantung</option>
            <option>Poli Anak</option>
            <option>Poli Umum</option>
          </select>
        </div>
        <div className="w-full sm:w-auto">
          <select className="h-12 w-full min-w-[150px] px-4 py-3 bg-muted rounded-xl border border-transparent focus:border-primary focus:ring-0 outline-none transition-all duration-300 text-secondary font-medium">
            <option>Semua Status</option>
            <option>Rawat Jalan</option>
            <option>Rawat Inap</option>
            <option>Selesai</option>
          </select>
        </div>
        <button
          type="button"
          onClick={openAddPatientModal}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-primary-hover cursor-pointer whitespace-nowrap sm:w-auto"
        >
          <Plus className="size-5" />
          <span>Tambah Pasien</span>
        </button>
      </div>
    </div>
    {/* Quick Insights */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
      <div className="flex flex-col rounded-2xl border border-border p-6 gap-3 bg-white">
        <div className="flex items-center gap-[6px]">
          <div className="size-11 bg-info/10 rounded-xl flex items-center justify-center shrink-0">
            <Users className="size-6 text-info" />
          </div>
          <p className="font-medium text-secondary">Rawat Jalan</p>
        </div>
        <p className="font-bold text-[32px] leading-10">832</p>
      </div>
      <div className="flex flex-col rounded-2xl border border-border p-6 gap-3 bg-white">
        <div className="flex items-center gap-[6px]">
          <div className="size-11 bg-alert/10 rounded-xl flex items-center justify-center shrink-0">
            <Bed className="size-6 text-alert-dark" />
          </div>
          <p className="font-medium text-secondary">Rawat Inap</p>
        </div>
        <p className="font-bold text-[32px] leading-10">128</p>
      </div>
      <div className="flex flex-col rounded-2xl border border-border p-6 gap-3 bg-white">
        <div className="flex items-center gap-[6px]">
          <div className="size-11 bg-success/10 rounded-xl flex items-center justify-center shrink-0">
            <UserPlus className="size-6 text-success" />
          </div>
          <p className="font-medium text-secondary">Pasien Baru (Bulan Ini)</p>
        </div>
        <p className="font-bold text-[32px] leading-10">54</p>
      </div>
    </div>
    {/* Patient Data Table */}
    <div className="flex flex-col rounded-2xl border border-border bg-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-6 border-b border-border">
        <h3 className="font-bold text-lg text-foreground">Daftar Pasien</h3>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-muted text-foreground rounded-full font-semibold hover:bg-gray-200 transition-all duration-200 cursor-pointer text-sm">
          <Download className="size-4" />
          <span>Export Excel</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-[30%] px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Nama Pasien
              </th>
              <th className="w-[15%] px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                No. RM
              </th>
              <th className="w-[10%] px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Umur
              </th>
              <th className="w-[15%] px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Poli
              </th>
              <th className="w-[15%] px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Status
              </th>
              <th className="w-[15%] px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoadingPatients && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-secondary">
                  Memuat data pasien...
                </td>
              </tr>
            )}
            {patientsError && !isLoadingPatients && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-error">
                  {patientsError}
                </td>
              </tr>
            )}
            {!isLoadingPatients && !patientsError && patients.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-secondary">
                  Belum ada data pasien.
                </td>
              </tr>
            )}
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td className="px-4 py-3">
                  <span className="font-semibold text-foreground">{patient.full_name}</span>
                </td>
                <td className="px-4 py-3 text-secondary font-medium">{patient.medical_record_no}</td>
                <td className="px-4 py-3 text-secondary font-medium">
                  {new Date().getFullYear() - new Date(patient.birth_date).getFullYear()} Thn
                </td>
                <td className="px-4 py-3 text-secondary font-medium">{patient.poli}</td>
                <td className="px-4 py-3">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-info-light text-info-dark">
                    {patient.care_status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    aria-label={`Edit ${patient.full_name}`}
                    onClick={() => openEditPatientModal({
                      id: patient.id,
                      noRm: patient.medical_record_no,
                      name: patient.full_name,
                      nik: patient.national_id,
                      birthDate: patient.birth_date,
                      gender: patient.gender,
                      phone: patient.phone,
                      clinic: patient.poli,
                      status: patient.care_status,
                      address: patient.address,
                    })}
                    className="p-2 rounded-lg hover:bg-muted"
                  >
                    <Pencil className="size-4 text-secondary" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Hapus ${patient.full_name}`}
                    onClick={() => setPatientToDelete({
                      id: patient.id,
                      noRm: patient.medical_record_no,
                      name: patient.full_name,
                      nik: patient.national_id,
                      birthDate: patient.birth_date,
                      gender: patient.gender,
                      phone: patient.phone,
                      clinic: patient.poli,
                      status: patient.care_status,
                      address: patient.address,
                    })}
                    className="p-2 rounded-lg hover:bg-muted"
                  >
                    <Trash2 className="size-4 text-error" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tbody id="patient-table-body" className="hidden">
            {/* Sample Row 1 */}
            <tr>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop"
                    alt="Budi Santoso"
                    className="size-10 rounded-full object-cover"
                  />
                  <span className="font-semibold text-foreground">
                    Budi Santoso
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-secondary font-medium">RM001234</td>
              <td className="px-4 py-3 text-secondary font-medium">34 Thn</td>
              <td className="px-4 py-3 text-secondary font-medium">
                Poli Jantung
              </td>
              <td className="px-4 py-3">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-info-light text-info-dark">
                  Rawat Jalan
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="p-2 rounded-lg hover:bg-muted"
                  >
                    <Eye className="size-4 text-secondary" />
                  </button>
                  <button
                    type="button"
                    aria-label="Edit Budi Santoso"
                    onClick={() => openEditPatientModal({
                      noRm: "RM001234", name: "Budi Santoso", nik: "3174010101900001",
                      birthDate: "1990-01-01", gender: "Laki-laki", phone: "081234567890",
                      clinic: "Poli Jantung", status: "Rawat Jalan", address: "Jakarta",
                    })}
                    className="p-2 rounded-lg hover:bg-muted"
                  >
                    <Pencil className="size-4 text-secondary" />
                  </button>
                  <button
                    type="button"
                    aria-label="Hapus Budi Santoso"
                    onClick={() => setPatientToDelete({
                      noRm: "RM001234", name: "Budi Santoso", nik: "3174010101900001",
                      birthDate: "1990-01-01", gender: "Laki-laki", phone: "081234567890",
                      clinic: "Poli Jantung", status: "Rawat Jalan", address: "Jakarta",
                    })}
                    className="p-2 rounded-lg hover:bg-muted"
                  >
                    <Trash2 className="size-4 text-error" />
                  </button>
                </div>
              </td>
            </tr>
            {/* Sample Row 2 */}
            <tr>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                    alt="Siti Aminah"
                    className="size-10 rounded-full object-cover"
                  />
                  <span className="font-semibold text-foreground">
                    Siti Aminah
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-secondary font-medium">RM001235</td>
              <td className="px-4 py-3 text-secondary font-medium">28 Thn</td>
              <td className="px-4 py-3 text-secondary font-medium">
                Poli Anak
              </td>
              <td className="px-4 py-3">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-alert-light text-alert-dark">
                  Rawat Inap
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="p-2 rounded-lg hover:bg-muted"
                  >
                    <Eye className="size-4 text-secondary" />
                  </button>
                  <button
                    type="button"
                    aria-label="Edit Siti Aminah"
                    onClick={() => openEditPatientModal({
                      noRm: "RM001235", name: "Siti Aminah", nik: "3174020201950002",
                      birthDate: "1995-02-02", gender: "Perempuan", phone: "081234567891",
                      clinic: "Poli Anak", status: "Rawat Inap", address: "Bandung",
                    })}
                    className="p-2 rounded-lg hover:bg-muted"
                  >
                    <Pencil className="size-4 text-secondary" />
                  </button>
                  <button
                    type="button"
                    aria-label="Hapus Siti Aminah"
                    onClick={() => setPatientToDelete({
                      noRm: "RM001235", name: "Siti Aminah", nik: "3174020201950002",
                      birthDate: "1995-02-02", gender: "Perempuan", phone: "081234567891",
                      clinic: "Poli Anak", status: "Rawat Inap", address: "Bandung",
                    })}
                    className="p-2 rounded-lg hover:bg-muted"
                  >
                    <Trash2 className="size-4 text-error" />
                  </button>
                </div>
              </td>
            </tr>
            {/* Sample Row 3 */}
            <tr>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
                    alt="Agus Wijaya"
                    className="size-10 rounded-full object-cover"
                  />
                  <span className="font-semibold text-foreground">
                    Agus Wijaya
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-secondary font-medium">RM001236</td>
              <td className="px-4 py-3 text-secondary font-medium">52 Thn</td>
              <td className="px-4 py-3 text-secondary font-medium">
                Poli Umum
              </td>
              <td className="px-4 py-3">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-success-light text-success-dark">
                  Selesai
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-muted">
                    <Eye className="size-4 text-secondary" />
                  </button>
                  <button
                    type="button"
                    aria-label="Edit Agus Wijaya"
                    onClick={() => openEditPatientModal({
                      noRm: "RM001236", name: "Agus Wijaya", nik: "3174030301720003",
                      birthDate: "1972-03-03", gender: "Laki-laki", phone: "081234567892",
                      clinic: "Poli Umum", status: "Selesai", address: "Surabaya",
                    })}
                    className="p-2 rounded-lg hover:bg-muted"
                  >
                    <Pencil className="size-4 text-secondary" />
                  </button>
                  <button
                    type="button"
                    aria-label="Hapus Agus Wijaya"
                    onClick={() => setPatientToDelete({
                      noRm: "RM001236", name: "Agus Wijaya", nik: "3174030301720003",
                      birthDate: "1972-03-03", gender: "Laki-laki", phone: "081234567892",
                      clinic: "Poli Umum", status: "Selesai", address: "Surabaya",
                    })}
                    className="p-2 rounded-lg hover:bg-muted"
                  >
                    <Trash2 className="size-4 text-error" />
                  </button>
                </div>
              </td>
            </tr>
            {/* Sample Row 4 */}
            <tr>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                    alt="Dewi Lestari"
                    className="size-10 rounded-full object-cover"
                  />
                  <span className="font-semibold text-foreground">
                    Dewi Lestari
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-secondary font-medium">RM001237</td>
              <td className="px-4 py-3 text-secondary font-medium">45 Thn</td>
              <td className="px-4 py-3 text-secondary font-medium">
                Poli Jantung
              </td>
              <td className="px-4 py-3">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-info-light text-info-dark">
                  Rawat Jalan
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-muted">
                    <Eye className="size-4 text-secondary" />
                  </button>
                  <button
                    type="button"
                    aria-label="Edit Dewi Lestari"
                    onClick={() => openEditPatientModal({
                      noRm: "RM001237", name: "Dewi Lestari", nik: "3174040401800004",
                      birthDate: "1980-04-04", gender: "Perempuan", phone: "081234567893",
                      clinic: "Poli Jantung", status: "Rawat Jalan", address: "Depok",
                    })}
                    className="p-2 rounded-lg hover:bg-muted"
                  >
                    <Pencil className="size-4 text-secondary" />
                  </button>
                  <button
                    type="button"
                    aria-label="Hapus Dewi Lestari"
                    onClick={() => setPatientToDelete({
                      noRm: "RM001237", name: "Dewi Lestari", nik: "3174040401800004",
                      birthDate: "1980-04-04", gender: "Perempuan", phone: "081234567893",
                      clinic: "Poli Jantung", status: "Rawat Jalan", address: "Depok",
                    })}
                    className="p-2 rounded-lg hover:bg-muted"
                  >
                    <Trash2 className="size-4 text-error" />
                  </button>
                </div>
              </td>
            </tr>
            {/* Sample Row 5 */}
            <tr>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                    alt="Eko Prasetyo"
                    className="size-10 rounded-full object-cover"
                  />
                  <span className="font-semibold text-foreground">
                    Eko Prasetyo
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-secondary font-medium">RM001238</td>
              <td className="px-4 py-3 text-secondary font-medium">29 Thn</td>
              <td className="px-4 py-3 text-secondary font-medium">
                Poli Umum
              </td>
              <td className="px-4 py-3">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-info-light text-info-dark">
                  Rawat Jalan
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-muted">
                    <Eye className="size-4 text-secondary" />
                  </button>
                  <button
                    type="button"
                    aria-label="Edit Eko Prasetyo"
                    onClick={() => openEditPatientModal({
                      noRm: "RM001238", name: "Eko Prasetyo", nik: "3174050501960005",
                      birthDate: "1996-05-05", gender: "Laki-laki", phone: "081234567894",
                      clinic: "Poli Umum", status: "Rawat Jalan", address: "Tangerang",
                    })}
                    className="p-2 rounded-lg hover:bg-muted"
                  >
                    <Pencil className="size-4 text-secondary" />
                  </button>
                  <button
                    type="button"
                    aria-label="Hapus Eko Prasetyo"
                    onClick={() => setPatientToDelete({
                      noRm: "RM001238", name: "Eko Prasetyo", nik: "3174050501960005",
                      birthDate: "1996-05-05", gender: "Laki-laki", phone: "081234567894",
                      clinic: "Poli Umum", status: "Rawat Jalan", address: "Tangerang",
                    })}
                    className="p-2 rounded-lg hover:bg-muted"
                  >
                    <Trash2 className="size-4 text-error" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="p-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-sm text-secondary">
          Menampilkan 1-{visiblePatientCount} dari 128 pasien
        </span>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-secondary hover:bg-muted disabled:opacity-50"
            disabled
          >
            Sebelumnya
          </button>
          <button className="size-8 rounded-lg text-sm font-medium bg-primary text-white">
            1
          </button>
          <button className="size-8 rounded-lg text-sm font-medium text-secondary hover:bg-muted">
            2
          </button>
          <button className="size-8 rounded-lg text-sm font-medium text-secondary hover:bg-muted">
            3
          </button>
          <span className="text-secondary">...</span>
          <button className="size-8 rounded-lg text-sm font-medium text-secondary hover:bg-muted">
            26
          </button>
          <button className="px-3 py-1.5 rounded-lg text-sm font-medium text-secondary hover:bg-muted">
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  </div>
</main>
<PasienModal
  isOpen={isPatientModalOpen}
  onClose={() => setIsPatientModalOpen(false)}
  patient={selectedPatient}
  onSaved={() => void loadPatients()}
/>
{patientToDelete && (
  <div
    className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby="delete-patient-title"
    onMouseDown={(event) => {
      if (event.target === event.currentTarget) setPatientToDelete(null)
    }}
  >
    <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl">
      <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-error-light">
        <Trash2 className="size-7 text-error" />
      </div>
      <h3 id="delete-patient-title" className="mb-2 text-xl font-bold text-foreground">
        Hapus Pasien?
      </h3>
      <p className="mb-6 text-sm text-secondary">
        Data pasien <strong>{patientToDelete.name}</strong> akan dihapus dan tidak dapat dikembalikan.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setPatientToDelete(null)}
          className="flex-1 rounded-full bg-muted px-4 py-3 font-semibold text-foreground transition-colors hover:bg-gray-200"
        >
          Batal
        </button>
        <button
          type="button"
          onClick={confirmDeletePatient}
          className="flex-1 rounded-full bg-error px-4 py-3 font-semibold text-white transition-colors hover:opacity-90"
        >
          Hapus
        </button>
      </div>
    </div>
  </div>
)}
</>
    )
}