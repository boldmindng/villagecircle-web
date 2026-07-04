/**
 * config/navigation.ts
 *
 * All navigation links for VillageCircle NG.
 * Cross-pillar links use CrossLink from @boldmindng/ui which handles
 * UTM params and SSO relay automatically.
 */

export interface NavLink {
  label:    string
  href:     string
  external: boolean
  badge?:   string
}

export const PRIMARY_NAV: NavLink[] = [
  { label: 'Home',       href: '/',                  external: false },
  { label: 'Philosophy', href: '/philosophy',         external: false },
  { label: 'Concepts',   href: '/concepts',           external: false },
  { label: 'Daily Drop', href: '/drops',              external: false },
  { label: 'Vibe Coders',href: '/vibe-coders',        external: false, badge: 'Cohort Open' },
]

export const FOOTER_ECOSYSTEM: NavLink[] = [
  { label: 'BoldmindNG Hub', href: 'https://boldmind.ng',        external: true },
  { label: 'PlanAI',         href: 'https://planai.boldmind.ng', external: true },
  { label: 'AmeboGist NG',   href: 'https://amebogist.ng',       external: true },
  { label: 'EduCenter',      href: 'https://educenter.com.ng',   external: true },
]

export const FOOTER_LEGAL: NavLink[] = [
  { label: 'Privacy Policy',    href: '/privacy',  external: false },
  { label: 'Terms of Service',  href: '/terms',    external: false },
  { label: 'Cookie Policy',     href: '/cookies',  external: false },
]