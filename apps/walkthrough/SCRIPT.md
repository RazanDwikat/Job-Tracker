# Nextstep — Narrated click-by-click demo (16:9, 76.2 s)

Revision 2 brief (user, Arabic): make it feel like I'm giving a demo myself — clicking button after button and seeing what each one does — and add a voice that explains.

## Treatment
- **Promise:** Nextstep keeps a whole job search — links, CVs, stages, small wins — calm and in one place.
- **Identity:** The approved prototype: paper #fdfdfa, butter #fcf5cd, mint #e6f6df, lavender #eee9fc, ink #282a26. DM Sans + Instrument Serif italic.
- **Hero:** The real Nextstep UI rebuilt from the prototype CSS on a 1440x810 world, filmed by a virtual camera. A drawn pointer performs each click: ripple + a lavender "click label" pill naming the control.
- **Narration:** first-person Levantine Arabic, female voice (ElevenLabs "Phaza Arabic audition — Lina", eleven_multilingual_v2). Each line starts 0.3 s into its scene.
- **Arc:** word punches -> guided clicks through every area -> offer celebration -> lockup.

## Timeline (SCENE_DURATIONS, ms)
| # | Start-End (s) | Key | ms | VO length |
|---|---|---|---|---|
| 1 | 0.0-7.2 | opener | 7200 | 6.35 s |
| 2 | 7.2-21.0 | about | 13800 | 12.85 s |
| 3 | 21.0-31.0 | overview | 10000 | 9.22 s |
| 4 | 31.0-38.6 | schedule | 7600 | 6.53 s |
| 5 | 38.6-50.6 | extract | 12000 | 11.28 s |
| 6 | 50.6-57.8 | cv | 7200 | 6.35 s |
| 7 | 57.8-65.4 | applications | 7600 | 6.64 s |
| 8 | 65.4-71.6 | celebrate | 6200 | 5.33 s |
| 9 | 71.6-76.2 | outro | 4600 | 2.82 s |
Every line (0.3 s lead + length) ends at least 0.47 s before its scene cut, so no narration is clipped.

## Shots (times relative to scene start)
**1 Opener.** Beats ×1.35: 0.61/1.28/1.96/2.63 s words "Every application. / Every interview. / Every CV. / Every small win." with pastel corner blocks snapping in; 3.58 s nextstep wordmark + "YOUR JOB SEARCH, IN MOTION"; 4.59 s "A walkthrough of the prototype."; 6.08 s push-through handoff.
VO: «أهلا! هاد نِكست ستيب، المكان اللي بيجمعلي كل طلبات الشغل تبعتي. تعالوا فرجيكم كيف بشتغل.»

**1b About the project (revision 3: user asked for a simple explanation of the project at the start).** Asymmetric: statement column left, feature stack right. 0.2 eyebrow tile + "WHAT IS NEXTSTEP?"; 0.6 "One calm place / for your whole / job search." unmasks line by line; 3.6 tag "A design prototype · sample data · simulated AI"; feature tiles slide in on the narrated phrases (measured with silencedetect): 5.3 "Every job you applied to", 7.4 "The exact CV you sent", 9.2 "Assessments & interviews", 11.1 "Where each one stands (Applied → Assessment → Interview → Offer)"; 12.9 tiles scale/fade out as handoff into the Overview camera settle.
VO: «ببساطة، نِكست ستيب هو نموذج تصميم لتطبيق بيرتبلي رحلة البحث عن شغل. بسجل فيه كل وظيفة قدمت عليها، والسيرة الذاتية اللي بعتتها، ومواعيد التقييمات والمقابلات، وبتابع كل طلب لوين وصل.»

**2 Overview.** Camera settles from 1.5x blur; counters 00 -> 12/09/03/01 (0.6-1.3 s). 1.5 push on stats; 4.8 pan to "Coming up next", pointer appears; 6.4 click **Interviews** tab (label "Interviews") — list switches; 7.6 pull back; 8.5 pointer to sidebar **Schedule** (label); 9.4 click. Caption "01 · Overview".
VO: «أول ما أفتح، بشوف لوحة الملخص: كم طلب قدمت، وكم واحد لسا شغال، وكم مقابلة عندي. هلأ بكبس على المقابلات، وبشوف مواعيدي الجاية.»

