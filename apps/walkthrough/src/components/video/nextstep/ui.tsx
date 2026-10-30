import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import {
  ArrowUp, ArrowUpRight, BriefcaseBusiness, Bell, CalendarDays, Check, ChevronRight, CircleCheck,
  Clock3, FileText, LayoutDashboard, MapPin, Plus, Search, Sparkles, Sprout, Target, Video, X,
} from 'lucide-react';
import './Home.css';
import './HomeMotion.css';
import './HomeApplications.css';
import './stage.css';

export type Page = 'Overview' | 'Applications' | 'Schedule';
export type Status = 'Applied' | 'Assessment' | 'Interview' | 'Offer' | 'Rejected' | 'Withdrawn';
export type App = { id: number; company: string; role: string; status: Status; date: string; location: string; color: string; mark: string };

export const APPS: App[] = [
  { id: 1, company: 'Linear', role: 'Product Designer', status: 'Interview', date: 'Jun 16, 2026', location: 'Remote', color: '#eeebfb', mark: '◒' },
  { id: 2, company: 'Notion', role: 'Senior Product Designer', status: 'Assessment', date: 'Jun 15, 2026', location: 'San Francisco, CA', color: '#eeeee8', mark: 'N' },
  { id: 7, company: 'Stripe', role: 'Product Designer', status: 'Interview', date: 'Jun 8, 2026', location: 'Remote', color: '#eee9fa', mark: 'S' },
  { id: 3, company: 'Figma', role: 'Product Designer', status: 'Applied', date: 'Jun 14, 2026', location: 'New York, NY', color: '#faebe1', mark: 'f' },
  { id: 4, company: 'Spotify', role: 'UX Designer', status: 'Offer', date: 'Jun 12, 2026', location: 'Remote', color: '#e3f4df', mark: '≋' },
  { id: 5, company: 'Framer', role: 'Brand Designer', status: 'Applied', date: 'Jun 10, 2026', location: 'Amsterdam, NL', color: '#e9edf8', mark: 'F' },
  { id: 6, company: 'Vercel', role: 'Design Engineer', status: 'Assessment', date: 'Jun 9, 2026', location: 'Remote', color: '#eeeee7', mark: '▲' },
  { id: 8, company: 'Miro', role: 'UX Designer', status: 'Rejected', date: 'Jun 5, 2026', location: 'London, UK', color: '#fcf5cd', mark: 'M' },
];

const EVENTS = {
  Assessments: [
    { company: 'Notion', title: 'Product design challenge', day: '19', time: 'Due tomorrow · 5:00 PM', detail: 'Take-home assessment' },
    { company: 'Vercel', title: 'Design engineering exercise', day: '22', time: 'Monday · 11:59 PM', detail: 'Technical assessment' },
  ],
  Interviews: [
    { company: 'Linear', title: 'Portfolio review with Maya', day: '19', time: 'Tomorrow · 10:30–11:15 AM', detail: 'Video interview' },
    { company: 'Stripe', title: 'Meet the product design team', day: '23', time: 'Tuesday · 2:00–3:00 PM', detail: 'Team conversation' },
  ],
};

export function Shell({ page, children, tall, bell }: { page: Page; children: ReactNode; tall?: boolean; bell?: boolean }) {
  return (
    <div className="job-app ns-app" style={tall ? { height: 1180 } : undefined}>
      <aside className="job-sidebar">
        <div className="job-brand"><span className="job-brand-mark"><Sprout size={22} /></span> nextstep<small>®</small></div>
        <div className="job-workspace">YOUR WORKSPACE</div>
        <nav className="job-nav">
          {[{ t: 'Overview', I: LayoutDashboard }, { t: 'Applications', I: BriefcaseBusiness }, { t: 'Schedule', I: CalendarDays }].map(({ t, I }) => (
            <div key={t} className={`ns-navitem ${page === t ? 'active' : ''}`}><I size={17} />{t}{t === 'Applications' && <span>12</span>}</div>
          ))}
        </nav>
        <div className="job-sidebar-note"><Sparkles size={21} strokeWidth={1.3} /><h3>Small steps. Big possibilities.</h3><p>Your next chapter starts with showing up. You’re doing great.</p></div>
        <div className="job-profile"><span className="job-avatar">JL</span><div><strong>Jamie Lee</strong><p>Your personal workspace</p></div></div>
      </aside>
      <main className={`job-main ${page === 'Applications' ? 'job-applications-page' : ''} ${page === 'Schedule' ? 'job-agenda-full' : ''}`}>
        <header className="job-topbar"><div className="job-breadcrumb">Workspace <ChevronRight size={12} /><strong>{page}</strong></div><div className="job-top-right"><span>Thursday, June 18, 2026</span><span className={`job-icon-button ns-bell ${bell ? 'on' : ''}`}><Bell size={16} /><i className="job-dot" /></span><span className="job-avatar">JL</span></div></header>
        <div className="job-content">{children}</div>
      </main>
    </div>
  );
}

