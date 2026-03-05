/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";

type Bubble = {
  id: string;
  size: number; // px
  left: number; // %
  delay: number; // s
  duration: number; // s
  drift: number; // px
  opacity: number; // 0-1
};

type BubbleFieldProps = {
  className?: string;
  count?: number;
  /** Altura de subida aprox en px */
  rise?: number;
};

export default function Bubble({
  className = "",
  count = 18,
  rise = 140,
}: BubbleFieldProps) {
  const bubbles = useMemo(() => makeBubbles(count), [count]);

  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl",
        // Dale tamaño si no lo traes por className
        "w-72 h-72",
        className,
      ].join(" ")}
    >
      <style>{`
        @keyframes bubbleFloat {
          0%   { transform: translate(var(--drift, 0px), 24px) scale(.85); opacity: 0; }
          10%  { opacity: var(--opacity, .55); }
          75%  { opacity: var(--opacity, .55); }
          100% { transform: translate(calc(var(--drift, 0px) * -1), calc(var(--rise, -140px))) scale(1.15); opacity: 0; }
        }
      `}</style>

      {/* Fondo (opcional) */}
      <div className="absolute inset-0 bg-transparent" />

      {/* Burbujas */}
      <div className="pointer-events-none absolute inset-0">
        {bubbles.map((b) => (
          <span
            key={b.id}
            className="absolute bottom-0 rounded-full border border-[#4FC6E3] bg-[#4FC6E3]/20 backdrop-blur-[1px]"
            style={{
              width: b.size,
              height: b.size,
              left: `${b.left}%`,
              ["--drift" as any]: `${b.drift}px`,
              ["--opacity" as any]: `${b.opacity}`,
              ["--rise" as any]: `-${rise}px`,
              animation: `bubbleFloat ${b.duration}s ease-in-out infinite`,
              animationDelay: `${b.delay}s`,
              willChange: "transform, opacity",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function makeBubbles(count: number): Bubble[] {
  const rand = (min: number, max: number) => min + Math.random() * (max - min);
  return Array.from({ length: count }).map((_, i) => ({
    id: `${i}-${Math.random().toString(16).slice(2)}`,
    size: Math.round(rand(6, 18)),
    left: rand(5, 95),
    delay: rand(0, 3),
    duration: rand(2.5, 5.5),
    drift: rand(-18, 18),
    opacity: rand(0.25, 0.6),
  }));
}