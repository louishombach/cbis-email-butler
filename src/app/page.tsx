import * as React from 'react';

import Navigator from '@/components/email/Navigator';

import HeroSection from './HeroSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <Navigator key='navigator' />
    </main>
  );
}
