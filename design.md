````md
# villagecircle-web — Full Folder Structure

## app/

```text
app/
├── layout.tsx
│   └── Root layout — AppLayout wrapper
│
├── page.tsx
│   └── VillageCircle landing page
│
├── villagecircleLayout.tsx
│   └── Product-scoped shell (exists)
│
├── (vibe-coders)/
│   ├── layout.tsx
│   ├── vibe-coders/page.tsx
│   ├── vibe-coders/apply/page.tsx
│   ├── portal/layout.tsx
│   │   └── guards SSO
│   └── portal/[...all pages]
│
└── api/
    ├── auth/
    │   ├── sso/
    │   │   └── relay/route.ts
    │   └── logout/route.ts
    │
    ├── waitlist/
    │   └── [slug]/route.ts
    │
    └── health/route.ts
```

---

## lib/

```text
lib/
├── api.ts
│   └── createClient wrapper
│
└── vibe-coders/
    ├── curriculum-data.ts
    ├── cohort-config.ts
    └── pricing-config.ts
```

---

## config/

```text
config/
├── site.ts
│   └── metadata, OG, socials
│
├── products.ts
│   └── re-export subset
│
├── concepts.ts
│   └── waitlist slugs
│
├── navigation.ts
│   └── nav links
│
└── fonts.ts
    └── VillageCircle fonts
```

---

## components/

```text
components/
├── concepts/
│   └── concept pages
│
├── daily-drops/
│   └── drop cards
│
├── waitlist/
│   └── waitlist forms
│
└── shared/
    ├── nav
    ├── footer
    └── hero
```

---

## types/

```text
types/
├── concept.ts
│   └── ConceptConfig
│
├── drop.ts
│   └── DailyDrop
│
└── waitlist.ts
    └── WaitlistEntry
```

---

## hooks/

```text
hooks/
├── useWaitlist.ts
└── useVibeCoders.ts
```

---

## Root Config Files

```text
proxy.ts
└── NOT middleware.ts

next.config.ts
└── upgrade from .mjs

tailwind.config.ts
└── exists

instrumentation.ts
└── new

app/manifest.ts
└── new

app/sitemap.ts
└── new

app/robots.ts
└── new
```

---

## Implementation Waves

### Wave 0
- proxy.ts
- next.config.ts

### Wave 1
- layout
- VillageCircle home

### Wave 2
- concept pages
- waitlists

### Wave 3
- Vibe Coders portal

### Wave 4
- concept sub-pages
````

