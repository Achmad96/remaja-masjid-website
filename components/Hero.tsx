import { Suspense } from 'react';
import { PhotoComponent, PhotoSkeleton } from '@/components/PhotoComponent';

import HeroContent from '@/components/HeroContent';

export default async function Hero() {
  return (
    <section>
      <div className="min-h-dvh relative flex justify-center items-center">
        <PhotoComponent />
        <HeroContent />
      </div>
    </section>
  );
}
