import { motion, AnimatePresence } from 'framer-motion';
import { BriefcaseBusiness, CalendarDays, FileText, Heart, PartyPopper, Sprout, Star } from 'lucide-react';
import type { CSSProperties } from 'react';
import { Stage, Camera, Cursor, Caption, useStep, focus } from './nextstep/Stage';
import { Shell, OverviewPage, ApplicationsPage, SchedulePage, Reminders, Editor, Toast, URL_TEXT } from './nextstep/ui';

const INK = '#282a26';
const PAPER = '#fdfdfa';
const serif: CSSProperties = { fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400 };
const fill: CSSProperties = { position: 'absolute', inset: 0 };

function Mark({ size }: { size: string }) {
  return (
    <span style={{ width: size, height: size, borderRadius: `calc(${size} * .3)`, background: INK, color: '#fcf5cd', display: 'grid', placeItems: 'center', transform: 'rotate(-7deg)', flexShrink: 0 }}>
      <Sprout style={{ width: '58%', height: '58%' }} strokeWidth={1.8} />
    </span>
  );
}

/* ---------- 1. Opener ---------- */
const WORDS = [
  { t: 'Every application.', s: false },
  { t: 'Every interview.', s: false },
  { t: 'Every CV.', s: false },
  { t: 'Every small win.', s: true },
];
const BLOCKS = [
  { c: '#fcf5cd', st: { left: '-6vw', top: '-8vh', width: '34vw', height: '36vh', borderRadius: '0 0 12vmin 0' } },
  { c: '#e6f6df', st: { right: '-5vw', top: '-6vh', width: '26vw', height: '44vh', borderRadius: '0 0 0 14vmin' } },
  { c: '#eee9fc', st: { right: '-4vw', bottom: '-10vh', width: '38vw', height: '34vh', borderRadius: '14vmin 0 0 0' } },
  { c: '#f0f0e9', st: { left: '-4vw', bottom: '-8vh', width: '24vw', height: '40vh', borderRadius: '0 12vmin 0 0' } },
];

