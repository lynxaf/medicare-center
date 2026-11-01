 "use client"

import Image from "next/image"
import { Bell, Calendar, Menu, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { openSidebar } from "../lib/togglesidebar"

export function Header({ title = "Beranda" }: { title?: string }) {
    const [currentTime, setCurrentTime] = useState("")

    useEffect(() => {
        const updateTime = () => {
            setCurrentTime(new Intl.DateTimeFormat("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            }).format(new Date()).replace("pukul", "").replace(/\./g, ":"))
        }
        updateTime()
        const timer = window.setInterval(updateTime, 1000)
        return () => window.clearInterval(timer)
    }, [])

    return (
        <>
        <header>
  <div className="flex items-center justify-between w-full h-[90px] shrink-0 border-b border-border bg-white px-5 md:px-8">
    {/* Mobile hamburger */}
    <button
      onClick={openSidebar}
      aria-label="Open menu"
      className="lg:hidden size-11 flex items-center justify-center rounded-xl ring-1 ring-border hover:ring-primary transition-all duration-300 cursor-pointer"
    >
      <Menu className="size-6 text-foreground" />
    </button>
    {/* Page title (shown on desktop) */}
    <h2 className="hidden lg:block font-bold text-2xl text-foreground">
      {title}
    </h2>
    {/* Right actions */}
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-muted rounded-xl">
        <Calendar className="size-5 text-secondary" />
        <p
          className="text-sm font-medium text-foreground whitespace-nowrap"
        >{currentTime}</p>
      </div>
      <button
        onClick={() => window.dispatchEvent(new Event("open-search-modal"))}
        className="size-11 flex items-center justify-center rounded-xl ring-1 ring-border hover:ring-primary transition-all duration-300 cursor-pointer"
        aria-label="Search"
      >
        <Search className="size-6 text-secondary" />
      </button>
      <button
        className="size-11 flex items-center justify-center rounded-xl ring-1 ring-border hover:ring-primary transition-all duration-300 cursor-pointer relative"
        aria-label="Notifications"
      >
        <Bell className="size-6 text-secondary" />
        <span className="absolute -top-1 -right-1 h-5 px-1.5 rounded-full bg-error text-white text-xs font-medium flex items-center justify-center">
          5
        </span>
      </button>
      <div className="hidden md:flex items-center gap-3 pl-3 border-l border-border">
        <div className="text-right">
          <p className="font-semibold text-foreground text-sm">
            Dr. Amelia Tanaka
          </p>
          <p className="text-secondary text-xs">Cardiologist</p>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop"
          width={40}
          height={40}
          alt="Profile"
          className="size-11 rounded-full object-cover ring-2 ring-border"
        />
      </div>
    </div>
  </div>
</header>
        </>
    )
}