"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface AnimatedCounterProps {
  target: number;
  label: string;
  suffix?: string;
}

export function AnimatedCounter({
  target,
  label,
  suffix = "+",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const animate = useCallback(() => {
    if (hasAnimated) return;
    setHasAnimated(true);

    const duration = 1500;
    const startTime = performance.now();

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }, [hasAnimated, target]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [animate]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center px-4 py-2">
      <div className="text-2xl font-bold text-primary md:text-3xl">
        {count}{suffix}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
