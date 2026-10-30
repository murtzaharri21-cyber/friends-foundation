"use client";

import { useEffect, useRef, useState } from "react";

const numberPattern = /^([^0-9]*)([\d,]+(?:\.\d+)?)(.*)$/;
const animationDuration = 3200;

function parseNumber(value: string) {
  const match = numberPattern.exec(value);
  if (!match) return null;

  const decimals = match[2].split(".")[1]?.length ?? 0;
  return {
    prefix: match[1],
    suffix: match[3],
    target: Number(match[2].replaceAll(",", "")),
    decimals,
  };
}

export default function AnimatedNumber({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const parsed = parseNumber(value);
  const target = parsed?.target;
  const [count, setCount] = useState(target ?? 0);

  useEffect(() => {
    if (target === undefined) return;

    const element = ref.current;
    if (!element) return;

    let frame = 0;
    let hasStarted = false;

    const startAnimation = () => {
      if (hasStarted) return;
      hasStarted = true;
      window.cancelAnimationFrame(frame);
      setCount(0);
      const startTime = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - startTime) / animationDuration, 1);
        const easedProgress = 1 - (1 - progress) ** 3;
        setCount(target * easedProgress);

        if (progress < 1) {
          frame = window.requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };
      frame = window.requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          hasStarted = false;
          window.cancelAnimationFrame(frame);
          frame = 0;
          setCount(target);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [target, value]);

  if (!parsed) return <span className={className}>{value}</span>;

  const formattedCount = count.toLocaleString("en-US", {
    minimumFractionDigits: parsed.decimals,
    maximumFractionDigits: parsed.decimals,
  });

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden="true">
        {parsed.prefix}
        {formattedCount}
        {parsed.suffix}
      </span>
    </span>
  );
}
