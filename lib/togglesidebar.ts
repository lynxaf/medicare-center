"use client"

const SIDEBAR_EVENTS = {
  open: "open-sidebar",
  close: "close-sidebar",
  toggle: "toggle-sidebar",
} as const

function dispatchSidebarEvent(eventName: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(eventName))
  }
}

export function openSidebar() {
  dispatchSidebarEvent(SIDEBAR_EVENTS.open)
}

export function closeSidebar() {
  dispatchSidebarEvent(SIDEBAR_EVENTS.close)
}

export function toggleSidebar() {
  dispatchSidebarEvent(SIDEBAR_EVENTS.toggle)
}