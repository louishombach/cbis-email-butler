import * as React from 'react';

import ArrowLink from '@/components/links/ArrowLink';

import Logo from '~/svg/Logo.svg';

export default function HeroSection() {
  return (
    <section className='bg-white pt-12'>
      <div className=' flex  flex-col items-center justify-start  text-center'>
        <Logo className='w-16' />
        <h1 className='mt-4'>
          James der Email Butler <sup>v0.1</sup>
        </h1>
        <p className='mt-2 text-sm text-gray-800'>
          Ein nützlicher Helfer um deine Emailpostfächer zu verwalten.
        </p>
        <p className='mt-2 text-sm text-gray-700'>
          <ArrowLink href='https://github.com/Shaco74/cbis-email-butler'>
            See the repository
          </ArrowLink>
        </p>
      </div>
    </section>
  );
}
