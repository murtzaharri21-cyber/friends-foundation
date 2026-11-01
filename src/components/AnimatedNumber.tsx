"use client";

import { useEffect, useMemo, useRef } from "react";

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
  const parsed = useMemo(() => parseNumber(value), [value]);
  const target = parsed?.target;

  useEffect(() => {
    if (target === undefined || !parsed) return;

    const element = ref.current;
    if (!element) return;
    const textNode = element.firstChild;
    if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return;

    let frame = 0;
    let hasStarted = false;
    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: parsed.decimals,
      maximumFractionDigits: parsed.decimals,
    });

    const startAnimation = () => {
      if (hasStarted) return;
      hasStarted = true;
      const startTime = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - startTime) / animationDuration, 1);
        const easedProgress = 1 - (1 - progress) ** 3;
        textNode.nodeValue = `${parsed.prefix}${formatter.format(target * easedProgress)}${parsed.suffix}`;

        if (progress < 1) {
          frame = window.requestAnimationFrame(animate);
        } else {
          textNode.nodeValue = value;
        }
      };
      frame = window.requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [parsed, target, value]);

  if (!parsed) return <span className={className}>{value}</span>;

  return (
    <span className={className} aria-label={value}>
      <span ref={ref} aria-hidden="true">{value}</span>
    </span>
  );
}
