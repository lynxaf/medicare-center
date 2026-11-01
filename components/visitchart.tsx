 "use client"

import { useState } from "react"

const visits = [65, 59, 80, 81, 56, 55, 90]
const visitDays = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]
const monthlyVisits = [210, 245, 230, 280, 265, 310, 295, 340, 325, 360, 348, 390]
const monthLabels = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]

export function VisitChart() {
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly")
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const width = 720
  const height = 250
  const padding = { top: 16, right: 12, bottom: 38, left: 42 }
  const chartVisits = period === "weekly" ? visits : monthlyVisits
  const chartLabels = period === "weekly" ? visitDays : monthLabels
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom
  const chartMax = period === "weekly" ? 100 : 400
  const points = chartVisits.map((value, index) => {
    const x = padding.left + (index * chartWidth) / (chartVisits.length - 1)
    const y = padding.top + chartHeight - (value / chartMax) * chartHeight
    return `${x},${y}`
  })
  const areaPath = `M ${padding.left},${padding.top + chartHeight} L ${points.join(" L ")} L ${padding.left + chartWidth},${padding.top + chartHeight} Z`

  return (
    <div className="min-w-[400px]">
      <div className="flex items-center justify-end gap-1 mb-2">
        {([
          ["weekly", "Mingguan"],
          ["monthly", "Bulanan"],
        ] as const).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => {
              setPeriod(value)
              setActiveIndex(null)
            }}
            className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
              period === value
                ? "bg-primary text-white"
                : "text-secondary hover:bg-muted"
            }`}
            aria-pressed={period === value}
          >
            {label}
          </button>
        ))}
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-[250px] w-full md:h-[300px]"
        role="img"
        aria-label={`Grafik kunjungan pasien ${period === "weekly" ? "mingguan" : "bulanan"}`}
      >
        {[0, 25, 50, 75, 100].map((percentage) => {
          const value = (percentage / 100) * chartMax
          const y = padding.top + chartHeight - (value / chartMax) * chartHeight
          return (
            <g key={percentage}>
              <line
                x1={padding.left}
                x2={width - padding.right}
                y1={y}
                y2={y}
                stroke="#F3F4F3"
                strokeDasharray="4 4"
              />
              <text
                x={padding.left - 10}
                y={y + 4}
                textAnchor="end"
                className="fill-gray-500 text-[11px]"
              >
                {value}
              </text>
            </g>
          )
        })}
        <path d={areaPath} fill="url(#visitGradient)" />
        <polyline
          points={points.join(" ")}
          fill="none"
          stroke="#165DFF"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {points.map((point, index) => {
          const [x, y] = point.split(",")
          return (
            <g
              key={chartLabels[index]}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
              onPointerDown={() => setActiveIndex(index)}
              tabIndex={0}
              role="button"
              aria-label={`${chartLabels[index]}, ${chartVisits[index]} pasien`}
              className="cursor-pointer outline-none"
            >
              <circle cx={x} cy={y} r="12" fill="transparent" />
              <circle cx={x} cy={y} r="4" fill="#165DFF" />
              <title>{`${chartLabels[index]}: ${chartVisits[index]} pasien`}</title>
            </g>
          )
        })}
        {activeIndex !== null && (() => {
          const [x, y] = points[activeIndex].split(",").map(Number)
          const tooltipWidth = 142
          const tooltipHeight = 52
          const tooltipX = Math.min(
            Math.max(x - tooltipWidth / 2, padding.left),
            width - padding.right - tooltipWidth,
          )
          const tooltipY = Math.max(y - tooltipHeight - 18, padding.top)

          return (
            <g pointerEvents="none">
              <line
                x1={x}
                x2={x}
                y1={y + 8}
                y2={padding.top + chartHeight}
                stroke="#165DFF"
                strokeDasharray="3 4"
                strokeOpacity="0.35"
              />
              <circle cx={x} cy={y} r="8" fill="#165DFF" fillOpacity="0.16" />
              <circle cx={x} cy={y} r="5" fill="#165DFF" stroke="white" strokeWidth="2" />
              <rect
                x={tooltipX}
                y={tooltipY}
                width={tooltipWidth}
                height={tooltipHeight}
                rx="10"
                fill="white"
                stroke="#E5E7EB"
                strokeWidth="1"
                filter="url(#tooltipShadow)"
              />
              <path
                d={`M ${x - 6} ${tooltipY + tooltipHeight} L ${x} ${tooltipY + tooltipHeight + 6} L ${x + 6} ${tooltipY + tooltipHeight} Z`}
                fill="white"
                stroke="#E5E7EB"
                strokeWidth="1"
                strokeLinejoin="round"
              />
              <text
                x={tooltipX + 14}
                y={tooltipY + 19}
                fill="#6A7686"
                className="text-[11px] font-medium"
              >
                Kunjungan {chartLabels[activeIndex]}
              </text>
              <text
                x={tooltipX + 14}
                y={tooltipY + 40}
                fill="#080C1A"
                className="text-[14px] font-bold"
              >
                {chartVisits[activeIndex]} pasien
              </text>
            </g>
          )
        })()}
        {chartLabels.map((label, index) => {
          const x = padding.left + (index * chartWidth) / (chartLabels.length - 1)
          return (
            <text
              key={label}
              x={x}
              y={height - 10}
              textAnchor="middle"
              className="fill-gray-500 text-[11px]"
            >
              {label}
            </text>
          )
        })}
        <defs>
          <filter id="tooltipShadow" x="-20%" y="-20%" width="140%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#080C1A" floodOpacity="0.12" />
          </filter>
          <linearGradient id="visitGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#165DFF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#165DFF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}