function Intro({ page }: { page: Page }) {
  return (
    <section className="job-intro">
      <div>
        <p className="job-eyebrow">{page === 'Applications' ? 'ONE STEP CLOSER' : 'A LITTLE PROGRESS, EVERY DAY'}</p>
        <h1>{page === 'Overview' ? <>Your next chapter, <span>in motion.</span></> : page === 'Schedule' ? <>Make room for <span>what’s next.</span></> : 'Your next chapter, organized.'}</h1>
        <p>{page === 'Overview' ? 'Welcome back, Jamie. Let’s keep your job search moving forward.' : page === 'Schedule' ? 'Your upcoming assessments and conversations, all together.' : 'Every opportunity. Every little milestone. All in one place.'}</p>
      </div>
      <span className="job-primary ns-add"><Plus size={16} /> Add application</span>
    </section>
  );
}

function Stats({ progress }: { progress: number }) {
  const stats = [
    { label: 'Total applications', value: 12, I: BriefcaseBusiness, note: 'Every opportunity counts' },
    { label: 'Active applications', value: 9, I: Target, note: 'Opportunities in progress' },
    { label: 'In interview', value: 3, I: Video, note: 'Making meaningful connections' },
    { label: 'Offers received', value: 1, I: CircleCheck, note: 'Something to be proud of' },
  ];
  const e = 1 - Math.pow(1 - progress, 3);
  return (
    <section className="job-stats">
      {stats.map((s) => (
        <div className="job-stat" key={s.label}>
          <div className="job-stat-top">{s.label}<i><s.I size={16} strokeWidth={1.5} /></i></div>
          <div className="job-stat-value">{String(Math.round(s.value * e)).padStart(2, '0')}</div>
          <div className="job-stat-bottom">{s.label === 'Offers received' ? <Sparkles size={11} /> : <ArrowUp size={11} />} {s.note}</div>
          <div className="job-stat-meter"><i style={{ transform: `scaleX(${(s.value / 12) * e})` }} /></div>
        </div>
      ))}
    </section>
  );
}