export function OpenerScene() {
  const step = useStep([450, 950, 1450, 1950, 2650, 3400, 4500], 1.35);
  const word = step >= 1 && step <= 4 ? WORDS[step - 1] : null;
  const lock = step >= 5;
  const push = step >= 7;
  return (
    <motion.div style={{ ...fill, background: PAPER, overflow: 'hidden' }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      {BLOCKS.map((b, i) => (
        <motion.div key={i} style={{ position: 'absolute', background: b.c, ...b.st }}
          initial={{ scale: 0, opacity: 0 }}
          animate={push ? { scale: 1.8, opacity: 0 } : step > i ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={push ? { duration: 0.7, ease: [0.6, 0, 0.8, 0.4] } : { type: 'spring', stiffness: 300, damping: 20 }} />
      ))}
      <motion.div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        animate={push ? { scale: 2.6, opacity: 0, filter: 'blur(14px)' } : { scale: 1, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.85, ease: [0.6, 0, 0.8, 0.3], opacity: { duration: 0.85, times: [0, 0.55, 1] } }}>
        <motion.div style={{ display: 'flex', alignItems: 'center', gap: '4vmin' }} layout transition={{ type: 'spring', stiffness: 260, damping: 26 }}>
          <motion.div initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 320, damping: 16 }}>
            <Mark size={lock ? '17vmin' : '14vmin'} />
          </motion.div>
          <div style={{ position: 'relative', height: '22vmin', display: 'flex', alignItems: 'center' }}>
            <AnimatePresence mode="popLayout">
              {word && (
                <motion.div key={word.t}
                  style={{ fontSize: '11vmin', fontWeight: 650, letterSpacing: '-0.055em', color: INK, whiteSpace: 'nowrap', ...(word.s ? serif : {}) }}
                  initial={{ y: '45%', opacity: 0, scale: 0.92, filter: 'blur(6px)' }}
                  animate={{ y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ y: '-40%', opacity: 0, filter: 'blur(6px)' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}>
                  {word.t}
                </motion.div>
              )}
              {lock && (
                <motion.div key="lock" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 24 }}>
                  <div style={{ fontSize: '2.1vmin', letterSpacing: '0.24em', fontWeight: 600, color: '#8e927f', marginBottom: '1vmin' }}>YOUR JOB SEARCH, IN MOTION</div>
                  <div style={{ fontSize: '19vmin', fontWeight: 800, letterSpacing: '-0.065em', lineHeight: 0.95, color: INK }}>nextstep<sup style={{ fontSize: '3vmin', letterSpacing: 0 }}>®</sup></div>
                  <motion.div style={{ fontSize: '3.4vmin', color: '#6f7468', marginTop: '1.6vmin' }} initial={{ opacity: 0, y: 10 }} animate={step >= 6 ? { opacity: 1, y: 0 } : {}}>
                    A walkthrough of the <span style={serif}>prototype.</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ---------- 1b. About the project ---------- */
const FEATURES = [
  { t: 'Every job you applied to', d: 'Company, role, link, salary', bg: '#fcf5cd', c: '#9e8849', I: BriefcaseBusiness },
  { t: 'The exact CV you sent', d: 'One CV version per application', bg: '#e6f6df', c: '#669657', I: FileText },
  { t: 'Assessments & interviews', d: 'Dates and reminders together', bg: '#eee9fc', c: '#8772b7', I: CalendarDays },
  { t: 'Where each one stands', d: 'Applied → Assessment → Interview → Offer', bg: '#f0f0e9', c: '#6f7468', I: Sprout },
];
export function AboutScene() {
  const s = useStep([200, 600, 3600, 5300, 7400, 9200, 11100, 12900]);
  const out = s >= 8;
  return (
    <motion.div style={{ ...fill, background: PAPER, overflow: 'hidden' }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <motion.div style={{ position: 'absolute', left: '7vmin', top: '27vmin', width: '74vmin' }}
        initial={{ opacity: 0, scale: 1.25, filter: 'blur(10px)' }} animate={out ? { opacity: 0, x: '-8vmin' } : { opacity: 1, scale: 1, filter: 'blur(0px)' }} transition={{ duration: 0.7, ease: [0.3, 0.7, 0.2, 1] }}>
        <motion.div style={{ display: 'flex', alignItems: 'center', gap: '2vmin', fontSize: '2.1vmin', letterSpacing: '0.24em', fontWeight: 600, color: '#8e927f' }} initial={{ opacity: 0 }} animate={{ opacity: s >= 1 ? 1 : 0 }}>
          <Mark size="5vmin" /> WHAT IS NEXTSTEP?
        </motion.div>
        <div style={{ fontSize: '9.5vmin', fontWeight: 650, letterSpacing: '-0.055em', lineHeight: 1.02, color: INK, marginTop: '3.5vmin' }}>
          {['One calm place', 'for your whole', 'job search.'].map((l, i) => (
            <div key={l} style={{ overflow: 'hidden', paddingBottom: '0.6vmin' }}>
              <motion.div style={i === 2 ? serif : undefined} initial={{ y: '105%' }} animate={{ y: s >= 2 ? 0 : '105%' }} transition={{ type: 'spring', stiffness: 240, damping: 26, delay: i * 0.12 }}>{l}</motion.div>
            </div>
          ))}
        </div>
        <motion.div style={{ display: 'inline-block', marginTop: '4vmin', fontSize: '2.2vmin', color: '#77816a', background: '#f1f3e9', padding: '1.2vmin 2.2vmin', borderRadius: '2vmin' }} initial={{ opacity: 0, y: 12 }} animate={s >= 3 ? { opacity: 1, y: 0 } : {}}>
          A design prototype · sample data · simulated AI
        </motion.div>
      </motion.div>
      <div style={{ position: 'absolute', right: '6vmin', top: '18vmin', width: '76vmin', display: 'grid', gap: '2.4vmin' }}>
        {FEATURES.map((f, i) => (
          <motion.div key={f.t} style={{ display: 'flex', alignItems: 'center', gap: '3vmin', background: f.bg, borderRadius: '2.4vmin 6vmin 2.4vmin 2.4vmin', padding: '3vmin 3.6vmin' }}
            initial={{ opacity: 0, x: '14vmin', scale: 0.9 }}
            animate={out ? { opacity: 0, scale: 1.15, x: 0 } : s >= 4 + i ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: '14vmin', scale: 0.9 }}
            transition={out ? { duration: 0.5, delay: i * 0.05 } : { type: 'spring', stiffness: 260, damping: 22 }}>
            <span style={{ width: '9vmin', height: '9vmin', borderRadius: '50%', background: '#fdfdfb9e', display: 'grid', placeItems: 'center', color: f.c, flexShrink: 0 }}><f.I style={{ width: '4.4vmin', height: '4.4vmin' }} strokeWidth={1.5} /></span>
            <div>
              <div style={{ fontSize: '4vmin', fontWeight: 600, letterSpacing: '-0.035em', color: INK }}>{f.t}</div>
              <div style={{ fontSize: '2.3vmin', color: f.c, marginTop: '0.8vmin' }}>{f.d}</div>
            </div>
            <span style={{ marginLeft: 'auto', fontSize: '2.2vmin', color: f.c, fontWeight: 600 }}>0{i + 1}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ---------- 2. Overview ---------- */
const COUNT_STEPS = Array.from({ length: 17 }, (_, i) => 600 + i * 40);
export function OverviewScene() {
  const c = useStep(COUNT_STEPS);
  const s = useStep([1500, 4800, 6400, 7600, 8500, 9400]);
  const poses = [focus(720, 405, 1), focus(830, 300, 1.42), focus(620, 520, 1.45), focus(620, 520, 1.45), focus(720, 405, 1), focus(560, 330, 1.15), focus(560, 330, 1.15)];
  const cursor = s >= 5 ? { x: 110, y: 274 } : s >= 4 ? { x: 600, y: 420 } : s >= 2 ? { x: 432, y: 478 } : { x: 900, y: 600 };
  const label = s >= 5 ? 'Schedule' : s >= 2 && s < 4 ? 'Interviews' : undefined;
  return (
    <motion.div style={{ ...fill, background: PAPER }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <Stage>
        <Camera pose={poses[s]} initial={{ ...focus(720, 405, 1.5), blur: 12 }}>
          <Shell page="Overview">
            <OverviewPage progress={Math.min(1, c / 17)} tab={s >= 3 ? 'Interviews' : 'Assessments'} />
          </Shell>
          <Cursor x={cursor.x} y={cursor.y} click={s >= 6 ? 2 : s >= 3 ? 1 : 0} visible={s >= 2} label={label} />
        </Camera>
      </Stage>
      <Caption n="01" title="Overview" line="The whole search, |at a glance.|" note="Stats, upcoming assessments & interviews, gentle follow-ups." />
    </motion.div>
  );
}

/* ---------- 2b. Schedule + reminders ---------- */
export function ScheduleScene() {
  const s = useStep([400, 1100, 3300, 4000, 6300, 7000]);
  const cursor = s >= 5 ? { x: 1325, y: 160 } : s >= 3 ? { x: 1329, y: 42 } : s >= 1 ? { x: 432, y: 300 } : { x: 110, y: 274 };
  const label = s >= 5 ? 'Add application' : s >= 3 ? 'Reminders' : s >= 1 ? 'Interviews' : undefined;
  const pose = s >= 3 ? focus(720, 405, 1) : focus(640, 380, 1.18);
  return (
    <motion.div style={{ ...fill, background: PAPER }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <Stage>
        <Camera pose={pose} initial={focus(560, 330, 1.15)}>
          <Shell page="Schedule" bell={s >= 4 && s < 5}><SchedulePage tab={s >= 2 ? 'Interviews' : 'Assessments'} /></Shell>
          {s >= 4 && s < 5 && <Reminders />}
          <style>{s >= 6 ? '.ns-add{transform:scale(.93)}' : ''}</style>
          <Cursor x={cursor.x} y={cursor.y} click={s >= 6 ? 3 : s >= 4 ? 2 : s >= 2 ? 1 : 0} label={label} />
        </Camera>
      </Stage>
      <Caption n="02" title="Schedule & reminders" line="Every date, |in one place.|" note="Assessments, interviews and nudges for the week." />
    </motion.div>
  );
}

/* ---------- 3. Extraction ---------- */
const TYPE_STEPS = Array.from({ length: 28 }, (_, i) => 900 + i * 80);
export function ExtractScene() {
  const t = useStep(TYPE_STEPS);
  const s = useStep([2500, 2650, 3800, 3950, 4100, 4250, 4400, 4800, 6900], 1.5);
  const url = URL_TEXT.slice(0, Math.round((t / 28) * URL_TEXT.length));
  const busy = s >= 2 && s < 3;
  const filled = s >= 3 ? Math.min(5, s - 2) : 0;
  const pose = s >= 9 ? focus(720, 470, 1.18) : s >= 8 ? focus(720, 560, 1.32) : focus(720, 405, 1.04);
  const cursor = s >= 1 ? { x: 478, y: 378 } : { x: 780, y: 330 };
  return (
    <motion.div style={{ ...fill, background: PAPER }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <Stage>
        <Camera pose={pose} initial={focus(720, 405, 1)}>
          <Shell page="Schedule"><SchedulePage tab="Interviews" /></Shell>
          <Editor url={url} busy={busy} filled={filled} disclaimer={s >= 7} cv={false} version="" scroll={s >= 9 ? 420 : 0} />
          <style>{s === 1 ? '.ns-demo{transform:scale(.93)}' : ''}</style>
          <Cursor x={cursor.x} y={cursor.y} click={s >= 1 ? 1 : 0} visible={s < 8} label={s >= 1 ? 'Demo AI extraction' : 'Paste job link'} />
        </Camera>
      </Stage>
      <Caption n="03" title="Add from a job link" line="Start with a link. |Review every detail.|" note="Demo only — the extraction is simulated with sample content." />
    </motion.div>
  );
}

/* ---------- 4. CV ---------- */
const VERSION = 'v3 · portfolio-focused';
const VER_STEPS = Array.from({ length: VERSION.length }, (_, i) => 2700 + i * 45);
export function CvScene() {
  const v = useStep(VER_STEPS);
  const s = useStep([1100, 3000, 3700, 4100], 1.35);
  const pose = s >= 2 ? focus(720, 420, 1.02) : focus(720, 330, 1.38);
  return (
    <motion.div style={{ ...fill, background: PAPER }} exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 0.35 }}>
      <Stage>
        <Camera pose={pose} initial={focus(720, 470, 1.18)}>
          <Shell page="Schedule"><SchedulePage tab="Interviews" /></Shell>
          <Editor url={URL_TEXT} busy={false} filled={5} disclaimer cv={s >= 1} version={VERSION.slice(0, v)} scroll={800} />
          <style>{s === 3 ? '.ns-save{transform:scale(.93)}' : ''}</style>
          <Cursor x={s >= 2 ? 1000 : 444} y={s >= 2 ? 748 : 386} click={s >= 3 ? 2 : s >= 1 ? 1 : 0} label={s >= 2 ? 'Add application' : 'Attach CV'} />
          {s >= 4 && <Toast text="Application saved in this prototype session." />}
        </Camera>
      </Stage>
      <Caption n="04" title="A CV per application" line="Keep the exact version |you sent.|" note="Attach PDF, DOC or DOCX — kept for this session only." />
    </motion.div>
  );
}

/* ---------- 5. Applications ---------- */
export function ApplicationsScene() {
  const s = useStep([300, 1500, 2500, 3200, 4300, 4900], 1.43);
  const selected = s >= 3 ? 7 : s >= 2 ? 2 : 1;
  const pose = s >= 4 ? focus(1150, 700, 1.5) : s >= 1 ? focus(720, 600, 1) : focus(720, 405, 1);
  const cursorY = [460, 460, 572, 670][Math.min(3, Math.max(1, s >= 3 ? 3 : s >= 2 ? 2 : 1))];
  const cursor = s >= 4 ? { x: 1146, y: 629 } : { x: 600, y: cursorY };
  return (
    <motion.div style={{ ...fill, background: PAPER }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
      <Stage>
        <Camera pose={pose} initial={{ ...focus(720, 405, 1.12), blur: 6 }}>
          <Shell page="Applications" tall><ApplicationsPage selectedId={selected} status={s >= 5 ? 'Offer' : undefined} /></Shell>
          <Cursor x={cursor.x} y={cursor.y} click={s >= 5 ? 4 : s >= 3 ? 3 : s >= 2 ? 2 : s >= 1 ? 1 : 0} label={s >= 4 ? 'Stage → Offer' : s >= 3 ? 'Stripe' : s >= 2 ? 'Notion' : 'Linear'} />
        </Camera>
      </Stage>
      {s >= 6 && <motion.div style={{ ...fill, background: '#faf2cf', zIndex: 60 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }} />}
      <Caption n="05" title="Applications" line="Select a card, |see everything.|" note="Stage, journey, CV and role details side by side." />
    </motion.div>
  );
}

/* ---------- 6. Celebration ---------- */
const PARTICLES = Array.from({ length: 72 }, (_, i) => {
  const side = i % 4;
  const x = side === 0 ? -3 : side === 1 ? 103 : (i * 37) % 100;
  const y = side === 2 ? -3 : side === 3 ? 103 : (i * 29) % 100;
  const dx = side === 0 ? 25 + (i % 45) : side === 1 ? -(25 + (i % 45)) : (i % 2 ? 1 : -1) * (8 + (i % 25));
  const dy = side === 2 ? 24 + (i % 58) : side === 3 ? -(24 + (i % 58)) : (i % 2 ? 1 : -1) * (10 + (i % 35));
  return { x, y, dx, dy, spin: i % 2 ? 210 : -170, delay: (i % 9) * 0.06, color: ['#b6a4d0', '#9dac82', '#d6bd69', '#d6a696'][i % 4], star: i % 5 === 0, big: i % 7 === 0 };
});

export function CelebrateScene() {
  const s = useStep([3200], 1.16);
  const gentle = s >= 1;
  return (
    <motion.div style={{ ...fill, background: '#faf2cf', overflow: 'hidden', display: 'grid', placeItems: 'center', color: '#293127' }} exit={{ clipPath: 'circle(0% at 50% 50%)' }} transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}>
      {[78, 108].map((w, i) => (
        <motion.div key={w} style={{ position: 'absolute', width: `${w}vmin`, aspectRatio: '1', borderRadius: '50%', border: '1px solid #b09b4b44' }} initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1.12, opacity: [0, 1, 0.5] }} transition={{ duration: 2.6, delay: i * 0.13 }} />
      ))}
      {PARTICLES.map((p, i) => (
        <motion.span key={i} style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, color: p.color, width: p.big ? '3vmin' : p.star ? '2vmin' : '0.7vmin', height: p.big ? '3vmin' : p.star ? '2vmin' : '1.3vmin' }}
          initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.3 }}
          animate={{ opacity: [0, 0.9, 0.9, 0], x: `${p.dx}vw`, y: `${p.dy}vh`, rotate: p.spin, scale: 1 }}
          transition={{ duration: 2.3, delay: p.delay, ease: [0.15, 0.65, 0.3, 1], times: [0, 0.12, 0.68, 1] }}>
          {p.star || p.big ? <Star style={{ width: '100%', height: '100%' }} strokeWidth={1.6} /> : <i style={{ display: 'block', width: '100%', height: '100%', background: p.color, borderRadius: 2 }} />}
        </motion.span>
      ))}
      <motion.div style={{ position: 'relative', textAlign: 'center', width: '82vw' }} initial={{ opacity: 0, y: 30, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.15 }}>
        <PartyPopper style={{ width: '9vmin', height: '9vmin', color: '#b09b4b', margin: '0 auto 3vmin' }} strokeWidth={1.2} />
        <div style={{ fontSize: '2vmin', letterSpacing: '0.25em', fontWeight: 600, color: '#7a826e', marginBottom: '3vmin' }}>YOUR NEXT CHAPTER STARTS HERE</div>
        <div style={{ fontSize: '13vmin', lineHeight: 1, letterSpacing: '-0.065em', fontWeight: 650 }}>YOU GOT AN OFFER!</div>
        <div style={{ fontSize: '3.4vmin', color: '#737c68', marginTop: '3.5vmin' }}>Stripe sees what you bring. This moment is yours.</div>
      </motion.div>
      <motion.div style={{ ...fill, background: '#eee9f3', display: 'grid', placeItems: 'center', textAlign: 'center' }}
        initial={{ clipPath: 'circle(0% at 50% 50%)' }} animate={{ clipPath: gentle ? 'circle(75% at 50% 50%)' : 'circle(0% at 50% 50%)' }} transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={gentle ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25, duration: 0.6 }}>
          <Heart style={{ width: '8vmin', height: '8vmin', color: '#a18ab3', margin: '0 auto 3vmin' }} strokeWidth={1.2} />
          <div style={{ fontSize: '2vmin', letterSpacing: '0.25em', fontWeight: 600, color: '#8a7c96', marginBottom: '2.5vmin' }}>A MOMENT TO RESET</div>
          <div style={{ fontSize: '14vmin', lineHeight: 1, letterSpacing: '-0.035em', color: '#3a3342', ...serif }}>Not this time.</div>
          <div style={{ fontSize: '3.4vmin', color: '#867891', marginTop: '3vmin' }}>Keep going. Your next opportunity is still ahead.</div>
          <div style={{ fontSize: '1.9vmin', letterSpacing: '0.16em', color: '#9a8fa5', marginTop: '6vmin' }}>EVERY STAGE GETS ITS OWN MOMENT</div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ---------- 7. Outro ---------- */
const CHIPS = [
  { t: 'Applied', bg: '#f0f0e8', c: '#777d6f' },
  { t: 'Assessment', bg: '#fcf5cd', c: '#9e8849' },
  { t: 'Interview', bg: '#eee9fc', c: '#8772b7' },
  { t: 'Offer', bg: '#e6f6df', c: '#669657' },
];
export function OutroScene() {
  const s = useStep([600, 1300, 2200, 3700]);
  const end = s >= 4;
  return (
    <motion.div style={{ ...fill, background: PAPER, display: 'grid', placeItems: 'center' }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div style={{ display: 'flex', alignItems: 'center', gap: '3.5vmin' }} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 20 }}>
          <Mark size="16vmin" />
          <motion.div style={{ fontSize: '19vmin', fontWeight: 800, letterSpacing: '-0.065em', lineHeight: 1, color: INK, transformOrigin: 'left center' }} animate={end ? { opacity: 0, x: -60, scale: 0.8 } : { opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.5 }}>
            nextstep
          </motion.div>
        </motion.div>
        <motion.div style={{ fontSize: '5.4vmin', color: '#4b5145', marginTop: '3vmin', ...serif }} initial={{ opacity: 0, y: 16 }} animate={s >= 1 && !end ? { opacity: 1, y: 0 } : { opacity: 0, y: s >= 1 ? -10 : 16 }} transition={{ duration: 0.5 }}>
          Your next chapter, in motion.
        </motion.div>
        <div style={{ display: 'flex', gap: '1.6vmin', marginTop: '4vmin' }}>
          {CHIPS.map((c, i) => (
            <motion.span key={c.t} style={{ background: c.bg, color: c.c, fontSize: '2.3vmin', padding: '1.1vmin 2.2vmin', borderRadius: '1.4vmin', fontWeight: 500 }}
              initial={{ opacity: 0, y: 20, scale: 0.8 }} animate={s >= 2 && !end ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: s >= 2 ? -10 : 20, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22, delay: end ? 0 : i * 0.09 }}>
              {i + 1} · {c.t}
            </motion.span>
          ))}
        </div>
        <motion.div style={{ fontSize: '1.9vmin', letterSpacing: '0.14em', color: '#9a9d92', marginTop: '5vmin' }} initial={{ opacity: 0 }} animate={{ opacity: s >= 3 && !end ? 1 : 0 }}>
          DESIGN PROTOTYPE · SAMPLE DATA · SIMULATED AI EXTRACTION
        </motion.div>
      </div>
    </motion.div>
  );
}
