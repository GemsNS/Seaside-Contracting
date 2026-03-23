"use client";

import { useId } from "react";
import type { Ambience, HeroPalette, WeatherMood } from "@/lib/halifaxAmbient";

type Props = {
  palette: HeroPalette;
  ambience: Ambience;
  weatherMood: WeatherMood;
  reduce: boolean;
};

/** Stylized Halifax harbour skyline (waterfront + cranes); reacts to time + weather via palette. */
export function HalifaxSkylineBackdrop({
  palette,
  ambience,
  weatherMood,
  reduce,
}: Props) {
  const cloudGradId = useId().replace(/:/g, "");
  const rainPatId = useId().replace(/:/g, "");
  const skylineEdgeId = useId().replace(/:/g, "");
  /** Harbour band height — skyline sits on this line */
  const waterBand = "clamp(72px, 22vh, 200px)";
  const rain = weatherMood === "rain" || weatherMood === "storm";
  const snow = weatherMood === "snow";
  const fog = weatherMood === "fog";
  const motion = !reduce;

  const sunWarm =
    ambience === "dusk"
      ? "rgba(255, 160, 90, 0.95)"
      : ambience === "dawn"
        ? "rgba(255, 200, 140, 0.9)"
        : "rgba(255, 235, 200, 0.92)";
  const moonCool = "rgba(220, 230, 255, 0.88)";

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="hero-animated-base absolute inset-0"
        style={{ background: palette.gradient }}
      />

      {/* Stars — night / clear-ish */}
      {palette.starOpacity > 0.02 ? (
        <svg
          className={`pointer-events-none absolute inset-0 h-full w-full ${motion ? "hero-starfield" : ""}`}
          style={{ opacity: palette.starOpacity }}
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          {STAR_POINTS.map(([cx, cy, r], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="rgba(255,255,255,0.85)"
              className={motion ? "hero-star-dot" : undefined}
              style={{ animationDelay: `${(i % 9) * 0.35}s` }}
            />
          ))}
        </svg>
      ) : null}

      {/* Sun / moon */}
      {palette.celestial === "sun" ? (
        <div
          className="pointer-events-none absolute left-[12%] top-[10%] h-[min(22vw,180px)] w-[min(22vw,180px)] rounded-full blur-[2px] md:left-[18%] md:top-[12%]"
          style={{
            background: `radial-gradient(circle at 40% 35%, ${sunWarm}, rgba(255,200,120,0.35) 45%, transparent 70%)`,
            boxShadow: `0 0 80px 24px rgba(255, 200, 140, 0.25)`,
          }}
        />
      ) : null}
      {palette.celestial === "moon" ? (
        <div
          className="pointer-events-none absolute right-[14%] top-[8%] h-[min(14vw,120px)] w-[min(14vw,120px)] rounded-full md:right-[20%]"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${moonCool}, rgba(180, 195, 230, 0.4) 50%, transparent 68%)`,
            boxShadow: `0 0 48px 12px rgba(200, 220, 255, 0.2)`,
          }}
        />
      ) : null}

      {/* Cloud layers */}
      <svg
        className="pointer-events-none absolute -left-[5%] top-[6%] h-[38%] w-[110%] md:top-[8%]"
        viewBox="0 0 1200 220"
        preserveAspectRatio="none"
        style={{ opacity: palette.cloudOpacity }}
      >
        <defs>
          <linearGradient id={cloudGradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
          </linearGradient>
        </defs>
        <g className={motion ? "hero-cloud-a" : undefined}>
          <ellipse cx="200" cy="80" rx="160" ry="42" fill={`url(#${cloudGradId})`} />
          <ellipse cx="320" cy="88" rx="120" ry="36" fill={`url(#${cloudGradId})`} />
        </g>
        <g className={motion ? "hero-cloud-b" : undefined}>
          <ellipse cx="780" cy="70" rx="200" ry="48" fill={`url(#${cloudGradId})`} />
          <ellipse cx="960" cy="78" rx="140" ry="40" fill={`url(#${cloudGradId})`} />
        </g>
      </svg>

      {/* Fog near water */}
      {fog ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%]"
          style={{
            background: `linear-gradient(to top, rgba(180,195,205,0.35) 0%, rgba(140,155,170,0.12) 45%, transparent 100%)`,
          }}
        />
      ) : null}

      {/* Rain */}
      {rain ? (
        <svg
          className={`pointer-events-none absolute inset-0 h-full w-full ${motion ? "hero-rain-layer" : ""}`}
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id={rainPatId} width="48" height="48" patternUnits="userSpaceOnUse">
              <path
                d="M8 0 L4 28 M28 8 L22 36 M38 2 L34 30"
                stroke="rgba(200,220,235,0.35)"
                strokeWidth="1.2"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="1200" height="800" fill={`url(#${rainPatId})`} />
        </svg>
      ) : null}

      {/* Snow */}
      {snow ? (
        <svg
          className={`pointer-events-none absolute inset-0 h-full w-full ${motion ? "hero-snow-layer" : ""}`}
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          {SNOW_FLAKES.map(([cx, cy, r], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="rgba(255,255,255,0.55)"
              className={motion ? "hero-snow-flake" : undefined}
              style={{ animationDelay: `${(i % 12) * 0.4}s` }}
            />
          ))}
        </svg>
      ) : null}

      {/* Ambient glow (subtle, behind city) */}
      <div
        className={`absolute -left-[18%] top-[-12%] h-[min(85vw,720px)] w-[min(85vw,720px)] rounded-full blur-[120px] ${
          reduce ? "opacity-60" : "hero-orb-drift"
        }`}
        style={{ backgroundColor: palette.orbA }}
      />
      <div
        className={`absolute -right-[12%] bottom-[18%] h-[min(70vw,560px)] w-[min(70vw,560px)] rounded-full blur-[100px] ${
          reduce ? "opacity-50" : "hero-orb-drift-delayed"
        }`}
        style={{ backgroundColor: palette.orbB }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 90% 65% at 50% -5%, ${palette.topGlow}, transparent 50%)`,
        }}
      />

      {/* Harbour water */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-full"
        style={{
          height: "min(22vh, 200px)",
          background: `linear-gradient(to bottom, ${palette.waterSurface} 0%, ${palette.waterDeep} 100%)`,
        }}
      >
        <div
          className="hero-wave-layer absolute bottom-full left-[-8%] w-[116%] translate-y-[1px] text-primary-aqua"
          style={{ opacity: palette.waveOpacity }}
        >
          <svg viewBox="0 0 1440 100" className="w-full" preserveAspectRatio="none" role="presentation">
            <path
              fill="currentColor"
              fillOpacity="0.45"
              d="M0,48L60,52C120,56,240,64,360,58C480,52,600,32,720,28C840,24,960,36,1080,42C1200,48,1320,48,1380,48L1440,48V100H0Z"
            />
          </svg>
        </div>
        <div
          className="absolute inset-0"
          style={{
            opacity: Math.min(0.55, 0.25 + palette.reflectionOpacity),
            background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)`,
            animation: motion ? "hero-water-shimmer 14s ease-in-out infinite alternate" : undefined,
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-10"
          style={{
            opacity: palette.reflectionOpacity,
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.06), transparent)",
          }}
        />
      </div>

      {/* Skyline + lit windows — base sits on harbour line */}
      <div
        className="pointer-events-none absolute left-0 z-[1] w-full"
        style={{ bottom: waterBand, height: "min(36vh, 280px)" }}
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 1200 200"
          preserveAspectRatio="xMidYMax meet"
        >
          <defs>
            <linearGradient id={skylineEdgeId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
            </linearGradient>
          </defs>
          <path fill={palette.skylineSilhouette} d={SKYLINE_PATH} />
          <path fill={`url(#${skylineEdgeId})`} d={SKYLINE_PATH} opacity={0.5} />
          <g style={{ opacity: palette.windowGlowOpacity }}>
            {WINDOW_RECTS.map(([x, y, w, h], i) => (
              <rect
                key={i}
                x={x}
                y={y}
                width={w}
                height={h}
                rx={1}
                fill={palette.windowGlow}
                className={motion ? "hero-window-flicker" : undefined}
                style={{ animationDelay: `${(i % 7) * 0.45}s` }}
              />
            ))}
          </g>
        </svg>
      </div>

      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${palette.vignetteBottom} 0%, rgba(0,0,0,0.22) 42%, rgba(0,0,0,0.18) 100%)`,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          opacity: palette.gridOpacity * 0.6,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}

/** Waterfront + downtown-inspired silhouette (Harbour, Purdy’s Wharf–style massing, crane). */
const SKYLINE_PATH =
  "M0 200 L0 132 L42 132 L42 98 L72 98 L72 132 L118 132 L118 76 L162 76 L162 132 L218 132 L218 106 L256 106 L256 132 L312 132 L312 54 L376 54 L376 132 L432 132 L432 90 L498 90 L498 126 L564 126 L564 68 L626 68 L626 126 L684 126 L684 100 L736 100 L736 134 L802 134 L802 82 L868 82 L868 130 L934 130 L934 116 L1018 116 L1018 142 L1088 142 L1088 108 L1148 108 L1148 138 L1200 138 L1200 200 Z";

const STAR_POINTS: [number, number, number][] = [
  [80, 90, 1.1],
  [140, 120, 0.8],
  [220, 70, 1],
  [310, 100, 0.7],
  [400, 60, 1.2],
  [480, 130, 0.6],
  [560, 85, 0.9],
  [640, 110, 0.7],
  [720, 75, 1],
  [800, 95, 0.8],
  [880, 65, 1.1],
  [960, 115, 0.7],
  [1040, 80, 0.9],
  [1120, 100, 0.8],
  [180, 150, 0.6],
  [350, 160, 0.5],
  [520, 155, 0.7],
  [690, 145, 0.6],
  [850, 155, 0.5],
  [1000, 150, 0.7],
  [250, 45, 0.9],
  [600, 50, 0.8],
  [900, 55, 0.7],
  [1050, 40, 1],
  [70, 200, 0.5],
  [1150, 180, 0.6],
];

const SNOW_FLAKES: [number, number, number][] = [
  [100, 80, 2],
  [200, 120, 1.5],
  [320, 60, 2.2],
  [440, 140, 1.8],
  [560, 90, 2],
  [680, 160, 1.5],
  [780, 70, 2.1],
  [900, 130, 1.7],
  [1020, 100, 2],
  [150, 200, 1.4],
  [400, 220, 1.9],
  [700, 240, 1.6],
  [950, 210, 2],
  [1100, 180, 1.5],
  [50, 300, 1.8],
  [300, 320, 2],
  [550, 280, 1.6],
  [800, 300, 1.9],
  [1050, 260, 1.7],
];

const WINDOW_RECTS: [number, number, number, number][] = [
  [24, 140, 6, 8],
  [34, 152, 6, 8],
  [24, 152, 6, 8],
  [128, 88, 8, 10],
  [142, 88, 8, 10],
  [128, 102, 8, 10],
  [328, 72, 7, 9],
  [340, 72, 7, 9],
  [352, 84, 7, 9],
  [420, 104, 8, 9],
  [432, 104, 8, 9],
  [580, 86, 7, 8],
  [592, 86, 7, 8],
  [604, 98, 7, 8],
  [748, 112, 7, 8],
  [760, 112, 7, 8],
  [820, 96, 8, 9],
  [834, 96, 8, 9],
  [920, 124, 7, 8],
  [932, 124, 7, 8],
  [944, 124, 7, 8],
  [1040, 128, 6, 7],
  [1050, 128, 6, 7],
];