**3 Schedule & reminders (new).** Schedule page at 1.18x. 0.4 pointer to **Interviews** tab, 1.1 click; 3.3 pull back, pointer to the **bell** (label "Reminders"); 4.0 click -> bell highlights, "Your reminders" modal (4 upcoming events, 2 applications need a nudge); 6.3 modal closes, pointer to **Add application**; 7.0 press. Caption "02 · Schedule & reminders".
VO: «بكبس على الجدول، وبشوف كل التقييمات والمقابلات الجاية بمكان واحد. ومن الجرس، بتطلعلي التذكيرات.»

**4 Add from a job link.** Editor modal over the Schedule page. Pointer on URL field (label "Paste job link"); URL types 0.9-3.1 s; 3.75 click **Demo AI extraction** (label) -> "Preparing sample preview…" skeleton; 5.7-6.6 fields fill (title, company, location, salary, description); 6.6 yellow "Sample content — not extracted from your URL"; 7.2 push into fields; 10.35 body scrolls toward the CV block. Caption "03 · Add from a job link — Demo only, extraction simulated."
VO: «هلأ بكبس على إضافة طلب. بحط رابط الوظيفة، وبكبس على الاستخراج التجريبي، فبتنعبى التفاصيل لحالها. بس انتبهوا، هاي بيانات تجريبية، والذكاء الاصطناعي هون محاكاة بس.»

**5 CV per application.** Camera 1.38x on the CV block; pointer on **Choose file** (label "Attach CV"); 1.49 click -> file card "Jamie_Lee_Northstar_CV.pdf" drops in; 2.7-3.7 version types "v3 · portfolio-focused"; 4.05 pull back, pointer to **Add application**; 5.0 click; 5.5 toast "Application saved in this prototype session." Caption "04".
VO: «بنزل لتحت، وبرفق السيرة الذاتية اللي بعتتها لهاي الوظيفة بالذات، بكتب رقم النسخة، وبكبس إضافة.»

**6 Applications.** 0.43 camera scrolls down; clicks **Linear** (0.43), **Notion** (2.15), **Stripe** (3.58) — side panel re-renders each time; 4.58 push 1.5x on the panel, pointer to the stage select (label "Stage → Offer"); 6.15 select becomes Offer, journey updates; 7.0 butter wash handoff. Caption "05".
VO: «بروح على صفحة الطلبات. كل ما أكبس على بطاقة، بتطلعلي تفاصيلها عالجنب. وهون بغير المرحلة لعرض عمل.»

**7 Celebrations.** Butter field, halos, confetti; "YOU GOT AN OFFER!" / "Stripe sees what you bring. This moment is yours."; 3.71 lavender circle wipe to serif "Not this time." / "Keep going…" / "EVERY STAGE GETS ITS OWN MOMENT".
VO: «ولما يجيني عرض، التطبيق بيحتفل معي! وحتى لو انرفضت، بيذكرني إنو أكمل.»

**8 Outro.** Tile + "nextstep"; 0.6 "Your next chapter, in motion."; 1.3 stage chips; 2.2 "DESIGN PROTOTYPE · SAMPLE DATA · SIMULATED AI EXTRACTION"; 3.7 collapses to the tile (= opener frame 1).
VO: «نِكست ستيب. خطوة خطوة، لشغلك الجاي.»

## Audio spec
- Music: lo-fi hip hop 90 BPM, 76.2 s (regenerated), no vocals — public/audio/bg_music.mp3.
- Voiceover (requested): public/audio/vo_<scene>.mp3, one per scene, delay = scene start + 300 ms.
- Playback file: public/audio/composite_audio.mp3 (music ×0.22 + VO ×1.0, amix normalize=0, -t 76.2). Seeks to the scene's canonical start on scene change; pauses/resumes with the scene clock.
- Cuts are set by narration length, not music onsets (beat alignment not claimed).
