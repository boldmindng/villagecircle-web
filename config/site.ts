/**
 * config/site.ts
 *
 * Single source of truth for all VillageCircle NG site metadata.
 * Products, pricing, and colors ALWAYS come from @boldmindng/utils — never hardcoded here.
 */

import { getProductBySlug, getProductSocialLinks } from '@boldmindng/utils'

const product = getProductBySlug('villagecircle')!

export const SITE = {
  name:        product.name,
  shortName:   product.shortName ?? 'VillageCircle',
  description: product.description,
  url:         'https://villagecircle.ng',
  domain:      'villagecircle.ng',
  locale:      'en_NG',
  timezone:    'Africa/Lagos',

  // Social handles — sourced from products.ts
  social: getProductSocialLinks('villagecircle') ?? {},

  // OG image
  ogImage: '/social/og-image.jpg',

  // Brand copy
  tagline: 'Where stories become products',
  philosophy: 'Story-driven philosophy hub of the BoldmindNG ecosystem',
} as const

export type Site = typeof SITE