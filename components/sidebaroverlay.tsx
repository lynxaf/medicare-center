"use client"

import { useEffect, useState } from "react"
import { closeSidebar } from "../lib/togglesidebar"

export function SidebarOverlay() {
  const [isOpen, setIsOpen] = useState(false)

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

  if (!isOpen) return null

  return (
    <button
      type="button"
      aria-label="Tutup menu"
      className="fixed inset-0 z-40 bg-black/80 lg:hidden"
      onClick={closeSidebar}
    />
  )
}