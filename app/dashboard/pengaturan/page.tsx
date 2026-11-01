"use client"

import { Aside } from "../../../components/aside"
import { Header } from "../../../components/header"
import { Bell, Check, LockKeyhole, MessageCircleQuestion, Save, UserRound } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function PengaturanPage() {
  const [notifications, setNotifications] = useState(true)
  const [saved, setSaved] = useState(false)

  const saveSettings = () => {
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2500)
  }

  return (
    <>
      <Aside />
      <main className="min-h-screen flex-1 overflow-x-hidden bg-white lg:ml-[280px]">
        <Header title="Pengaturan" />
        <div className="mx-auto max-w-5xl space-y-6 p-5 md:p-8">
          <div>
            <h1 className="text-2xl font-bold">Pengaturan akun</h1>
            <p className="mt-1 text-secondary">Kelola profil dan preferensi aplikasi Anda.</p>
          </div>

          <section className="rounded-2xl border border-border p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                <UserRound className="size-6 text-primary" />
              </div>
              <div>
                <h2 className="font-bold">Informasi profil</h2>
                <p className="text-sm text-secondary">Data yang tampil pada akun Anda.</p>
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm font-semibold">
                Nama lengkap
                <input defaultValue="Dr. Amelia Tanaka" className="h-12 w-full rounded-xl border border-border px-4 font-normal outline-none focus:border-primary" />
              </label>
              <label className="space-y-2 text-sm font-semibold">
                Jabatan
                <input defaultValue="Cardiologist" className="h-12 w-full rounded-xl border border-border px-4 font-normal outline-none focus:border-primary" />
              </label>
              <label className="space-y-2 text-sm font-semibold md:col-span-2">
                Email
                <input type="email" defaultValue="amelia.tanaka@medicare.id" className="h-12 w-full rounded-xl border border-border px-4 font-normal outline-none focus:border-primary" />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-border p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                <Bell className="size-6 text-primary" />
              </div>
              <div>
                <h2 className="font-bold">Notifikasi</h2>
                <p className="text-sm text-secondary">Atur pemberitahuan yang ingin Anda terima.</p>
              </div>
            </div>
            <button type="button" onClick={() => setNotifications((current) => !current)} className="flex w-full items-center justify-between gap-4 text-left">
              <span>
                <span className="block font-semibold">Notifikasi aktivitas</span>
                <span className="text-sm text-secondary">Terima informasi tentang pasien dan administrasi terbaru.</span>
              </span>
              <span className={`flex h-7 w-12 shrink-0 items-center rounded-full p-1 transition-colors ${notifications ? "bg-primary justify-end" : "bg-gray-200 justify-start"}`} aria-label={notifications ? "Aktif" : "Nonaktif"}>
                <span className="size-5 rounded-full bg-white shadow-sm" />
              </span>
            </button>
          </section>

          <section id="support" className="flex flex-col gap-5 rounded-2xl border border-border bg-muted p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <MessageCircleQuestion className="size-6 text-primary" />
              </div>
              <div>
                <h2 className="font-bold">Butuh bantuan?</h2>
                <p className="mt-1 text-sm text-secondary">Tim support kami siap membantu Anda.</p>
              </div>
            </div>
            <Link href="/dashboard/pusat-bantuan" className="w-fit rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
              Hubungi support
            </Link>
          </section>

          <section className="rounded-2xl border border-border p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                <LockKeyhole className="size-6 text-primary" />
              </div>
              <div>
                <h2 className="font-bold">Keamanan</h2>
                <p className="text-sm text-secondary">Jaga keamanan akun Anda.</p>
              </div>
            </div>
            <button type="button" className="rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">
              Ubah kata sandi
            </button>
          </section>

          <div className="flex items-center justify-end gap-4">
            {saved && <span className="flex items-center gap-2 text-sm font-medium text-success"><Check className="size-4" />Pengaturan tersimpan</span>}
            <button type="button" onClick={saveSettings} className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-hover">
              <Save className="size-5" />
              Simpan perubahan
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
