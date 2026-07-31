# villagecircle-web — Design Document + UX Upgrade Plan

Pillar: **Conviction** · Domain: `villagecircle.ng` · Colors: primary `#3B1F0A`, secondary `#E9A825`, accent `#166534` · Typography: Playfair Display / Lora (serif), not the sans-serif used elsewhere in the ecosystem.
Source: `villagecircle-project-tree.md`, canonical §4.15, `products.ts` `villagecircle` + the 29 conviction-pillar concept products.

**Important scope note (see inconsistency #1 above):** the actual repo currently contains **only** the Vibe Coders program (`app/(vibe-coders)/*`). None of the ~29 concept products' `routePath`s (`/kolo`, `/remit`, `/receipt`, `/power`, `/farmgate`, `/safe`, `/anon`, `/rent`, `/health`, `/trust`, `/legal`, `/passport`, `/prices`, `/logistics`, `/water`, `/jobs`, `/chat`, `/ev`, `/sound`, `/scholarships`, `/green`, `/civic`, `/mortgage`, `/insurance`, `/agency`, `/cred`, `/estate`, `/vendorpay`, `/afrocopy`) have a corresponding folder in the tree. This design doc covers what exists (Vibe Coders + the VillageCircle daily-drops shell implied by `config/concepts.ts`) and flags the concept pages as **not yet built** rather than documenting routes that don't exist.

---

## Part 1 — Design Document

## 1. Overview

- **Purpose:** the philosophy/conviction hub — daily drops, the 5 Rivers doctrine, and (per `products.ts`) a concept incubator for 29 products still in CONCEPT/BUILDING/PLANNED status. The one confirmed, fully-built feature is **Vibe Coders**, a 6-month AI-assisted coding mentorship program.
- **Personas:** readers converting from AmeboGist (reader→believer stage), Vibe Coders applicants/enrolled students, concept-waitlist joiners.
- **Primary goals today:** apply to Vibe Coders, progress through the cohort portal, (once built) read daily drops and join concept waitlists.

## 2. Page/Routing Map

**Confirmed in tree** (`app/(vibe-coders)/vibe-coders/`): `/about`, `/apply`, `/apply/assessment`, `/apply/confirmation`, `/curriculum`, `/` (vibe-coders landing), `/pricing`, `/showcase`, and the protected portal at `/portal/*`: `/portal/cohort`, `/portal/curriculum`, `/portal/curriculum/[moduleId]`, `/portal/login`, `/portal/mentors`, `/portal/profile`, `/portal/projects`, `/portal/projects/[projectId]`, `/portal/settings`.
Root app: `/`, `villagecircleLayout.tsx`.
**Config present but no route folder yet:** `config/concepts.ts` — this almost certainly drives a future `/concepts` or per-slug concept page; until a route exists, treat it as data-layer-only.
**Declared in `products.ts` but not built:** every concept's `routePath` (see scope note above).

## 3. Layout Architecture

```text
app/layout.tsx                → root providers
app/villagecircleLayout.tsx   → SuperNavbar + SuperFooter, conviction tokens + serif FontProvider
app/(vibe-coders)/layout.tsx  → Vibe Coders section shell (public marketing pages)
app/(vibe-coders)/vibe-coders/portal/layout.tsx → authenticated portal shell, separate
                                 /portal/login (own login, not the ecosystem-wide /login —
                                 confirm whether this should route through SSO relay instead
                                 of a standalone form; currently reads as a parallel auth path)
SSO: no app/sso/route.ts or app/api/auth/* confirmed in tree — villagecircle-web appears
     to rely on middleware + the shared @boldmindng/auth relay flow, but portal/login's
     existence suggests a second, undocumented auth entry point worth reconciling
```

**Flag:** `portal/login/page.tsx` existing alongside ecosystem-wide SSO is worth resolving explicitly — either it's a Vibe-Coders-specific login (different credential set for enrolled students vs ecosystem accounts) or it should be replaced by the standard relay flow. Don't build further portal UI assuming one or the other without confirming with the founder.

## 4. State Management

- `useUser`, `usePermissions('vibecoders:enrolled')` gates `/portal/*`.
- Server state via `villagecircleApi.vibecoders.{apply, getAssessment, submitAssessment, getCohorts, portal: {getCurriculum, getModule, submitProject, getMyProjects, logAttendance, getMentors}}`.
- `lib/vibe-coders/{cohort-config, curriculum-data, pricing-config, psychology-questions}.ts` are **static data files by design** (per system-design §7.5) — curriculum is curated, not CMS-driven. Don't refactor these into an API call without a deliberate decision to do so.
- Application flow (`/apply` → `/apply/assessment` → `/apply/confirmation`) holds multi-step form state — likely `useLocalStorage` or query-param-driven, matching the two-step "psychology-informed application" described in `products.ts`.

## 5. Data Flow (representative)

```text
Apply → POST /villagecircle/vibecoders/apply { name, email, whatsapp, archetype, idea,
        obstacle, commitment } → VibeCoderApplicant (status=APPLIED)
Admin shortlists → applicant emailed a token → GET /villagecircle/vibecoders/assessment?token=
                  → psychology-questions.ts renders the form
Submit assessment → POST .../assessment { token, answers }
Admin accepts → payment link sent → applicant pays → status=ENROLLED
Enrolled → /portal/curriculum → GET .../portal/curriculum (progress overlay on
           static curriculum-data.ts) → module detail → submit project
           → POST .../portal/projects { moduleId, githubUrl?, loomUrl?, brief }
```

## 6. Key Components

Confirmed structurally (no `components/` folder in the tree — likely colocated per-route or under `app/(vibe-coders)/`):

- Application wizard steps (`/apply`, `/apply/assessment`, `/apply/confirmation`)
- Portal shell (cohort/curriculum/mentors/projects/profile/settings)
- Curriculum module viewer (`/portal/curriculum/[moduleId]`)
- Project submission form + list (`/portal/projects`, `/portal/projects/[projectId]`)

Like educenter-web, this app's component layer is thin in the tree relative to its feature surface — building named, reusable pieces (`ArchetypeSelector`, `AssessmentQuestion`, `ModuleProgressCard`, `ProjectSubmissionForm`) would reduce duplication across the apply flow and the portal.

## 7. Dependencies

`@boldmindng/{ui, auth, api-client, utils, analytics, deploy-config}`. No `wallet`/`pwa`/`api-docs`. `FontProvider` here is doing more work than in any other app — it's the only place the serif (Playfair/Lora) pairing applies.

## 8. Environment Variables

Common set + `NEXT_PUBLIC_APP_URL=https://villagecircle.ng`, `NEXT_PUBLIC_PRODUCT_SLUG=villagecircle`.

## 9. Testing Strategy

E2E: full apply → assessment → confirmation flow; portal login/access gate (only `ENROLLED` applicants reach `/portal/*`); module progress persists across sessions; project submission with GitHub/Loom links validates URL format before submit.

## 10. Performance

Marketing pages (`/about`, `/`, `/showcase`, `/pricing`) can be static/ISR — low write frequency. Portal pages need fresh data (progress, cohort status) — no aggressive caching there.

## 11. Deployment

Vercel project `villagecircle-web`. Build: `pnpm turbo build --filter=villagecircle-web`. Own TLD — relay-token SSO only, same as amebogist/educenter.

---

## Part 2 — UX Upgrade Plan

## 1. UX Audit

| Issue                                                                                                                                   | Page                            | Impact                                                                                                                                      |
| --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `/portal/login` existing as a possibly-separate auth path from ecosystem SSO                                                            | `/portal/login`                 | Confusing dual-identity risk; needs reconciliation before further UX work                                                                   |
| No concept/daily-drops pages exist despite being the pillar's core stated feature                                                       | site-wide                       | The actual philosophical-hub experience described in every other doc doesn't exist in the repo yet — Vibe Coders is currently the whole app |
| Application flow is the highest-conversion moment in the whole ecosystem's conviction pillar and has thin confirmed component structure | `/apply/*`                      | Risk of an under-designed, generic-feeling multi-step form for a psychology-informed application that's supposed to feel deliberate         |
| Portal curriculum viewer risks feeling like a generic LMS rather than "conviction"                                                      | `/portal/curriculum/[moduleId]` | Wrong pillar personality — this should still read as VillageCircle, not a bolted-on Teachable clone                                         |
| No visible proverb/narrative texture in the confirmed structure                                                                         | marketing pages                 | The Achebe-style narrative voice described in the brand manual needs a visual home, not just copy                                           |

## 2. User Journey Map (Prospective Vibe Coder persona)

Arrives from AmeboGist or VillageCircle daily-drop content (once built) → `/vibe-coders` landing (wants: is this real, is this for me) → `/vibe-coders/apply` → `/apply/assessment` (psychology-informed — wants to feel taken seriously, not just funneled) → `/apply/confirmation` → (accepted) → payment → `/portal/login` → `/portal/cohort` (wants: what happens next, when do we start) → `/portal/curriculum` → builds → `/portal/projects` submits work → `/portal/mentors` for support.

**Friction points:** the apply→assessment transition needs to feel like a real evaluation, not a form; the portal needs its own visual identity distinct from EduCenter's LMS, even though both are "learning."

## 3. Page-by-Page Recommendations

### 3.1 `/vibe-coders` (landing) and `/about`

- **Upgrade:** lead with narrative, not a feature grid — a short story/proverb-style opener (per the brand manual's "Achebe if he launched software companies" voice) before any CTA, serif display type at real size, dark `#3B1F0A` ground with `#E9A825` accent used sparingly (gold as punctuation, not wallpaper).

### 3.2 `/apply` → `/apply/assessment` → `/apply/confirmation`

- **Upgrade:** treat as a single narrative arc, not three disconnected pages — consistent step framing ("Tell us who you are" → "Tell us how you think" → "You're in the queue"), archetype selection (`ArchetypeSelector`) as a considered choice (short descriptions per archetype, not a bare dropdown), assessment questions rendered one at a time with generous whitespace matching the pillar's unhurried pacing — this is explicitly _not_ an enablement-pillar dense form.

### 3.3 `/portal/curriculum` and `/portal/curriculum/[moduleId]`

- **Upgrade:** module cards keep the serif/warm-tone identity (not a swap to sans-serif "app mode") — progress indicator as a quiet fill, not a gamified progress bar with percentage-shouting. `ModuleProgressCard` shows what's next in narrative terms ("Next: Building your first real feature") not just "3/8 complete."

### 3.4 `/portal/projects`

- **Upgrade:** `ProjectSubmissionForm` validates GitHub/Loom URLs client-side before submit; project cards show mentor feedback prominently once reviewed, not buried — feedback loop visibility matters for a 6-month program's retention.

### 3.5 `/portal/login`

- **Upgrade (pending founder decision):** either badge it clearly as "Vibe Coders portal access" if intentionally separate from ecosystem SSO, or replace with the standard relay flow — don't ship ambiguous dual-auth UX.

## 4. Accessibility

Serif body text at smaller sizes can hurt readability — verify Lora/Playfair sizing stays comfortable at the app's actual body-text scale, and that dyslexia-mode correctly overrides to OpenDyslexic here too despite the otherwise-different typography system (per `BOLDMIND_FONT_CONFIG`, villagecircle already has a dedicated serif override — confirm dyslexia-mode still takes precedence over it).

## 5. Performance UX

Skeleton states on `/portal/curriculum` and `/portal/projects` while data loads — avoid a jarring sans-serif-feeling generic spinner breaking the narrative tone; even loading states should feel considered here (a slow fade, not a spinning icon).

## 6. Mobile Experience

Assessment questions (`/apply/assessment`) one-per-screen on mobile already suits small viewports well if built that way. Portal curriculum module list collapses to a single vertical list with clear current/next/locked states. Touch targets ≥44px throughout, consistent with the rest of the ecosystem.

## 7. Implementation Plan

| Priority | Task                                                   | Page(s)                | Effort                     | Owner                       |
| -------- | ------------------------------------------------------ | ---------------------- | -------------------------- | --------------------------- |
| P0       | Reconcile `/portal/login` vs ecosystem SSO             | `/portal/login`        | 1d (decision) + 1d (build) | Founder decision + Frontend |
| P0       | Apply flow narrative-arc redesign                      | `/apply/*`             | 3d                         | Frontend                    |
| P1       | Curriculum module UI — warm/narrative, not generic LMS | `/portal/curriculum/*` | 2d                         | Frontend                    |
| P1       | Project submission + feedback visibility               | `/portal/projects/*`   | 2d                         | Frontend                    |
| P2       | Landing/about narrative-lead redesign                  | `/`, `/about`          | 2d                         | Frontend                    |
| P2       | Accessibility check on serif+dyslexia interplay        | site-wide              | 1d                         | Frontend                    |

**Separate, larger-scope item (not in this sprint plan):** building the actual daily-drops/concept-incubator experience described everywhere except the repo. That's a new-feature project, not a UX upgrade — flag to the founder as its own initiative once Vibe Coders UX work lands.

### Frontend Design Docs — Addendum v1

**Applies to:** `boldmind-web`, `planai-suite`, `amebogist-web`, `villagecircle-web` design docs.
**Not applied here:** `educenter-web` — see the full v2 rewrite (`educenter-web-design-doc-v2.md`), which got the larger LMS/School Portal priority update.

**Purpose of this addendum:** two things came out of reconciling the individual app docs against `boldmind-service-canonical.md` v1.3 and `boldmind-shared-monorepo-v1.1.md`: (1) a couple of route/module references had drifted or were left as open flags, and (2) none of the four docs below had an explicit "room for future pages" convention the way `/study-hub/*` implicitly has one in educenter — this addendum adds that pattern to each app, plus flags anything newly confirmed or newly gapped by the v1.3 service doc.

---

## villagecircle-web

### Reconciliation against `boldmind-service-canonical.md` v1.3

- No change to the VibeCoders-specific routes or the `/portal/login` open question — canonical v1.3 doesn't add new information there.
- **New context relevant to this app's biggest flagged gap** (no daily-drops/concept-incubator pages exist despite being the pillar's core stated feature): canonical v1.3 confirms `WaitlistController` is live at `/villagecircle/{afrocopy-ai,anontruth-mic,power-alert}/*` — three specific concept waitlists are backed by a real endpoint today, out of the ~29 concept products this doc's scope note lists as unbuilt. If the concept-incubator work gets picked up, these three have a live backend to build against immediately, ahead of the other ~26 which don't.

### Extensibility — reserving room for future pages

- This is the app most likely to need genuinely new top-level routes going forward, since ~29 concept products are still unbuilt. Recommended convention once the concept-incubator ships: a single dynamic route `/concepts/[slug]` driven by `config/concepts.ts` (already present as data-layer-only per the original doc) rather than a hand-built folder per concept — this avoids 29 near-identical route folders and keeps new concepts addable by adding a `config/concepts.ts` entry, not a new page. The three `WaitlistController`-backed concepts above (`afrocopy-ai`, `anontruth-mic`, `power-alert`) are the natural first three to route through this pattern.
- `/vibe-coders/*` and `/portal/*` are feature-complete route groups for the current single confirmed feature — no extensibility change needed there beyond what the original doc's component recommendations already cover.

---
