import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { createPortal } from "react-dom";
import { PartyPopper, Heart, Star } from "lucide-react";
import { ArrowUpRight, ArrowRight, Plus, LayoutDashboard, BriefcaseBusiness, CalendarDays, Bell, Search, ChevronRight, Check, Clock3, Video, FileText, X, Sprout, Sparkles, Target, CircleCheck, ArrowUp, Send, MapPin } from "lucide-react";
import "./Home.css";
import "./HomeMotion.css";
import "./HomeCelebration.css";
import "./HomeApplications.css";

function CelebrationMoment({ title, detail, level, onDismiss }: { title: string; detail: string; level: number; onDismiss: () => void }) {
  const dismiss = useRef(onDismiss); dismiss.current = onDismiss;
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const timer = setTimeout(() => dismiss.current(), 2900);
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); dismiss.current(); }
      if (e.key === "Tab") { e.preventDefault(); closeButton.current?.focus(); }
    };
    document.addEventListener("keydown", handleKey, true);
    return () => { clearTimeout(timer); document.body.style.overflow = overflow; document.removeEventListener("keydown", handleKey, true); previous?.focus(); };
  }, []);
  return createPortal(<section className={`job-moment ${level === 0 ? "gentle" : level === 3 ? "offer" : ""}`} role="dialog" aria-modal="true" aria-labelledby="moment-title" aria-describedby="moment-description">
    <button ref={closeButton} className="job-moment-close" onClick={onDismiss} aria-label="Return to application"><X size={18}/></button>
    {level > 0 && <><div className="job-moment-halo"/><div className="job-moment-halo second"/><div className="job-moment-field" aria-hidden="true">{Array.from({ length: level === 3 ? 110 : 65 }, (_, i) => {
      const side = i % 4;
      const x = side === 0 ? -3 : side === 1 ? 103 : (i * 37) % 100;
      const y = side === 2 ? -3 : side === 3 ? 103 : (i * 29) % 100;
      const style = { "--x": `${x}%`, "--y": `${y}%`, "--dx": `${side === 0 ? 25 + i % 45 : side === 1 ? -(25 + i % 45) : (i % 2 ? 1 : -1) * (8 + i % 25)}vw`, "--dy": `${side === 2 ? 24 + i % 58 : side === 3 ? -(24 + i % 58) : (i % 2 ? 1 : -1) * (10 + i % 35)}vh`, "--spin": `${i % 2 ? 210 : -170}deg`, "--delay": `${(i % 9) * .06}s`, "--color": ["#b6a4d0", "#9dac82", "#d6bd69", "#d6a696"][i % 4], width: i % 7 === 0 ? 32 : i % 5 === 0 ? 20 : 7, height: i % 7 === 0 ? 32 : i % 5 === 0 ? 20 : 13 } as CSSProperties;
      return <span className="job-moment-particle" key={i} style={style}>{i % 7 === 0 ? <span style={{ fontSize: 28 }}>🎉</span> : i % 5 === 0 ? <Star/> : <i className="job-moment-piece"/>}</span>;
    })}</div></>}
    <div className="job-moment-copy">{level === 0 ? <Heart/> : level === 3 ? <PartyPopper/> : <Sparkles/>}<span className="job-moment-kicker">{level === 0 ? "A MOMENT TO RESET" : level === 3 ? "YOUR NEXT CHAPTER STARTS HERE" : "THIS IS YOUR MOMENT"}</span><h2 id="moment-title">{title} {level === 0 ? "💜" : "🎉"}</h2><p id="moment-description">{detail}</p></div>
    <span className="job-moment-return">RETURNING TO YOUR JOURNEY</span>
  </section>, document.body);
}

type Status = "Applied" | "Assessment" | "Interview" | "Offer" | "Rejected" | "Withdrawn";
type CV = { name: string; version: string; date: string; url?: string; sample?: boolean };
type Application = { id: number; company: string; role: string; status: Status; date: string; location: string; color: string; mark: string; source?: string; employment?: string; salary?: string; description?: string; requirements?: string; demo?: boolean; cv?: CV };
const statuses: Status[] = ["Applied", "Assessment", "Interview", "Offer", "Rejected", "Withdrawn"];
const seed: Application[] = [
  { id: 1, company: "Linear", role: "Product Designer", status: "Interview", date: "Jun 16, 2026", location: "Remote", color: "#eeebfb", mark: "◒" },
  { id: 2, company: "Notion", role: "Senior Product Designer", status: "Assessment", date: "Jun 15, 2026", location: "San Francisco, CA", color: "#eeeee8", mark: "N" },
  { id: 3, company: "Figma", role: "Product Designer", status: "Applied", date: "Jun 14, 2026", location: "New York, NY", color: "#faebe1", mark: "f" },
  { id: 4, company: "Spotify", role: "UX Designer", status: "Offer", date: "Jun 12, 2026", location: "Remote", color: "#e3f4df", mark: "≋" },
  { id: 5, company: "Framer", role: "Brand Designer", status: "Applied", date: "Jun 10, 2026", location: "Amsterdam, NL", color: "#e9edf8", mark: "F" },
  { id: 6, company: "Vercel", role: "Design Engineer", status: "Assessment", date: "Jun 9, 2026", location: "Remote", color: "#eeeee7", mark: "▲" },
  { id: 7, company: "Stripe", role: "Product Designer", status: "Interview", date: "Jun 8, 2026", location: "Remote", color: "#eee9fa", mark: "S" },
  { id: 8, company: "Miro", role: "UX Designer", status: "Rejected", date: "Jun 5, 2026", location: "London, UK", color: "#fcf5cd", mark: "M" },
  { id: 9, company: "Dropbox", role: "Visual Designer", status: "Withdrawn", date: "Jun 4, 2026", location: "Remote", color: "#e6edf9", mark: "D" },
  { id: 10, company: "Airbnb", role: "Product Designer", status: "Applied", date: "Jun 3, 2026", location: "San Francisco, CA", color: "#f9e7e3", mark: "A" },
  { id: 11, company: "Canva", role: "Interaction Designer", status: "Applied", date: "Jun 2, 2026", location: "Remote", color: "#e3f3ef", mark: "C" },
  { id: 12, company: "Webflow", role: "Product Designer", status: "Interview", date: "Jun 1, 2026", location: "Remote", color: "#e9edf8", mark: "W" },
];
const events = [
  { company: "Notion", title: "Product design challenge", day: "19", month: "JUN", time: "Due tomorrow · 5:00 PM", type: "Assessments", detail: "Take-home assessment", description: "Prepare a product design case study explaining your process, key decisions, and final solution. Review the recruiter’s original brief before submitting." },
  { company: "Vercel", title: "Design engineering exercise", day: "22", month: "JUN", time: "Monday · 11:59 PM", type: "Assessments", detail: "Technical assessment", description: "Complete the design engineering exercise and prepare a short walkthrough of your implementation. Submission instructions are in your recruiter’s email." },
  { company: "Linear", title: "Portfolio review with Maya", day: "19", month: "JUN", time: "Tomorrow · 10:30–11:15 AM", type: "Interviews", detail: "Video interview", description: "Walk the design team through two recent projects. Prepare to discuss your design decisions, collaboration, and the outcomes of your work." },
  { company: "Stripe", title: "Meet the product design team", day: "23", month: "JUN", time: "Tuesday · 2:00–3:00 PM", type: "Interviews", detail: "Team conversation", description: "A conversation with the product design team about your experience, approach to collaboration, and what you are looking for in your next role." },
];

