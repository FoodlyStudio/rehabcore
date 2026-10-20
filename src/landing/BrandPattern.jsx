import React, { useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import usePrefersReducedMotion from './hooks/usePrefersReducedMotion';

// Angular "motion-blur" slashes echoing the chevron trail in the MOTIVO mark —
// a field of skewed parallelograms that drift and tilt with cursor/scroll.
const SHAPES = [
  { top: '14%', left: '58%', w: 220, h: 46, rot: -22, blur: 0, opacity: 0.16, depth: 0.03 },
  { top: '22%', left: '68%', w: 140, h: 30, rot: -22, blur: 1, opacity: 0.12, depth: 0.05 },
  { top: '8%', left: '78%', w: 90, h: 20, rot: -22, blur: 2, opacity: 0.1, depth: 0.07 },
  { top: '58%', left: '4%', w: 180, h: 38, rot: 18, blur: 0, opacity: 0.14, depth: 0.04 },
  { top: '68%', left: '14%', w: 110, h: 24, rot: 18, blur: 1, opacity: 0.1, depth: 0.06 },
  { top: '40%', left: '86%', w: 130, h: 28, rot: -22, blur: 1, opacity: 0.1, depth: 0.06 },
  { top: '78%', left: '70%', w: 160, h: 34, rot: 18, blur: 0, opacity: 0.12, depth: 0.045 },
  { top: '4%', left: '30%', w: 70, h: 16, rot: -22, blur: 2, opacity: 0.08, depth: 0.08 },
];

export default function BrandPattern() {
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smoothX = useSpring(mx, { stiffness: 40, damping: 20, mass: 0.5 });
  const smoothY = useSpring(my, { stiffness: 40, damping: 20, mass: 0.5 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const scrollShift = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 60]);

  function handlePointerMove(e) {
    if (reduced) return;
    const rect = containerRef.current.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent, black 140px)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 140px)',
      }}
      aria-hidden="true"
    >
      {SHAPES.map((s, i) => (
        <Shape key={i} shape={s} mx={smoothX} my={smoothY} scrollShift={scrollShift} reduced={reduced} index={i} />
      ))}
    </div>
  );
}

function Shape({ shape, mx, my, scrollShift, reduced, index }) {
  const x = useTransform(mx, (v) => v * shape.depth);
  const y = useTransform([my, scrollShift], ([v, s]) => v * shape.depth + s * shape.depth * 6);

  return (
    <motion.div
      className="absolute bg-motivo-green"
      style={{
        top: shape.top,
        left: shape.left,
        width: shape.w,
        height: shape.h,
        opacity: shape.opacity,
        filter: shape.blur ? `blur(${shape.blur}px)` : undefined,
        clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
        x: reduced ? 0 : x,
        y: reduced ? 0 : y,
        rotate: shape.rot,
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: shape.opacity,
        transition: { duration: 1.2, delay: reduced ? 0 : index * 0.06 },
      }}
    />
  );
}
