 "use client"

import {
  ClipboardList,
  HelpCircle,
  HeartPulse,
  LayoutDashboard,
  MessageCircleQuestion,
  Settings,
  Users,
  X,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { closeSidebar } from "../lib/togglesidebar"

export function Aside() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
      const handleOpen = () => setIsOpen(true)
      const handleClose = () => setIsOpen(false)
      const handleToggle = () => setIsOpen((current) => !current)

      window.addEventListener("open-sidebar", handleOpen)
      window.addEventListener("close-sidebar", handleClose)
      window.addEventListener("toggle-sidebar", handleToggle)
      return () => {
        window.removeEventListener("open-sidebar", handleOpen)
        window.removeEventListener("close-sidebar", handleClose)
        window.removeEventListener("toggle-sidebar", handleToggle)
      }
    }, [])

    const isActive = (path: string) => pathname === path

    return (
        <>
        <aside
  id="sidebar"
  className={`flex flex-col w-[280px] shrink-0 h-screen fixed inset-y-0 left-0 z-50 bg-white border-r border-border transform ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 overflow-hidden`}
>
  {/* Top Bar with logo and title */}
  <div className="flex items-center justify-between border-b border-border h-[90px] px-5 gap-3">
    <div className="flex items-center gap-3">
      <div className="w-11 h-9 bg-primary rounded-xl flex items-center justify-center">
        <HeartPulse className="w-5 h-5 text-white" />
      </div>
      <h1 className="font-semibold text-xl">MediCare</h1>
    </div>
    <button
      onClick={closeSidebar}
      aria-label="Close sidebar"
      className="lg:hidden size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center ring-1 ring-border hover:ring-primary transition-all duration-300 cursor-pointer"
    >
      <X className="size-6 text-secondary" />
    </button>
  </div>
  {/* Navigation Menu */}
  <div className="flex flex-col p-5 pb-28 gap-6 overflow-y-auto flex-1">
    {/* Menu Section */}
    <div className="flex flex-col gap-4">
      <h3 className="font-medium text-sm text-secondary">Main Menu</h3>
      <div className="flex flex-col gap-1">
        {/* Active menu item */}
        <Link
          href="/dashboard/overview"
          onClick={closeSidebar}
          className={`group cursor-pointer ${isActive("/dashboard/overview") ? "active" : ""}`}
        >
          <div className="flex items-center rounded-xl p-4 gap-3 bg-white group-[.active]:bg-muted group-hover:bg-muted transition-all duration-300">
            <LayoutDashboard className="size-6 text-secondary group-[.active]:text-foreground group-hover:text-foreground transition-all duration-300" />
            <span className="font-medium text-secondary group-[.active]:font-semibold group-[.active]:text-foreground group-hover:text-foreground transition-all duration-300">
              Beranda
            </span>
          </div>
        </Link>
        {/* Regular menu items */}
        <Link
          href="/dashboard/pasien"
          onClick={closeSidebar}
          className={`group cursor-pointer ${isActive("/dashboard/pasien") ? "active" : ""}`}
        >
          <div className="flex items-center rounded-xl p-4 gap-3 bg-white group-[.active]:bg-muted group-hover:bg-muted transition-all duration-300">
            <Users className="size-6 text-secondary group-[.active]:text-foreground group-hover:text-foreground transition-all duration-300" />
            <span className="font-medium text-secondary group-[.active]:font-semibold group-[.active]:text-foreground group-hover:text-foreground transition-all duration-300">
              Pasien
            </span>
          </div>
        </Link>
        <Link
          href="/dashboard/administrasi"
          onClick={closeSidebar}
          className={`group cursor-pointer ${isActive("/dashboard/administrasi") ? "active" : ""}`}
        >
          <div className="flex items-center rounded-xl p-4 gap-3 bg-white group-[.active]:bg-muted group-hover:bg-muted transition-all duration-300">
            <ClipboardList className="size-6 text-secondary group-[.active]:text-foreground group-hover:text-foreground transition-all duration-300" />
            <span className="font-medium text-secondary group-[.active]:font-semibold group-[.active]:text-foreground group-hover:text-foreground transition-all duration-300">
              Administrasi
            </span>
          </div>
        </Link>
      </div>
    </div>
    {/* Support Section */}
    <div className="flex flex-col gap-4">
      <h3 className="font-medium text-sm text-secondary">Support</h3>
      <div className="flex flex-col gap-1">
        <Link
          href="/dashboard/pusat-bantuan"
          onClick={closeSidebar}
          className={`group cursor-pointer ${isActive("/dashboard/pusat-bantuan") ? "active" : ""}`}
        >
          <div className="flex items-center rounded-xl p-4 gap-3 bg-white group-[.active]:bg-muted group-hover:bg-muted transition-all duration-300">
            <HelpCircle className="size-6 text-secondary group-[.active]:text-foreground group-hover:text-foreground transition-all duration-300" />
            <span className="font-medium text-secondary group-[.active]:font-semibold group-[.active]:text-foreground group-hover:text-foreground transition-all duration-300">
              Pusat Bantuan
            </span>
          </div>
        </Link>
        <Link
          href="/dashboard/pengaturan"
          onClick={closeSidebar}
          className={`group cursor-pointer ${isActive("/dashboard/pengaturan") ? "active" : ""}`}
        >
          <div className="flex items-center rounded-xl p-4 gap-3 bg-white group-[.active]:bg-muted group-hover:bg-muted transition-all duration-300">
            <Settings className="size-6 text-secondary group-[.active]:text-foreground group-hover:text-foreground transition-all duration-300" />
            <span className="font-medium text-secondary group-[.active]:font-semibold group-[.active]:text-foreground group-hover:text-foreground transition-all duration-300">
              Pengaturan
            </span>
          </div>
        </Link>
      </div>
    </div>
  </div>
  {/* Bottom Help Card */}
  <div className="absolute bottom-0 left-0 w-[280px]">
    <div className="flex items-center justify-between border-t bg-white border-border p-5 gap-3">
      <div className="min-w-0">
        <p className="font-semibold text-foreground">Butuh bantuan?</p>
        <Link href="/dashboard/pengaturan#support" className="cursor-pointer">
          <span className="text-sm text-secondary hover:text-primary hover:underline transition-all duration-300">
            Hubungi support
          </span>
        </Link>
      </div>
      <div className="size-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
        <MessageCircleQuestion className="size-6 text-primary" />
      </div>
    </div>
  </div>
</aside>
</>
    )
}