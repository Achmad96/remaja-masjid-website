"use client";
import { Variants, motion } from "framer-motion";

const parentVariant: Variants = {
  open: {
    opacity: 1,
    y: "0%",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.3,
      delayChildren: 0.2,
      staggerChildren: 0.3,
    },
  },

  closed: {
    opacity: 0,
    y: "100%",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.3,
    },
  },
};
const childVariant: Variants = {
  open: {
    opacity: 1,
    y: "0%",
    transition: { type: "spring", stiffness: 300, damping: 50 },
  },
  closed: { opacity: 0, y: "100%" },
};

export default function ProfileHeroContent() {
  return (
    <motion.article
      initial={"closed"}
      animate={"open"}
      variants={parentVariant}
      className="flex flex-col gap-2"
    >
      <motion.h2 variants={childVariant} className="text-3xl font-bold">
        Remaja Masjid Nurul Haqq
      </motion.h2>
      <motion.p
        variants={childVariant}
        className="w-[30rem] text-justify max-md:w-[95%]"
      >
        Organisasi Remaja Masjid Nurul Haqq adalah organisasi yang terdiri dari
        para remaja yang aktif dalam kegiatan di masjid. Tujuan utama dari
        organisasi ini adalah untuk mengembangkan potensi remaja dalam berbagai
        aspek, seperti keagamaan, sosial, dan kemasyarakatan, serta dapat
        menjadi generasi muda yang berakhlak mulia dan berkontribusi positif
        bagi masyarakat.
      </motion.p>
    </motion.article>
  );
}
