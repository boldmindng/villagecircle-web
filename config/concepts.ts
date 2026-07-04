/**
 * config/concepts.ts
 *
 * Derives all VillageCircle concept pages from the canonical BOLDMIND_PRODUCTS constant.
 * NEVER hardcode product names, slugs, or descriptions here — pull from @boldmindng/utils.
 *
 * A "concept" in VillageCircle NG is any product with:
 *   pillar === 'conviction' && slug !== 'villagecircle' && slug !== 'vibe-coders'
 */

import {
  BOLDMIND_PRODUCTS,
  getColorScheme,
  type Product,
} from '@boldmindng/utils'

export interface ConceptConfig {
  product:      Product
  routePath:    string          // e.g. /kolo
  waitlistSlug: string          // slug sent to /api/v1/villagecircle/waitlist/:slug
  colorScheme:  ReturnType<typeof getColorScheme>
  narrativeTag: string          // short one-line framing for the story page hero
}

// Products that live in VillageCircle but have their own dedicated portal (not a "concept story page")
const EXCLUDED_SLUGS = new Set(['villagecircle', 'vibe-coders'])

export const CONCEPTS: ConceptConfig[] = BOLDMIND_PRODUCTS
  .filter((p) => p.pillar === 'conviction' && !EXCLUDED_SLUGS.has(p.slug))
  .sort((a, b) => a.priority - b.priority)
  .map((product) => ({
    product,
    routePath:    product.routePath ?? `/${product.slug}`,
    waitlistSlug: product.slug,
    colorScheme:  getColorScheme(product.slug),
    narrativeTag: deriveNarrativeTag(product.slug),
  }))

/** Map of slug → ConceptConfig for O(1) lookup in route handlers */
export const CONCEPTS_BY_SLUG = new Map<string, ConceptConfig>(
  CONCEPTS.map((c) => [c.product.slug, c])
)

/** Ordered list of all concept slugs — used for static params generation */
export const CONCEPT_SLUGS = CONCEPTS.map((c) => c.product.slug)

// ─── Narrative tags ────────────────────────────────────────────────────────────
// These are short philosophical framings displayed on each concept's story page.
// They should never be the same as the product description — they are the "why now"
// editorial voice of VillageCircle NG.

function deriveNarrativeTag(slug: string): string {
  const tags: Record<string, string> = {
    'kolo-ai':               'Because Ajo deserves an AI shepherd',
    'safe-ai':               'Every community deserves a memory for safety',
    'borderless-remit':      'The diaspora should not pay ignorance tax',
    'receipt-genius':        'A receipt is proof of dignity, not just commerce',
    'power-alert':           'Light is not a luxury — it is a right worth tracking',
    'farmgate-direct':       'The farmer should eat first, not last',
    'afrocopy-ai':           'Africa speaks. Now her tools do too',
    'anontruth-mic':         'Truth finds a way. We are building the corridor',
    'safe-ai-native':        'The officer on the street deserves better tools',
    'naija-rent':            'Finding shelter should not be a hustle',
    'naija-health':          'Your health is not a privilege waiting in a queue',
    'trustscore-ng':         'Trust is a currency Nigeria is ready to trade in',
    'naija-legal-ai':        'The law was written in English. We will translate it',
    'naija-skills-passport':  'A diploma does not define your skill. Your work does',
    'naija-price-watch':     'The market speaks. We built the microphone',
    'naija-logistics':       'Your package deserves a single dashboard, not twelve calls',
    'naija-water':           'Water access is a civic right, not a tanker lottery',
    'naija-job-board':       'No more ghost jobs. No more unexplained silence',
    'pillar-chat':           'Community conversations belong to the community',
    'naija-ev':              'The road to clean transport starts with honest data',
    'sound-naija':           'Afrobeats is global. The platform should be Nigerian',
    'scholarship-finder':    'Every scholarship missed is a life redirected',
    'naija-green-credits':   'Nigeria plants trees. The world should pay for it',
    'civic-naija':           'Your vote is the beginning, not the end, of governance',
    'naija-mortgage':        'Homeownership is not a dream — it is a documented path',
    'naija-insurance':       'Insurance in Nigeria should work for Nigerians',
    'naija-agency':          'Running an agency is not the same as running a hustle',
    'naija-cred':            'Credit is not just for those the bank already knows',
    'naija-estate':          'The estate chairman should have better tools than a notebook',
    'naija-vendor-pay':      'The market woman should settle accounts in seconds',
  }
  return tags[slug] ?? 'A seed planted in the VillageCircle'
}