/**
 * config/fonts.ts
 *
 * VillageCircle NG uses Playfair Display + Lora — defined in
 * BOLDMIND_FONT_CONFIG.overrides.villagecircle from @boldmindng/utils.
 * We source the Google Font objects here and export them for use in
 * app/layout.tsx. No font string is hardcoded below.
 */

import { Playfair_Display, Lora } from 'next/font/google'
import { BOLDMIND_FONT_CONFIG }   from '@boldmindng/utils'

// Derive the font stack string from the canonical config
// e.g. '"Playfair Display", "Lora", Georgia, serif'
export const VILLAGECIRCLE_FONT_STACK =
  BOLDMIND_FONT_CONFIG.overrides['villagecircle'] ??
  '"Playfair Display", "Lora", Georgia, serif'

// ─── Google Font instances ─────────────────────────────────────────────────

export const playfair = Playfair_Display({
  subsets:  ['latin'],
  display:  'swap',
  variable: '--font-heading',
  weight:   ['400', '500', '600', '700', '800'],
})

export const lora = Lora({
  subsets:  ['latin'],
  display:  'swap',
  variable: '--font-body',
  weight:   ['400', '500', '600', '700'],
  style:    ['normal', 'italic'],
})