export function OverviewPage({ progress, tab }: { progress: number; tab: 'Assessments' | 'Interviews' }) {
  return (
    <>
      <Intro page="Overview" />
      <Stats progress={progress} />
      <div className="job-middle">
        <section className="job-panel">
          <div className="job-panel-heading"><h2>Coming up next <span>4</span></h2><span className="job-text-button">View schedule <ArrowUpRight size={13} /></span></div>
          <div className="job-tabs">{(['Assessments', 'Interviews'] as const).map((t) => <span className={`ns-tab ${tab === t ? 'active' : ''}`} key={t}>{t}<span>2</span></span>)}</div>
          <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {EVENTS[tab].map((e) => (
              <div className="job-event" key={e.company}>
                <div className={`job-date ${tab === 'Interviews' ? 'mint' : ''}`}>JUN<strong>{e.day}</strong></div>
                <div className="job-event-info"><h3>{e.title}</h3><p>{e.company} · {e.detail}</p><div className="job-event-meta"><span><Clock3 size={10} />{e.time}</span></div></div>
                <span className="job-event-action"><ArrowUpRight size={14} /></span>
              </div>
            ))}
          </motion.div>
        </section>
        <section className="job-panel job-followup">
          <div className="job-panel-heading"><h2>Gentle follow-ups</h2></div>
          <p className="job-followup-sub">A thoughtful nudge can go a long way.</p>
          {APPS.filter((x) => x.id === 3 || x.id === 5).map((a) => (
            <div className="job-followup-item" key={a.id}>
              <div className="job-company-line"><span className="job-company-logo" style={{ background: a.color }}>{a.mark}</span><div><h3>{a.role}</h3><p>{a.company} · Applied {a.date.replace(', 2026', '')}</p></div></div>
              <div className="job-followup-bottom"><span><Clock3 size={10} />No reply in 7 days</span><span className="ns-chip">Mark followed up</span></div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

const STAGES: Status[] = ['Applied', 'Assessment', 'Interview', 'Offer'];

function SidePanel({ a, status }: { a: App; status: Status }) {
  const index = STAGES.indexOf(status);
  return (
    <aside className="job-opportunity-panel ns-panel">
      <div className="job-opportunity-head"><span>OPPORTUNITY DETAILS</span><span className="job-icon-button"><FileText size={13} /></span></div>
      <motion.div key={a.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
        <span className="job-company-logo ns-panel-logo">{a.mark}</span>
        <h2 className="ns-panel-title">{a.role}</h2>
        <p className="job-opportunity-company">{a.company} · {a.location}</p>
        <span className={`job-status ${status}`}>· {status}</span>
        <dl className="job-opportunity-facts"><div><dt>Salary range</dt><dd>Not specified</dd></div><div><dt>Job type</dt><dd>Full-time</dd></div><div><dt>Applied on</dt><dd>{a.date}</dd></div><div><dt>Source</dt><dd>Manually added</dd></div></dl>
        <div className="job-opportunity-controls"><motion.span key={status} initial={{ scale: 0.94 }} animate={{ scale: 1 }} className={`ns-select ${status === 'Offer' ? 'offer' : ''}`}>{status}<ChevronRight size={11} style={{ transform: 'rotate(90deg)' }} /></motion.span><span>No posting linked</span></div>
        <section className="job-opportunity-section"><h3><Clock3 size={13} />Application journey</h3>
          <div className="job-side-timeline">{STAGES.map((s, i) => (
            <div key={s} className={`job-side-step ${i <= index ? 'reached' : ''} ${i === index ? 'current' : ''}`}><i>{i < index ? <Check size={11} /> : i + 1}</i><div><strong>{s}</strong><small>{i === index ? 'Current stage' : i < index ? 'Earlier stage' : 'Ahead of you'}</small></div></div>
          ))}</div>
        </section>
        <section className="job-opportunity-section"><h3><FileText size={13} />CV submitted</h3>
          <div className="job-side-cv"><FileText size={22} /><div><strong>Jamie_Lee_{a.company}_CV.pdf</strong><small>v2 · tailored application</small><small>Sample label · no file attached</small></div></div>
        </section>
      </motion.div>
    </aside>
  );
}

export function ApplicationsPage({ selectedId, status }: { selectedId: number; status?: Status }) {
  const a = APPS.find((x) => x.id === selectedId) ?? APPS[0];
  return (
    <>
      <Intro page="Applications" />
      <div className="job-applications-split">
        <section className="job-application-list">
          <div className="job-list-heading"><h2>My applications <span>12</span></h2><span><CircleCheck size={11} />12 in this view</span></div>
          <div className="job-list-search"><span className="job-search"><Search size={14} /><span className="ns-ph">Search company, role, or location</span></span><span className="job-filter">All stages</span></div>
          <div className="job-list-segments"><span className="ns-seg on">All applications</span><span className="ns-seg">Active</span><span className="ns-seg">Closed</span></div>
          <div className="job-application-cards">
            {APPS.map((x) => {
              const st = x.id === selectedId && status ? status : x.status;
              return (
                <div key={x.id} className={`job-application-card ${x.id === selectedId ? 'selected' : ''}`}>
                  <div className="job-application-card-top"><span className="job-company-logo" style={{ background: x.color }}>{x.mark}</span><div className="job-application-card-copy"><strong>{x.role}</strong><small>{x.company}</small></div><span className={`job-status ${st}`}>· {st}</span></div>
                  <div className="job-card-bottom"><span><span><MapPin size={10} />{x.location}</span><span><BriefcaseBusiness size={10} />Full-time</span></span><span className="job-card-date">Applied {x.date.replace(', 2026', '')}</span></div>
                </div>
              );
            })}
          </div>
        </section>
        <SidePanel a={a} status={status && a.id === selectedId ? status : a.status} />
      </div>
    </>
  );
}

export const URL_TEXT = 'https://northstar.studio/careers/senior-product-designer';

export function Editor({ url, busy, filled, disclaimer, cv, version, scroll }: { url: string; busy: boolean; filled: number; disclaimer: boolean; cv: boolean; version: string; scroll: number }) {
  const f = (i: number, v: string) => (filled > i ? v : '');
  return (
    <div className="job-modal-backdrop job-editor-backdrop ns-backdrop">
      <motion.section className="job-editor ns-editor" initial={{ y: 60, opacity: 0, scale: 0.97 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 160, damping: 22 }}>
        <header className="job-editor-header"><div><p className="job-eyebrow">MAKE SPACE FOR YOUR NEXT CHAPTER</p><h2>A new possibility.</h2><p>Start with a link. Review the details. Make it yours.</p></div><span className="job-icon-button"><X size={18} /></span></header>
        <div className="ns-editor-viewport">
          <motion.div animate={{ y: -scroll }} transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}>
            <div className="job-session-banner"><Sprout size={14} /><span>Design prototype · Changes and CV uploads last only for this session. Nothing is uploaded to a server.</span></div>
            <div className="job-editor-form">
              <section className="job-import-box">
                <div className="job-editor-section-title"><span className="job-editor-step"><Sparkles size={16} /></span><div><h3>Start with a job posting</h3><p>Or skip the link and enter everything manually below.</p></div></div>
                <label>Original job posting URL<span className="ns-input">{url || <span className="ns-ph">https://company.com/careers/your-next-role</span>}{url && url.length < URL_TEXT.length && <i className="ns-caret" />}</span></label>
                <div className="job-import-bottom"><span className={`job-demo-button ns-demo ${busy ? 'busy' : ''}`}><Sparkles size={14} />{busy ? 'Preparing sample preview…' : 'Demo AI extraction'}</span><span>No website is fetched. No real AI runs.</span></div>
                {busy && <div className="job-demo-skeleton"><i /><i /><i /></div>}
              </section>
              {disclaimer && (
                <motion.div className="job-demo-disclaimer" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}><Sparkles size={16} /><span><strong>Sample content — not extracted from your URL.</strong> These illustrative fields are editable. Verify and replace them before saving. Your original link is kept separately.</span></motion.div>
              )}
              <section className="job-review-fields">
                <div className="job-editor-section-title"><span className="job-editor-step">02</span><div><h3>Review the opportunity</h3><p>You’re in control of every detail.</p></div></div>
                <div className="ns-fieldset">
                  <div className="job-editor-grid">
                    <Field label="Job title *" value={f(0, 'Senior Product Designer')} ph="Product Designer" />
                    <Field label="Company *" value={f(1, 'Northstar Studio (demo)')} ph="Company name" />
                    <Field label="Location" value={f(2, 'Remote · United States')} ph="Remote, city, or hybrid" />
                    <Field label="Employment type" value="Full-time" ph="" />
                    <Field label="Salary / compensation" value={f(3, '$132,000–$168,000 USD / year')} ph="Amount, currency & pay period" />
                    <Field label="Application status" value="Applied" ph="" />
                  </div>
                  <Field label="Job description" value={f(4, 'Partner with a small product team to make complex workflows feel simple. Lead discovery, prototype new experiences, and bring a considered visual craft to the product.')} ph="What will you work on?" tall />
                </div>
              </section>
              <section className="job-cv-block">
                <div className="job-editor-section-title"><span className="job-editor-step"><FileText size={15} /></span><div><h3>The CV for this application</h3><p>Keep the exact version you submitted, not a generic profile CV.</p></div></div>
                {cv ? (
                  <motion.div className="job-cv-file" initial={{ opacity: 0, y: -18, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}><FileText size={25} /><div><strong>Jamie_Lee_Northstar_CV.pdf</strong><small>{version || 'v1'} · Jun 18, 2026</small><small>Local file · available only during this prototype session</small></div><span className="job-icon-button"><X size={13} /></span></motion.div>
                ) : <div className="job-cv-empty">No CV attached to this application yet.</div>}
                <div className="job-upload-label ns-upload">{cv ? 'Replace with your file' : 'Attach the CV you submitted'}<span className="ns-file"><b>Choose file</b>{cv ? 'Jamie_Lee_Northstar_CV.pdf' : 'No file chosen'}</span></div>
                <span className="job-editor-help">PDF, DOC or DOCX · up to 15 MB.</span>
                {cv && <div className="job-version-label ns-version">CV version / label<span className="ns-input">{version}{version.length < 22 && <i className="ns-caret" />}</span></div>}
              </section>
            </div>
          </motion.div>
        </div>
        <footer className="job-editor-footer ns-footer"><span className="job-secondary">Cancel</span><span className="job-primary ns-save"><Check size={15} />Add application</span></footer>
      </motion.section>
    </div>
  );
}

function Field({ label, value, ph, tall }: { label: string; value: string; ph: string; tall?: boolean }) {
  return (
    <label>{label}
      <span className={`ns-input ${tall ? 'tall' : ''} ${value ? 'filled' : ''}`}>
        {value ? <motion.span key={value} initial={{ opacity: 0, x: -6, backgroundColor: '#eee9fc' }} animate={{ opacity: 1, x: 0, backgroundColor: 'rgba(238,233,252,0)' }} transition={{ duration: 0.6 }}>{value}</motion.span> : <span className="ns-ph">{ph}</span>}
      </span>
    </label>
  );
}

export function Toast({ text }: { text: string }) {
  return <motion.div className="job-notice ns-toast" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><Check size={15} />{text}</motion.div>;
}

export function SchedulePage({ tab }: { tab: 'Assessments' | 'Interviews' }) {
  return (
    <>
      <Intro page="Schedule" />
      <div className="job-middle">
        <section className="job-panel">
          <div className="job-panel-heading"><h2>Coming up next <span>4</span></h2></div>
          <div className="job-tabs">{(['Assessments', 'Interviews'] as const).map((t) => <span className={`ns-tab ${tab === t ? 'active' : ''}`} key={t}>{t}<span>2</span></span>)}</div>
          <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {EVENTS[tab].map((e) => (
              <div className="job-event" key={e.company}>
                <div className={`job-date ${tab === 'Interviews' ? 'mint' : ''}`}>JUN<strong>{e.day}</strong></div>
                <div className="job-event-info"><h3>{e.title}</h3><p>{e.company} · {e.detail}</p><div className="job-event-meta"><span><Clock3 size={10} />{e.time}</span></div></div>
                <span className="job-event-action"><ArrowUpRight size={14} /></span>
              </div>
            ))}
          </motion.div>
        </section>
      </div>
    </>
  );
}

export function Reminders() {
  return (
    <motion.div className="job-modal-backdrop ns-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.section className="job-modal" initial={{ y: 30, scale: 0.96 }} animate={{ y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 22 }}>
        <div className="job-modal-heading"><h2>Your reminders</h2><span className="job-icon-button"><X size={17} /></span></div>
        <p>A few things to keep on your radar this week.</p>
        <div className="job-modal-detail"><strong>4 upcoming events</strong><br />Check your assessments and interviews before your next conversation.</div>
        <div className="job-modal-detail" style={{ background: '#fcf5cd' }}><strong>2 applications need a nudge</strong><br />A thoughtful follow-up can go a long way.</div>
        <span className="job-primary">Open schedule <ChevronRight size={15} /></span>
      </motion.section>
    </motion.div>
  );
}
