"use client";

import { useId } from "react";
import { smokeParamsFromTemp } from "@/lib/smokeFromTemp";

type Props = {
  waterBand: string;
  motion: boolean;
  fog: boolean;
  rain: boolean;
  tempC: number | null;
  reduceMotion: boolean;
};

/**
 * Tall striped stacks + bridge; billowing smoke scales with Halifax temperature (Open-Meteo).
 */
export function HarbourBridgeStacks({
  waterBand,
  motion,
  fog,
  rain,
  tempC,
  reduceMotion,
}: Props) {
  const stripeId = useId().replace(/:/g, "");
  const cableGradId = useId().replace(/:/g, "");
  const smokeBlurId = useId().replace(/:/g, "");

  const smoke = smokeParamsFromTemp(tempC);
  const layerOpacity = fog ? 0.42 : rain ? 0.48 : 0.62;

  const stacks: { cx: number; w: number; h: number }[] = [
    { cx: 78, w: 34, h: 168 },
    { cx: 152, w: 36, h: 186 },
    { cx: 228, w: 34, h: 172 },
  ];

  const plantTopY = 360;

  return (
    <div
      className={`pointer-events-none absolute left-0 z-0 w-full overflow-visible ${
        motion && !reduceMotion ? "hero-harbour-drift" : ""
      }`}
      style={{
        bottom: waterBand,
        height: "min(52vh, 440px)",
        opacity: layerOpacity,
      }}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1200 480"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden
      >
        <defs>
          <pattern
            id={stripeId}
            patternUnits="userSpaceOnUse"
            width="32"
            height="20"
          >
            <rect width="32" height="10" fill="#e2e8f0" />
            <rect y="10" width="32" height="10" fill="#dc2626" />
          </pattern>
          <linearGradient id={cableGradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#57534e" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#44403c" stopOpacity="0.62" />
            <stop offset="100%" stopColor="#57534e" stopOpacity="0.55" />
          </linearGradient>
          <filter id={smokeBlurId} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={smoke.blurStd} result="b" />
          </filter>
        </defs>

        <rect x="20" y="360" width="292" height="120" fill="#64748b" opacity="0.45" />
        <rect x="36" y="332" width="252" height="32" fill="#94a3b8" opacity="0.35" />

        {stacks.map(({ cx, w, h }, idx) => {
          const x = cx - w / 2;
          const y = plantTopY - h;
          return (
            <rect
              key={`stack-${idx}`}
              x={x}
              y={y}
              width={w}
              height={h}
              rx="3"
              fill={`url(#${stripeId})`}
              stroke="rgba(15,23,42,0.45)"
              strokeWidth="1.2"
            />
          );
        })}

        {/* Plumes — one group per stack */}
        {stacks.map(({ cx, h }, sIdx) => {
          const topY = plantTopY - h;
          const layers = smoke.layers;
          return (
            <g key={`smoke-${sIdx}`} filter={`url(#${smokeBlurId})`} opacity={smoke.opacity}>
              {Array.from({ length: layers }).map((_, i) => {
                const s = smoke.puffScale * (1 + i * 0.22);
                const ox = (i % 2 === 0 ? 1 : -1) * (4 + i * 3);
                return (
                  <ellipse
                    key={i}
                    className={
                      motion && !reduceMotion ? "hero-smoke-puff" : undefined
                    }
                    cx={cx + ox}
                    cy={topY - 8 - i * 36 * smoke.puffScale}
                    rx={22 * s}
                    ry={15 * s}
                    fill="rgba(226,232,240,0.9)"
                    style={{
                      animationDelay: `${i * 0.55 + sIdx * 0.3}s`,
                      animationDuration: `${smoke.durationSec}s`,
                    }}
                  />
                );
              })}
            </g>
          );
        })}

        <rect x="268" y="310" width="44" height="170" fill="#1e293b" opacity="0.82" rx="2" />

        <path
          d="M 290 300 Q 620 120 1048 105"
          fill="none"
          stroke={`url(#${cableGradId})`}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M 305 308 Q 625 130 1035 115"
          fill="none"
          stroke="#334155"
          strokeWidth="2"
          opacity="0.45"
        />

        {[
          [380, 175],
          [500, 145],
          [680, 118],
          [860, 108],
          [980, 102],
        ].map(([x, cy], i) => (
          <line
            key={i}
            x1={x}
            y1={cy}
            x2={x}
            y2={392}
            stroke="#475569"
            strokeWidth="1.2"
            opacity="0.4"
          />
        ))}

        <rect x="300" y="388" width="860" height="14" fill="#0f172a" opacity="0.88" rx="1" />
        <line
          x1="300"
          y1="402"
          x2="1160"
          y2="402"
          stroke="#334155"
          strokeWidth="2"
          opacity="0.45"
        />

        <rect x="1018" y="95" width="58" height="278" fill="#1e293b" opacity="0.9" rx="2" />
        <path
          d="M 1026 110 L 1068 260 M 1068 110 L 1026 260"
          stroke="#334155"
          strokeWidth="4.5"
          strokeLinecap="round"
          opacity="0.88"
        />
        <path
          d="M 1036 140 L 1058 230 M 1058 140 L 1036 230"
          stroke="#475569"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}