const enrichedSeed = seed.map(a => ({ ...a, employment: "Full-time", salary: "Not specified", source: "", description: `Join the ${a.company} design team to shape thoughtful product experiences. Collaborate with product managers and engineers, explore customer problems, and carry ideas from early concepts through delivery.`, requirements: "Experience shipping digital products\nA portfolio showing your process and decisions\nStrong collaboration and communication skills", demo: true, cv: { name: `Jamie_Lee_${a.company}_CV.pdf`, version: "v2 · tailored application", date: a.date, sample: true } }));

function AnimatedCount({ value }: { value: number }) {
  const [shown, setShown] = useState(value);
  const previous = useRef(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(value); previous.current = value; return; }
    const start = performance.now(), from = previous.current;
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / 650, 1);
      setShown(Math.round(from + (value - from) * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick); previous.current = value;
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return <span aria-label={String(value)}>{String(shown).padStart(2, "0")}</span>;
}

function Journey({ status }: { status: Status }) {
  const stages: Status[] = ["Applied", "Assessment", "Interview", "Offer"];
  const index = stages.indexOf(status);
  return <section className="job-journey" aria-label={`Application journey: ${status}`}>
    <div className="job-journey-heading"><strong>Your progress</strong><span>{index < 0 ? "A chapter, not the whole story." : `${index + 1} of 4 stages`}</span></div>
    <div className="job-progress-track"><i style={{ transform: `scaleX(${index < 0 ? 0 : (index + 1) / 4})` }}/></div>
    <div className="job-journey-steps">{stages.map((s, i) => <div key={s} className={i <= index ? "reached" : ""}><span key={`${s}-${index}`} className="job-step-dot">{i < index ? <Check size={12}/> : i + 1}</span><small>{s}</small></div>)}</div>
    {status === "Applied" && <p className="job-waiting"><i/>Still waiting... We'll keep it on your radar.</p>}
    {status === "Rejected" && <p className="job-soft-message">Not this one — and that's okay. Keep going.</p>}
  </section>;
}

function ApplicationWorkspace({ application, onClose, onSave, registerURL, startEditing = false }: { application?: Application; onClose: () => void; onSave: (a: Application) => void; registerURL: (url: string) => void; startEditing?: boolean }) {
  const [draft, setDraft] = useState<Application>(() => application ? { ...application } : { id: Date.now(), company: "", role: "", status: "Applied", date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), location: "", color: "#eee9fc", mark: "", employment: "Full-time", salary: "", description: "", requirements: "", source: "" });
  const [editing, setEditing] = useState(!application || startEditing);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [fileError, setFileError] = useState("");
  const panel = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeRef = useRef(onClose); closeRef.current = onClose;
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    const keydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
      if (e.key !== "Tab") return;
      const items = Array.from(panel.current?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled])') || []).filter(el => el.getClientRects().length);
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) { e.preventDefault(); last?.focus(); }
      else if (!e.shiftKey && (document.activeElement === last || document.activeElement === panel.current)) { e.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", keydown);
    return () => { if (timer.current) clearTimeout(timer.current); document.body.style.overflow = oldOverflow; document.removeEventListener("keydown", keydown); previous?.focus(); };
  }, []);
  const field = (key: keyof Application, value: string) => setDraft(d => ({ ...d, [key]: value }));
  const validURL = (value: string) => { try { const u = new URL(value); return /^https?:\/\//i.test(value) && ["https:", "http:"].includes(u.protocol) && !!u.hostname; } catch { return false; } };
  const extract = () => {
    if (!validURL(draft.source || "")) { setError("Enter a complete http:// or https:// job posting URL."); return; }
    setError(""); setBusy(true);
    timer.current = setTimeout(() => {
      setDraft(d => ({ ...d, company: "Northstar Studio (demo)", role: "Senior Product Designer", location: "Remote · United States", employment: "Full-time", salary: "$132,000–$168,000 USD / year", description: "Partner with a small product team to make complex workflows feel simple. Lead discovery, prototype new experiences, and bring a considered visual craft to the product.", requirements: "5+ years of product design experience\nA portfolio of end-to-end product work\nConfidence with prototyping and design systems\nStrong written communication", demo: true }));
      setBusy(false);
    }, 1100);
  };
  const upload = (file?: File) => {
    if (!file) return;
    if (!/\.(pdf|doc|docx)$/i.test(file.name)) { setFileError("Choose a PDF, DOC, or DOCX file."); return; }
    if (file.size > 15 * 1024 * 1024) { setFileError("Please choose a file smaller than 15 MB."); return; }
    const url = URL.createObjectURL(file); registerURL(url);
    setDraft(d => ({ ...d, cv: { name: file.name, version: "v1", date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), url } })); setFileError("");
  };
  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (draft.source && !validURL(draft.source)) { setError("Use a valid http:// or https:// URL, or leave the source blank."); return; }
    if (!draft.company.trim() || !draft.role.trim()) return;
    onSave({ ...draft, company: draft.company.trim(), role: draft.role.trim(), mark: draft.company.trim().charAt(0).toUpperCase() });
  };
  const cvBlock = <section className="job-cv-block">
    <div className="job-editor-section-title"><span className="job-editor-step"><FileText size={15}/></span><div><h3>The CV for this application</h3><p>Keep the exact version you submitted, not a generic profile CV.</p></div></div>
    {draft.cv ? <div className="job-cv-file"><FileText size={25}/><div><strong>{draft.cv.name}</strong><small>{draft.cv.version} · {draft.cv.date}</small><small>{draft.cv.sample ? "Sample CV label only — no file attached." : "Local file · available only during this prototype session"}</small></div>{editing && <button type="button" className="job-icon-button" aria-label="Remove CV attachment" onClick={() => setDraft(d => ({ ...d, cv: undefined }))}><X size={13}/></button>}</div> : <div className="job-cv-empty">No CV attached to this application yet.</div>}
    {draft.cv?.url && <div className="job-cv-links"><a href={draft.cv.url} target="_blank" rel="noreferrer">Open selected file <ArrowUpRight size={12}/></a><a href={draft.cv.url} download={draft.cv.name}>Download this CV <ArrowRight size={12}/></a></div>}
    {editing && <><label className="job-upload-label">{draft.cv ? "Replace with your file" : "Attach the CV you submitted"}<input type="file" accept=".pdf,.doc,.docx" onChange={e => { upload(e.target.files?.[0]); e.target.value = ""; }}/></label><span className="job-editor-help">PDF, DOC or DOCX · up to 15 MB. Word files may download instead of opening in the browser.</span>{draft.cv && <label className="job-version-label">CV version / label<input value={draft.cv.version} onChange={e => setDraft(d => ({ ...d, cv: d.cv ? { ...d.cv, version: e.target.value } : undefined }))} placeholder="e.g. v3 · portfolio-focused"/></label>}</>}
    {fileError && <p className="job-editor-error" role="alert">{fileError}</p>}
  </section>;
  return <div className="job-modal-backdrop job-editor-backdrop" onClick={onClose}><section ref={panel} tabIndex={-1} className="job-editor" role="dialog" aria-modal="true" aria-labelledby="job-editor-title" onClick={e => e.stopPropagation()}>
    <header className="job-editor-header"><div><p className="job-eyebrow">{application ? "YOUR APPLICATION, ALL TOGETHER" : "MAKE SPACE FOR YOUR NEXT CHAPTER"}</p><h2 id="job-editor-title">{application ? editing ? "A few thoughtful updates." : draft.role : "A new possibility."}</h2><p>{application ? `${draft.company} · Applied ${draft.date}` : "Start with a link. Review the details. Make it yours."}</p></div><button className="job-icon-button" aria-label="Close application panel" onClick={onClose}><X size={18}/></button></header>
    <div className="job-session-banner"><Sprout size={14}/><span>Design prototype · Changes and CV uploads last only for this session. Nothing is uploaded to a server.</span></div>
    {editing ? <form onSubmit={save} className="job-editor-form">
      <section className="job-import-box"><div className="job-editor-section-title"><span className="job-editor-step"><Sparkles size={16}/></span><div><h3>Start with a job posting</h3><p>Or skip the link and enter everything manually below.</p></div></div><label>Original job posting URL<input type="text" inputMode="url" placeholder="https://company.com/careers/your-next-role" value={draft.source || ""} disabled={busy} onChange={e => { field("source", e.target.value); setError(""); }}/></label><div className="job-import-bottom"><button type="button" className="job-demo-button" disabled={busy} onClick={extract}><Sparkles size={14}/>{busy ? "Preparing sample preview…" : "Demo AI extraction"}</button><span>No website is fetched. No real AI runs.</span></div>{error && <p className="job-editor-error" role="alert">{error}</p>}{busy && <div className="job-demo-skeleton" role="status" aria-label="Preparing demonstration fields"><i/><i/><i/></div>}</section>
      {draft.demo && <div className="job-demo-disclaimer" role="status"><Sparkles size={16}/><span><strong>Sample content — not extracted from your URL.</strong> These illustrative fields are editable. Verify and replace them before saving. Your original link is kept separately.</span></div>}
      <section className="job-review-fields"><div className="job-editor-section-title"><span className="job-editor-step">02</span><div><h3>Review the opportunity</h3><p>You’re in control of every detail.</p></div></div><fieldset disabled={busy}><div className="job-editor-grid"><label>Job title *<input required value={draft.role} onChange={e => field("role", e.target.value)} placeholder="Product Designer"/></label><label>Company *<input required value={draft.company} onChange={e => field("company", e.target.value)} placeholder="Company name"/></label><label>Location<input value={draft.location} onChange={e => field("location", e.target.value)} placeholder="Remote, city, or hybrid"/></label><label>Employment type<select value={draft.employment || "Full-time"} onChange={e => field("employment", e.target.value)}>{["Full-time", "Part-time", "Contract", "Internship", "Temporary", "Not specified"].map(v => <option key={v}>{v}</option>)}</select></label><label>Salary / compensation<input value={draft.salary || ""} onChange={e => field("salary", e.target.value)} placeholder="Amount, currency & pay period"/></label><label>Application status<select value={draft.status} onChange={e => field("status", e.target.value)}>{statuses.map(s => <option key={s}>{s}</option>)}</select></label></div><label>Job description<textarea rows={4} value={draft.description || ""} onChange={e => field("description", e.target.value)} placeholder="What will you work on?"/></label><label>Requirements<textarea rows={3} value={draft.requirements || ""} onChange={e => field("requirements", e.target.value)} placeholder="Skills and experience, one per line"/></label></fieldset></section>
      {cvBlock}<footer className="job-editor-footer"><button type="button" className="job-secondary" onClick={onClose}>Cancel</button><button className="job-primary" disabled={busy} type="submit"><Check size={15}/>{application ? "Save application" : "Add application"}</button></footer>
    </form> : <div className="job-details-body"><div className="job-detail-summary"><div><span>APPLICATION STAGE</span><select className={`job-status ${draft.status}`} value={draft.status} aria-label="Application stage" onChange={e => field("status", e.target.value)}>{statuses.map(s => <option key={s}>{s}</option>)}</select></div><div><span>LOCATION</span><strong>{draft.location || "Not specified"}</strong></div><div><span>EMPLOYMENT</span><strong>{draft.employment || "Not specified"}</strong></div><div><span>COMPENSATION</span><strong>{draft.salary || "Not specified"}</strong></div></div>
      <Journey status={draft.status}/>
      {draft.demo && <div className="job-demo-disclaimer"><Sparkles size={15}/><span>Sample job information for this design prototype. Not verified or fetched from a posting.</span></div>}
      <section><h3>About the opportunity</h3><p className="job-detail-prose">{draft.description || "No job description added yet."}</p></section><section><h3>What they’re looking for</h3><ul className="job-requirements">{draft.requirements ? draft.requirements.split("\n").filter(Boolean).map((r, i) => <li key={i}>{r}</li>) : <li>No requirements added yet.</li>}</ul></section>
      <section className="job-source-block"><h3>Original job posting</h3>{draft.source && validURL(draft.source) ? <a href={draft.source} target="_blank" rel="noreferrer">{draft.source}<ArrowUpRight size={14}/></a> : <p>No original posting linked. Add it when you edit this application.</p>}</section>
      {cvBlock}<footer className="job-editor-footer"><button className="job-secondary" onClick={() => setEditing(true)}>Edit details & CV</button><button className="job-primary" onClick={() => onSave(draft)}><Check size={15}/>Save & close</button></footer>
    </div>}
  </section></div>;
}

