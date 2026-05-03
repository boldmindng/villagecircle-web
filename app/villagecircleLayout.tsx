'use client';
import { ReactNode } from 'react';
import { ThemeProvider, FontProvider } from '@boldmind-tech/ui';
import type { ProductThemeType } from '@boldmind-tech/ui';

const VILLAGECIRCLE_THEME: ProductThemeType = {
  slug: 'villagecircle',
  name: 'VillageCircle',
  description: 'A venture studio and publishing imprint rooted in African sovereignty',
  icon: '🌍',
  status: 'LIVE',
  colors: {
    primary:    '#3B1F0A',   
    secondary:  '#CA8A04',
     accent:     '#166534',
    background: '#FAFAFA',
  },
};

export function VillageCircleLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      defaultTheme="light"
      forceProductSlug="villagecircle"
      defaultProduct={VILLAGECIRCLE_THEME}
    >
      <FontProvider defaultMode="standard">
        {children}
      </FontProvider>
    </ThemeProvider>
  );
}
