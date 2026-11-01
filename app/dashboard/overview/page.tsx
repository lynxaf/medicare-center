import Image from "next/image"
import { ArrowUpRight, BedDouble, CalendarCheck, Stethoscope, Users } from "lucide-react"
import {Header} from "../../../components/header"
import {Aside} from "../../../components/aside"
import {VisitChart} from "../../../components/visitchart"

export default function OverviewPage() {
    return (
        <div className="flex h-screen max-h-screen flex-1 overflow-hidden bg-muted">
        <Aside />
        <main className="flex-1 lg:ml-[280px] flex flex-col bg-white min-h-screen overflow-x-hidden">
  <Header />
  {/* Page Content Area */}
  <div className="flex-1 overflow-y-auto p-5 md:p-8">
    {/* Stat Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
      <div className="flex flex-col rounded-2xl border border-border p-6 gap-3 bg-white">
        <div className="flex items-center gap-[6px]">
          <div className="size-11 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
            <Users className="size-6 text-primary" />
          </div>
          <p className="font-medium text-secondary">Total Pasien</p>
        </div>
        <p className="font-bold text-[32px] leading-10">1,257</p>
      </div>
      <div className="flex flex-col rounded-2xl border border-border p-6 gap-3 bg-white">
        <div className="flex items-center gap-[6px]">
          <div className="size-11 bg-success/10 rounded-xl flex items-center justify-center shrink-0">
            <Stethoscope className="size-6 text-success" />
          </div>
          <p className="font-medium text-secondary">Dokter Aktif</p>
        </div>
        <p className="font-bold text-[32px] leading-10">76</p>
      </div>
      <div className="flex flex-col rounded-2xl border border-border p-6 gap-3 bg-white">
        <div className="flex items-center gap-[6px]">
          <div className="size-11 bg-info/10 rounded-xl flex items-center justify-center shrink-0">
            <BedDouble className="size-6 text-info" />
          </div>
          <p className="font-medium text-secondary">Bed Tersedia</p>
        </div>
        <p className="font-bold text-[32px] leading-10">128</p>
      </div>
      <div className="flex flex-col rounded-2xl border border-border p-6 gap-3 bg-white">
        <div className="flex items-center gap-[6px]">
          <div className="size-11 bg-warning/10 rounded-xl flex items-center justify-center shrink-0">
            <CalendarCheck className="size-6 text-warning-dark" />
          </div>
          <p className="font-medium text-secondary">Appointment Hari Ini</p>
        </div>
        <p className="font-bold text-[32px] leading-10">42</p>
      </div>
    </div>
    {/* Middle Section: Chart and ER Status */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
      {/* Visit Statistics Chart */}
      <div className="lg:col-span-2 flex flex-col rounded-2xl border border-border p-6 gap-6 bg-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-lg text-foreground">
              Statistik Kunjungan Pasien
            </h3>
            <p className="text-sm text-secondary">Data 7 hari terakhir</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-sm font-semibold text-success">
              <ArrowUpRight className="size-4" /> 8.2%
            </span>
            <span className="text-sm text-secondary">vs minggu lalu</span>
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          <VisitChart />
        </div>
      </div>
      {/* ER Status Widget */}
      <div className="flex flex-col rounded-2xl border border-border p-6 gap-4 bg-white">
        <h3 className="font-bold text-lg text-foreground">Status Ruang IGD</h3>
        <div className="flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-success-light">
          <span className="text-sm font-semibold text-success-dark">
            Kondisi Saat Ini
          </span>
          <p className="text-3xl font-bold text-success-dark mt-1">NORMAL</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted">
            <span className="font-medium text-secondary">Pasien Menunggu</span>
            <span className="font-bold text-lg text-foreground">5</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted">
            <span className="font-medium text-secondary">Dokter Jaga</span>
            <span className="font-bold text-lg text-foreground">3</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted">
            <span className="font-medium text-secondary">Bed Tersedia</span>
            <span className="font-bold text-lg text-foreground">2</span>
          </div>
        </div>
        <a href="#" className="w-full mt-auto">
          <button className="w-full px-4 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-hover transition-all duration-200 cursor-pointer">
            Lihat Detail IGD
          </button>
        </a>
      </div>
    </div>
    {/* Recent Activity Table */}
    <div className="flex flex-col rounded-2xl border border-border p-6 gap-4 bg-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <h3 className="font-bold text-lg text-foreground">Aktivitas Terbaru</h3>
        <a href="#" className="cursor-pointer">
          <span className="text-sm text-primary font-semibold hover:underline">
            Lihat Semua
          </span>
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-[30%] px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Pasien
              </th>
              <th className="w-[20%] px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Dokter
              </th>
              <th className="w-[15%] px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Ruangan
              </th>
              <th className="w-[15%] px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Waktu
              </th>
              <th className="w-[20%] px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Image
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop"
                    width={40}
                    height={40}
                    alt="Budi Santoso"
                    className="size-10 rounded-full object-cover"
                  />
                  <span className="font-semibold text-foreground">
                    Budi Santoso
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-secondary font-medium">
                Dr. John Doe
              </td>
              <td className="px-4 py-3 text-secondary font-medium">
                Poli Jantung
              </td>
              <td className="px-4 py-3 text-secondary text-sm">5 menit lalu</td>
              <td className="px-4 py-3">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-info-light text-info-dark">
                  Check-in
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Image
                    width={40}
                    height={40}
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                    alt="Siti Aminah"
                    className="size-10 rounded-full object-cover"
                  />
                  <span className="font-semibold text-foreground">
                    Siti Aminah
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-secondary font-medium">
                Dr. Jane Smith
              </td>
              <td className="px-4 py-3 text-secondary font-medium">
                Lab Radiologi
              </td>
              <td className="px-4 py-3 text-secondary text-sm">
                15 menit lalu
              </td>
              <td className="px-4 py-3">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-warning-light text-warning-dark">
                  Pemeriksaan
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Image
                    width={40}
                    height={40}
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
                    alt="Agus Wijaya"
                    className="size-10 rounded-full object-cover"
                  />
                  <span className="font-semibold text-foreground">
                    Agus Wijaya
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-secondary font-medium">
                Dr. Robert Chen
              </td>
              <td className="px-4 py-3 text-secondary font-medium">
                Kamar 302B
              </td>
              <td className="px-4 py-3 text-secondary text-sm">
                45 menit lalu
              </td>
              <td className="px-4 py-3">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-success-light text-success-dark">
                  Selesai
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Image
                    width={40}
                    height={40}
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                    alt="Dewi Lestari"
                    className="size-10 rounded-full object-cover"
                  />
                  <span className="font-semibold text-foreground">
                    Dewi Lestari
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-secondary font-medium">
                Dr. Amelia Tanaka
              </td>
              <td className="px-4 py-3 text-secondary font-medium">IGD</td>
              <td className="px-4 py-3 text-secondary text-sm">1 jam lalu</td>
              <td className="px-4 py-3">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-error-light text-error-dark">
                  Darurat
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Image
                    width={40}
                    height={40}
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                    alt="Eko Prasetyo"
                    className="size-10 rounded-full object-cover"
                  />
                  <span className="font-semibold text-foreground">
                    Eko Prasetyo
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-secondary font-medium">
                Dr. Jane Smith
              </td>
              <td className="px-4 py-3 text-secondary font-medium">Apotek</td>
              <td className="px-4 py-3 text-secondary text-sm">2 jam lalu</td>
              <td className="px-4 py-3">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-200 text-gray-600">
                  Ambil Obat
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</main>

        </div>
    )
}