function OpportunityPanel({ application: a, onEdit, onStatus }: { application: Application; onEdit: () => void; onStatus: (status: Status) => void }) {
  const stages: Status[] = ["Applied", "Assessment", "Interview", "Offer"];
  const index = stages.indexOf(a.status);
  return <aside className="job-opportunity-panel" aria-label={`${a.company} opportunity details`}>
    <div className="job-opportunity-head"><span>OPPORTUNITY DETAILS</span><button className="job-icon-button" onClick={onEdit} aria-label={`Edit ${a.company} application`}><FileText size={13}/></button></div>
    <div className="job-opportunity-copy" key={a.id}>
      <span className="job-company-logo" style={{ color: "#80758f" }}>{a.mark}</span>
      <h2>{a.role}</h2><p className="job-opportunity-company">{a.company} · {a.location || "Location not specified"}</p>
      <span className={`job-status ${a.status}`}>· {a.status}</span>
      <dl className="job-opportunity-facts"><div><dt>Salary range</dt><dd>{a.salary || "Not specified"}</dd></div><div><dt>Job type</dt><dd>{a.employment || "Not specified"}</dd></div><div><dt>Applied on</dt><dd>{a.date}</dd></div><div><dt>Source</dt><dd>{a.source ? "Job posting" : "Manually added"}</dd></div></dl>
      <div className="job-opportunity-controls"><select aria-label={`${a.company} application stage`} value={a.status} onChange={e => onStatus(e.target.value as Status)}>{statuses.map(s => <option key={s}>{s}</option>)}</select>{a.source ? <a href={a.source} target="_blank" rel="noreferrer">View job posting <ArrowUpRight size={12}/></a> : <span>No posting linked</span>}</div>
      <section className="job-opportunity-section"><h3><Clock3 size={13}/>Application journey</h3><div className="job-side-timeline">{stages.map((s, i) => <div key={s} className={`job-side-step ${i <= index ? "reached" : ""} ${i === index ? "current" : ""}`}><i>{i < index ? <Check size={11}/> : i + 1}</i><div><strong>{s}</strong><small>{i === index ? "Current stage" : i < index ? "Earlier stage" : "Ahead of you"}</small></div></div>)}</div>{index < 0 && <p style={{ marginTop: 12 }}>Application {a.status.toLowerCase()}. Your next opportunity is still ahead.</p>}</section>
      <section className="job-opportunity-section"><h3><FileText size={13}/>CV submitted</h3>{a.cv ? <><div className="job-side-cv"><FileText size={22}/><div><strong>{a.cv.name}</strong><small>{a.cv.version}</small><small>{a.cv.sample ? "Sample label · no file attached" : `Attached ${a.cv.date} · session only`}</small></div></div>{a.cv.url && <div className="job-side-cv-links"><a href={a.cv.url} target="_blank" rel="noreferrer">Open CV ↗</a><a href={a.cv.url} download={a.cv.name}>Download CV</a></div>}</> : <p>No CV attached yet. Add the version you submitted.</p>}<button className="job-secondary job-side-edit" onClick={onEdit}>{a.cv ? "Edit details & CV" : "Attach your CV"}</button></section>
      <section className="job-opportunity-section"><h3>About the role</h3><p>{a.description || "No description added yet."}</p></section>
      <section className="job-opportunity-section"><h3>What they’re looking for</h3><ul>{a.requirements ? a.requirements.split("\n").filter(Boolean).map((r, i) => <li key={i}>{r}</li>) : <li>No requirements added yet.</li>}</ul></section>
      {a.demo && <p className="job-side-disclaimer">Sample job details for this prototype. Not fetched from a job posting.</p>}
    </div>
  </aside>;
}

