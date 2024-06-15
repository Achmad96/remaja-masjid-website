'use client';
import { Variants, motion } from 'framer-motion';

const itemVariant: Variants = {
  open: {
    opacity: 1,
    y: '0%',
    transition: { type: 'spring', stiffness: 300, damping: 50 }
  },
  closed: { opacity: 0, y: '100%' }
};

export default function HeroContent() {
  return (
    <motion.div
      initial={'closed'}
      animate={'open'}
      variants={{
        open: {
          opacity: 1,
          y: '0%',
          transition: {
            type: 'spring',
            bounce: 0,
            duration: 0.3,
            delayChildren: 0.2,
            staggerChildren: 0.3
          }
        },

        closed: {
          opacity: 0,
          y: '100%',
          transition: {
            type: 'spring',
            bounce: 0,
            duration: 0.3
          }
        }
      }}
      className="absolute z-40 text-white text-center flex flex-col gap-5 overflow-hidden"
    >
      <motion.h1
        variants={itemVariant}
        className="text-5xl max-sm:text-2xl font-bold text-white"
      >
        Remaja Masjid Nurul HAQQ
      </motion.h1>
      <motion.p variants={itemVariant} className="max-sm:text-sm">
        Bertumbuh dalam Iman, Berkontribusi untuk Umat
      </motion.p>
    </motion.div>
  );
}
