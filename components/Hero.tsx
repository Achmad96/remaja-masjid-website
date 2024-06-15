import { PhotoComponent, PhotoSkeleton } from '@/components/PhotoComponent';

import HeroContent from '@/components/HeroContent';

export default async function Hero() {
  return (
    <section>
      <div className="min-h-[88dvh] w-full relative flex justify-center items-center">
        <PhotoComponent />
        <HeroContent />
      </div>
    </section>
  );
}
