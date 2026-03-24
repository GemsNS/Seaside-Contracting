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

/** Parabolic cable (Angus-inspired): olive green towers, golden suspenders, full-width deck */
function cableY(x: number): number {
  const xv = 600;
  const yv = 46;
  const yL = 104;
  const xL = 88;
  const a = (yL - yv) / (xL - xv) ** 2;
  return a * (x - xv) ** 2 + yv;
}

/**
 * Tall striped stacks + full-span harbour bridge; smoke scales with Halifax temperature (Open-Meteo).
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
  const cableGlowId = useId().replace(/:/g, "");
  const towerFaceId = useId().replace(/:/g, "");
  const smokeBlurId = useId().replace(/:/g, "");

  const smoke = smokeParamsFromTemp(tempC);
  const layerOpacity = fog ? 0.42 : rain ? 0.48 : 0.62;

  const stacks: { cx: number; w: number; h: number }[] = [
    { cx: 78, w: 34, h: 168 },
    { cx: 152, w: 36, h: 186 },
    { cx: 228, w: 34, h: 172 },
  ];

  const plantTopY = 360;

  const bridgeGreen = "#5f7f68";
  const bridgeGreenDark = "#3d5a46";
  const bridgeGreenLight = "#7a9a82";
  const cableGold = "#e8a820";
  const cableGoldDim = "#c87a0a";
  const deckTop = 386;
  const cableControlY = 40;

  const suspenderXs = [
    95, 145, 195, 245, 295, 345, 395, 445, 495, 545, 595, 645, 695, 745, 795, 845, 895, 945, 995, 1045,
    1095,
  ];

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
      <svg className="h-full w-full" viewBox="0 0 1200 480" preserveAspectRatio="none" aria-hidden>
        <defs>
          <pattern id={stripeId} patternUnits="userSpaceOnUse" width="32" height="20">
            <rect width="32" height="10" fill="#e2e8f0" />
            <rect y="10" width="32" height="10" fill="#dc2626" />
          </pattern>
          <linearGradient id={cableGlowId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={cableGoldDim} stopOpacity="0.95" />
            <stop offset="35%" stopColor={cableGold} stopOpacity="1" />
            <stop offset="70%" stopColor="#f5c14d" stopOpacity="1" />
            <stop offset="100%" stopColor={cableGoldDim} stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id={towerFaceId} gradientUnits="objectBoundingBox" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={bridgeGreenDark} />
            <stop offset="45%" stopColor={bridgeGreen} />
            <stop offset="100%" stopColor={bridgeGreenLight} />
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
                    className={motion && !reduceMotion ? "hero-smoke-puff" : undefined}
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

        {/* Full-width bridge deck */}
        <rect x="0" y={deckTop} width="1200" height="14" fill="#2c3e35" opacity="0.92" rx="1" />
        <rect x="0" y={deckTop + 5} width="1200" height="8" fill="#1a2820" opacity="0.55" rx="1" />
        <line x1="0" y1={deckTop + 13} x2="1200" y2={deckTop + 13} stroke="#4a6652" strokeWidth="1.2" opacity="0.5" />

        {/* Left tower */}
        <rect x="58" y="88" width="56" height={298} fill={`url(#${towerFaceId})`} rx="2" opacity="0.95" />
        <path
          d="M 74 98 L 98 98 M 74 128 L 98 128 M 74 158 L 98 158 M 74 188 L 98 188 M 74 218 L 98 218 M 74 248 L 98 248 M 74 278 L 98 278 M 74 308 L 98 308 M 74 338 L 98 338"
          stroke={bridgeGreenDark}
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.65"
        />
        <path
          d="M 66 104 L 106 352 M 106 104 L 66 352"
          stroke={bridgeGreenDark}
          strokeWidth="2.8"
          strokeLinecap="round"
          opacity="0.45"
        />

        {/* Right tower — anchors full span */}
        <rect
          x="1088"
          y="86"
          width="62"
          height={300}
          fill={`url(#${towerFaceId})`}
          rx="2"
          opacity="0.95"
        />
        <path
          d="M 1106 96 L 1132 96 M 1106 128 L 1132 128 M 1106 160 L 1132 160 M 1106 192 L 1132 192 M 1106 224 L 1132 224 M 1106 256 L 1132 256 M 1106 288 L 1132 288 M 1106 320 L 1132 320 M 1106 352 L 1132 352"
          stroke={bridgeGreenDark}
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.65"
        />
        <path
          d="M 1096 102 L 1142 368 M 1142 102 L 1096 368"
          stroke={bridgeGreenDark}
          strokeWidth="2.8"
          strokeLinecap="round"
          opacity="0.45"
        />

        {/* Main suspension cables — edge to edge */}
        <path
          d={`M 86 ${cableY(86)} Q 600 ${cableControlY} 1114 ${cableY(1114)}`}
          fill="none"
          stroke={`url(#${cableGlowId})`}
          strokeWidth="4"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 1px rgba(245, 190, 60, 0.45))" }}
        />
        <path
          d={`M 92 ${cableY(92) + 14} Q 600 ${cableControlY + 22} 1108 ${cableY(1108) + 12}`}
          fill="none"
          stroke={cableGoldDim}
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0.75"
        />

        {/* Suspenders — distributed across full span */}
        {suspenderXs.map((x, i) => {
          const yCable = cableY(x);
          return (
            <line
              key={i}
              x1={x}
              y1={yCable + 8}
              x2={x}
              y2={deckTop - 1}
              stroke="#6b7280"
              strokeWidth="1.1"
              opacity="0.55"
            />
          );
        })}
      </svg>
    </div>
  );
}
