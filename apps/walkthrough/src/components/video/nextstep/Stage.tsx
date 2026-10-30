import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSceneTimer } from '@/lib/video';

export const W = 1440;
export const H = 810;

export function useStep(times: number[], k = 1) {
  const [step, setStep] = useState(0);
  useSceneTimer(times.map((time, i) => ({ time: Math.round(time * k), callback: () => setStep(i + 1) })));
  return step;
}

/** Fixed 1440x810 world scaled to fit the canvas. */
export function Stage({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / W, window.innerHeight / H));
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div style={{ width: W, height: H, transform: `scale(${scale})`, flexShrink: 0, position: 'relative' }}>{children}</div>
    </div>
  );
}

export type Pose = { x: number; y: number; s: number; blur?: number; dur?: number };
/** Centre world point (px,py) at zoom s. */
export const focus = (px: number, py: number, s: number, dur = 1.1): Pose => ({ x: (W / 2 - px) * s, y: (H / 2 - py) * s, s, dur });

export function Camera({ pose, initial, children }: { pose: Pose; initial?: Pose; children: ReactNode }) {
  return (
    <motion.div
      style={{ width: W, height: H, position: 'absolute', inset: 0, transformOrigin: '50% 50%', willChange: 'transform' }}
      initial={initial ? { x: initial.x, y: initial.y, scale: initial.s, filter: `blur(${initial.blur ?? 0}px)` } : false}
      animate={{ x: pose.x, y: pose.y, scale: pose.s, filter: `blur(${pose.blur ?? 0}px)` }}
      transition={{ duration: pose.dur ?? 1.1, ease: [0.65, 0, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Cursor({ x, y, click, visible = true, label }: { x: number; y: number; click: number; visible?: boolean; label?: string }) {
  return (
    <motion.div className="ns-cursor" animate={{ x, y, opacity: visible ? 1 : 0 }} transition={{ duration: 0.75, ease: [0.5, 0, 0.2, 1] }}>
      <AnimatePresence>
        {click > 0 && <motion.span key={click} className="ns-ripple" initial={{ scale: 0.3, opacity: 0.9 }} animate={{ scale: 1.8, opacity: 0 }} transition={{ duration: 0.55 }} />}
      </AnimatePresence>
      <AnimatePresence>
        {label && visible && (
          <motion.span key={label} className="ns-click-label" initial={{ opacity: 0, y: 6, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: 'spring', stiffness: 320, damping: 24 }}>
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      <svg viewBox="0 0 24 24" width="26" height="26"><path d="M4 2.5 L4 19 L8.6 14.8 L11.6 21.3 L14.6 19.9 L11.7 13.6 L18 13.3 Z" fill="#282a26" stroke="#fdfdfa" strokeWidth="1.4" strokeLinejoin="round" /></svg>
    </motion.div>
  );
}

/** Screen-space chapter card (outside the camera). */
export function Caption({ n, title, line, note }: { n: string; title: string; line: string; note?: string }) {
  return (
    <motion.div
      className="absolute z-40"
      style={{ left: '4.5vmin', bottom: '5vmin', background: '#282a26', color: '#fdfdfa', borderRadius: '2.2vmin 5vmin 2.2vmin 2.2vmin', padding: '2.4vmin 3.4vmin 2.6vmin', boxShadow: '0 2vmin 6vmin #1f26201f', maxWidth: '62vmin' }}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ delay: 0.35, type: 'spring', stiffness: 220, damping: 24 }}
    >
      <div style={{ fontSize: '1.9vmin', letterSpacing: '0.22em', color: '#fcf5cd', fontWeight: 600 }}>{n} · {title.toUpperCase()}</div>
      <div style={{ fontSize: '4.4vmin', lineHeight: 1.08, letterSpacing: '-0.04em', fontWeight: 600, marginTop: '1.2vmin' }}>
        {line.split('|').map((part, i) => i % 2 ? <span key={i} style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400 }}>{part}</span> : <span key={i}>{part}</span>)}
      </div>
      {note && <div style={{ fontSize: '1.9vmin', color: '#b9bcb0', marginTop: '1.3vmin' }}>{note}</div>}
    </motion.div>
  );
}