export function Home() {
  const [apps, setApps] = useState<Application[]>(enrichedSeed);
  const [page, setPage] = useState(() => new URLSearchParams(window.location.search).get("page") === "applications" ? "Applications" : "Overview");
  const [cardId, setCardId] = useState<number>(1);
  const [applicationGroup, setApplicationGroup] = useState("All applications");
  const [eventTab, setEventTab] = useState("Assessments");
  const [filter, setFilter] = useState("All statuses");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<"add" | "notifications" | null>(() => new URLSearchParams(window.location.search).get("panel") === "add" ? "add" : null);
  const [selectedId, setSelectedId] = useState<number | null>(() => new URLSearchParams(window.location.search).get("panel") === "details" ? 1 : null);
  const fileURLs = useRef<string[]>([]);
  useEffect(() => () => fileURLs.current.forEach(url => URL.revokeObjectURL(url)), []);
  const [event, setEvent] = useState<(typeof events)[number] | null>(null);
  const [followed, setFollowed] = useState<number[]>([]);
  const [notice, setNotice] = useState("");
  const [feedback, setFeedback] = useState<{ title: string; detail: string; level: number; key: number } | null>(null);
  const [completedEvents, setCompletedEvents] = useState<string[]>([]);
  const milestones = useRef(new Set<string>([
    ...(enrichedSeed.some(a => a.status === "Interview" || a.status === "Offer") ? ["interview"] : []),
    ...(enrichedSeed.length >= 10 ? ["ten"] : []),
  ]));
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (noticeTimer.current) clearTimeout(noticeTimer.current); }, []);
  const notify = (text: string) => { setNotice(text); if (noticeTimer.current) clearTimeout(noticeTimer.current); noticeTimer.current = setTimeout(() => setNotice(""), 3800); };
  const celebrate = (title: string, detail: string, level: number) => {
    setNotice("");
    setFeedback({ title, detail, level, key: Date.now() });
  };
  const stageFeedback = (previous: Status, next: Status, company: string) => {
    if (previous === next) return;
    if (next === "Rejected") celebrate("Not this time", "Keep going. Your next opportunity is still ahead.", 0);
    else if (next === "Offer") celebrate("YOU GOT AN OFFER!", `${company} sees what you bring. This moment is yours.`, 3);
    else if (next === "Interview") {
      const first = !milestones.current.has("interview") && count("Interview") === 0;
      if (first) milestones.current.add("interview");
      celebrate(previous === "Assessment" ? "YOU PASSED!" : "YOU'RE MOVING FORWARD!", "You're moving forward to the interview!", 2);
    } else if (previous === "Applied" && next === "Assessment") celebrate("YOU'RE MOVING FORWARD!", `${company} · A chance to show what you can do.`, 1);
  };
  const filtered = apps.filter(a => (filter === "All statuses" || a.status === filter) && `${a.company} ${a.role} ${a.location}`.toLowerCase().includes(search.toLowerCase()));
  const applicationCards = filtered.filter(a => applicationGroup === "All applications" || (applicationGroup === "Active" ? !["Offer", "Rejected", "Withdrawn"].includes(a.status) : ["Offer", "Rejected", "Withdrawn"].includes(a.status)));
  const activeCard = applicationCards.find(a => a.id === cardId) || applicationCards[0];
  const shown = page === "Applications" ? filtered : filtered.slice(0, 5);
  const followups = apps.filter(a => [3, 5].includes(a.id) && !followed.includes(a.id) && a.status === "Applied");
  const count = (s: Status) => apps.filter(a => a.status === s).length;
  const allEvents = events.filter(e => !completedEvents.includes(e.company) && apps.some(a => a.company === e.company && a.status === (e.type === "Assessments" ? "Assessment" : "Interview")));
  const visibleEvents = [...allEvents, ...events.filter(e => completedEvents.includes(e.company))].filter(e => e.type === eventTab);
  const updateStatus = (id: number, next: Status) => { const previous = apps.find(a => a.id === id); setApps(prev => prev.map(a => a.id === id ? { ...a, status: next } : a)); if (previous) stageFeedback(previous.status, next, previous.company); };
  const saveApplication = (application: Application) => {
    const previous = apps.find(a => a.id === application.id);
    setApps(prev => prev.some(a => a.id === application.id) ? prev.map(a => a.id === application.id ? application : a) : [application, ...prev]);
    setModal(null); setSelectedId(null);
    setCardId(application.id);
    if (previous && previous.status !== application.status) stageFeedback(previous.status, application.status, application.company);
    else if (!previous && apps.length + 1 === 10 && !milestones.current.has("ten")) { milestones.current.add("ten"); celebrate("🎯 10 Applications", "Ten doors opened. Every thoughtful application is a step forward.", 2); }
    else if (!previous && application.status === "Interview" && !milestones.current.has("interview") && count("Interview") === 0) { milestones.current.add("interview"); celebrate("🏆 First Interview", "Your first conversation starts a whole new chapter.", 2); }
    else notify("Application saved in this prototype session.");
  };
  const showApplications = () => { setPage("Applications"); setFilter("All statuses"); };
  return <div className="job-app">
    <aside className="job-sidebar">
      <div className="job-brand"><span className="job-brand-mark"><Sprout size={22}/></span> nextstep<small>®</small></div>
      <div className="job-workspace">YOUR WORKSPACE</div>
      <nav className="job-nav" aria-label="Main navigation">
        {[{ title: "Overview", icon: LayoutDashboard }, { title: "Applications", icon: BriefcaseBusiness }, { title: "Schedule", icon: CalendarDays }].map(({ title, icon: Icon }) => <button key={title} className={page === title ? "active" : ""} onClick={() => setPage(title)}><Icon size={17}/>{title}{title === "Applications" && <span>{apps.length}</span>}</button>)}
      </nav>
      <div className="job-sidebar-note"><Sparkles size={21} strokeWidth={1.3}/><h3>Small steps. Big possibilities.</h3><p>Your next chapter starts with showing up. You’re doing great.</p><div className="job-earned-milestones" aria-label="Milestones already reached"><span><CircleCheck size={11}/>First Interview</span>{apps.length >= 10 && <span><Target size={11}/>10 Applications</span>}<small>Milestones reached</small></div></div>
      <div className="job-profile"><span className="job-avatar">JL</span><div><strong>Jamie Lee</strong><p>Your personal workspace</p></div></div>
    </aside>
    <main className={`job-main ${page === "Schedule" ? "job-agenda-full" : ""} ${page === "Applications" ? "job-applications-page" : ""}`}>
      <header className="job-topbar"><div className="job-breadcrumb">Workspace <ChevronRight size={12}/><strong>{page}</strong></div><div className="job-brand job-mobile-brand"><span className="job-brand-mark"><Sprout size={20}/></span>nextstep</div><div className="job-top-right"><span>Thursday, June 18, 2026</span><button className="job-icon-button" aria-label="View reminders" onClick={() => setModal("notifications")}><Bell size={16}/><i className="job-dot"/></button><span className="job-avatar">JL</span></div></header>
      <div className="job-content" key={page}>
         <section className="job-intro"><div><p className="job-eyebrow">{page === "Applications" ? "ONE STEP CLOSER" : "A LITTLE PROGRESS, EVERY DAY"}</p><h1>{page === "Overview" ? <>Your next chapter, <span>in motion.</span></> : page === "Applications" ? "Your next chapter, organized." : <>Make room for <span>what’s next.</span></>}</h1><p>{page === "Overview" ? "Welcome back, Jamie. Let’s keep your job search moving forward." : page === "Applications" ? "Every opportunity. Every little milestone. All in one place." : "Your upcoming assessments and conversations, all together."}</p></div><button className="job-primary" onClick={() => setModal("add")}><Plus size={16}/> Add application</button></section>
        {page !== "Schedule" && <section className="job-stats" aria-label="Application statistics">
          {[{ label: "Total applications", value: apps.length, icon: BriefcaseBusiness, note: "Every opportunity counts", prefix: "" }, { label: "Active applications", value: apps.filter(a => !["Rejected", "Withdrawn", "Offer"].includes(a.status)).length, icon: Target, note: "Opportunities in progress", prefix: "" }, { label: "In interview", value: count("Interview"), icon: Video, note: "Making meaningful connections", prefix: "" }, { label: "Offers received", value: count("Offer"), icon: CircleCheck, note: "Something to be proud of", prefix: "" }].map(stat => <div className="job-stat" key={stat.label}><div className="job-stat-top">{stat.label}<i><stat.icon size={16} strokeWidth={1.5}/></i></div><div className="job-stat-value"><AnimatedCount value={stat.value}/></div><div className="job-stat-bottom">{stat.label === "Offers received" ? <Sparkles size={11}/> : <ArrowUp size={11}/>} {stat.note}</div><div className="job-stat-meter" aria-label={`${stat.value} of ${apps.length} applications`}><i style={{ transform: `scaleX(${stat.value / Math.max(apps.length, 1)})` }}/></div></div>)}
        </section>}
        {page !== "Applications" && <div className="job-middle">
          <section className="job-panel"><div className="job-panel-heading"><h2>Coming up next <span>{allEvents.length}</span></h2>{page !== "Schedule" && <button className="job-text-button" onClick={() => setPage("Schedule")}>View schedule <ArrowUpRight size={13}/></button>}</div>
            <div className="job-tabs" role="tablist">{["Assessments", "Interviews"].map(t => <button role="tab" aria-selected={eventTab === t} className={eventTab === t ? "active" : ""} key={t} onClick={() => setEventTab(t)}>{t}<span>{allEvents.filter(e => e.type === t).length}</span></button>)}</div>
            <div key={eventTab} className="job-event-list">{visibleEvents.length ? visibleEvents.map(e => <div className={`job-event ${completedEvents.includes(e.company) ? "is-complete" : ""}`} key={e.company}><div className={`job-date ${e.type === "Interviews" ? "mint" : ""}`}>{completedEvents.includes(e.company) ? <Check className="job-check-draw" size={23}/> : <>{e.month}<strong>{e.day}</strong></>}</div><div className="job-event-info"><h3>{e.title}</h3><p>{e.company} · {e.detail}</p><div className="job-event-meta"><span>{completedEvents.includes(e.company) ? <><CircleCheck size={12}/>Completed · One step forward</> : <><Clock3 size={10}/>{e.time}</>}</span></div></div><button className="job-event-action" aria-label={`View ${e.company} ${e.type.toLowerCase()}`} onClick={() => setEvent(e)}><ArrowUpRight size={14}/></button></div>) : <div className="job-empty"><Sprout size={26}/>Your schedule is clear.<small>A little breathing room. New opportunities are ahead.</small></div>}</div>
          </section>
          <section className="job-panel job-followup"><div className="job-panel-heading"><h2>A little nudge <span>{followups.length}</span></h2><Send size={15} color="#aaa88a"/></div><p className="job-followup-sub">These applications could use a follow-up.</p>
            {followups.map(a => <div className="job-followup-item" key={a.id}><div className="job-company-line"><span className="job-company-logo" style={{ background: a.color }}>{a.mark}</span><div><h3>{a.company}</h3><p>{a.role}</p></div></div><div className="job-followup-bottom"><span><Clock3 size={10}/>{a.id === 3 ? "4" : "8"} days since you applied</span><button onClick={() => { setFollowed(prev => [...prev, a.id]); notify(`Follow-up with ${a.company} marked as sent.`); }}>Mark contacted <ArrowUpRight size={10} style={{ display: "inline", marginLeft: 3 }}/></button></div></div>)}
            {!followups.length && <div className="job-empty"><Check size={24} style={{ margin: "0 auto 10px" }}/>All caught up. Nice work!</div>}
          </section>
        </div>}
        {page === "Applications" && <div className="job-applications-split">
          <section className="job-application-list" aria-label="My applications">
            <div className="job-list-heading"><h2>My applications <span>{apps.length}</span></h2><span><CircleCheck size={11}/>{applicationCards.length} in this view</span></div>
            <div className="job-list-search"><label className="job-search"><Search size={14}/><input aria-label="Search company, role, or location" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search company, role, or location"/></label><select className="job-filter" aria-label="Filter application stages" value={filter} onChange={e => setFilter(e.target.value)}><option value="All statuses">All stages</option>{statuses.map(s => <option key={s}>{s}</option>)}</select></div>
            <div className="job-list-segments" aria-label="Application groups">{["All applications", "Active", "Closed"].map(group => <button key={group} aria-pressed={applicationGroup === group} onClick={() => setApplicationGroup(group)}>{group}</button>)}</div>
            <div className="job-application-cards">{applicationCards.map(a => <div key={a.id}>
              <button className={`job-application-card ${activeCard?.id === a.id ? "selected" : ""}`} aria-pressed={activeCard?.id === a.id} aria-label={`Select ${a.role} at ${a.company}`} onClick={() => setCardId(a.id)}>
                <div className="job-application-card-top"><span className="job-company-logo" style={{ background: a.color }}>{a.mark}</span><div className="job-application-card-copy"><strong>{a.role}</strong><small>{a.company}</small></div><span className={`job-status ${a.status}`}>· {a.status}</span></div>
                <div className="job-card-bottom"><span><span><MapPin size={10}/>{a.location || "Not specified"}</span><span><BriefcaseBusiness size={10}/>{a.employment || "Not specified"}</span></span><span className="job-card-date">Applied {a.date.replace(", 2026", "")}</span></div>
              </button>
              {activeCard?.id === a.id && <div className="job-inline-detail-mobile"><OpportunityPanel application={a} onEdit={() => setSelectedId(a.id)} onStatus={s => updateStatus(a.id, s)}/></div>}
            </div>)}</div>
            {!applicationCards.length && <div className="job-empty"><Search size={24}/>No opportunities match this view.<small>Try another company, location, or stage.</small><button className="job-secondary" style={{ marginTop: 16 }} onClick={() => { setSearch(""); setFilter("All statuses"); setApplicationGroup("All applications"); }}>Clear filters</button></div>}
          </section>
          {activeCard ? <OpportunityPanel application={activeCard} onEdit={() => setSelectedId(activeCard.id)} onStatus={s => updateStatus(activeCard.id, s)}/> : <aside className="job-opportunity-panel"><div className="job-empty"><BriefcaseBusiness size={28}/>Your next possibility.<small>Select an application to see its details here.</small></div></aside>}
        </div>}
        {page === "Overview" && <section className="job-panel job-recent"><div className="job-panel-heading"><h2>Recent applications</h2><div className="job-table-controls"><label className="job-search"><Search size={13}/><input aria-label="Search applications" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search applications…"/></label><select className="job-filter" aria-label="Filter by status" value={filter} onChange={e => setFilter(e.target.value)}><option>All statuses</option>{statuses.map(s => <option key={s}>{s}</option>)}</select><button className="job-text-button" onClick={showApplications}>View all <ArrowUpRight size={13}/></button></div></div>
          <div className="job-table-scroll"><table className="job-table"><thead><tr><th>COMPANY & ROLE</th><th>STATUS</th><th>DATE APPLIED</th><th>LOCATION</th><th aria-label="Details"/></tr></thead><tbody>{shown.map(a => <tr key={a.id} className="job-clickable-row" onClick={() => setSelectedId(a.id)}><td><button className="job-company-line job-company-open" onClick={e => { e.stopPropagation(); setSelectedId(a.id); }} aria-label={`Open ${a.company} ${a.role} details`}><span className="job-company-logo" style={{ background: a.color }}>{a.mark}</span><div><h3>{a.company}</h3><p>{a.role}</p></div></button></td><td><select onClick={e => e.stopPropagation()} aria-label={`${a.company} application status`} className={`job-status ${a.status}`} value={a.status} onChange={e => updateStatus(a.id, e.target.value as Status)}>{statuses.map(s => <option key={s}>{s}</option>)}</select></td><td>{a.date}</td><td>{a.location}</td><td><button className="job-text-button" aria-label={`View ${a.company} application`} onClick={e => { e.stopPropagation(); setSelectedId(a.id); }}><ArrowUpRight size={15}/></button></td></tr>)}</tbody></table></div>
          {!shown.length && <div className="job-empty">No applications match this view.<br/><button className="job-text-button" style={{ margin: "12px auto" }} onClick={() => { setFilter("All statuses"); setSearch(""); }}>Clear filters <ArrowRight size={12}/></button></div>}
          <div className="job-table-footer"><span>Showing {shown.length} of {filtered.length} applications</span><span>Your next yes is out there.</span></div>
        </section>}
        <p className="job-bottom-note"><Sprout size={12}/> A job search is a journey, not a race. You’re right where you need to be.</p>
      </div>
    </main>
    {(modal === "add" || selectedId !== null) && <ApplicationWorkspace key={selectedId || "new"} application={apps.find(a => a.id === selectedId)} startEditing={page === "Applications"} onClose={() => { setModal(null); setSelectedId(null); }} onSave={saveApplication} registerURL={url => fileURLs.current.push(url)}/>}
    {(modal === "notifications" || event) && <div className="job-modal-backdrop" onClick={() => { setModal(null); setEvent(null); }}><section className="job-modal" role="dialog" aria-modal="true" aria-label={event ? event.title : "Your reminders"} onClick={e => e.stopPropagation()}><div className="job-modal-heading"><h2>{event ? event.company : "Your reminders"}</h2><button className="job-icon-button" aria-label="Close dialog" onClick={() => { setModal(null); setEvent(null); }}><X size={17}/></button></div>
      {modal === "notifications" && <><p>A few things to keep on your radar this week.</p><div className="job-modal-detail"><strong>{allEvents.length} upcoming events</strong><br/>Check your assessments and interviews before your next conversation.</div><div className="job-modal-detail" style={{ background: "#fcf5cd" }}><strong>{followups.length} applications need a nudge</strong><br/>A thoughtful follow-up can go a long way.</div><button className="job-primary" onClick={() => { setPage("Schedule"); setModal(null); }}>Open schedule <ArrowRight size={15}/></button></>}
      {event && <><div className="job-modal-detail"><strong>{event.title}</strong><br/>{event.month} {event.day} · {event.time}<br/>{event.detail}</div><p>{event.description}</p><p><MapPin size={13} style={{ display: "inline" }}/> Remote · All times in your local timezone.</p><div className="job-event-timeline"><span><CircleCheck size={16}/>Scheduled</span><i/><span key={String(completedEvents.includes(event.company))} className={completedEvents.includes(event.company) ? "finished" : ""}>{completedEvents.includes(event.company) ? <Check className="job-check-draw" size={18}/> : <Clock3 size={16}/>} {completedEvents.includes(event.company) ? "Completed" : "Ready when you are"}</span></div><button className="job-primary" disabled={completedEvents.includes(event.company)} onClick={() => { setCompletedEvents(prev => [...prev, event.company]); notify(event.type === "Assessments" ? "Assessment complete. Nice work — give yourself a breather." : "Interview complete. You showed up, and that matters."); }}><CircleCheck size={15}/>{completedEvents.includes(event.company) ? "Completed — nicely done" : `Mark ${event.type === "Assessments" ? "assessment" : "interview"} completed`}</button><button className="job-secondary job-event-close" onClick={() => setEvent(null)}>Back to my schedule</button></>}
      {event && <button className="job-secondary job-event-close" onClick={() => {
        const current = apps.find(a => a.company === event.company);
        setCompletedEvents(prev => prev.includes(event.company) ? prev : [...prev, event.company]);
        if (event.type === "Assessments" && current) setApps(prev => prev.map(a => a.id === current.id ? { ...a, status: "Interview" } : a));
        celebrate(event.type === "Assessments" ? "YOU PASSED!" : "YOU MADE IT TO THE NEXT STAGE!", event.type === "Assessments" ? "You're moving forward to the interview!" : "Your hard work is opening new doors.", 2);
        setEvent(null);
      }}>Confirm {event.type === "Assessments" ? "assessment" : "interview"} passed</button>}
    </section></div>}
    <nav className="job-mobile-nav" aria-label="Mobile navigation">{[{ title: "Overview", icon: LayoutDashboard }, { title: "Applications", icon: BriefcaseBusiness }, { title: "Schedule", icon: CalendarDays }].map(({ title, icon: Icon }) => <button key={title} className={page === title ? "active" : ""} onClick={() => { setPage(title); window.scrollTo({ top: 0, behavior: "smooth" }); }}><Icon size={18}/>{title}</button>)}</nav>
    {notice && <div className="job-notice" role="status"><Check size={15}/>{notice}</div>}
    {feedback && <CelebrationMoment {...feedback} onDismiss={() => setFeedback(null)}/>}
  </div>;
}