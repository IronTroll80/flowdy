'use client';

import { motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
};

export default function PageTransition({ children }: Props) {
  return (
    <motion.div
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -40, opacity: 0 }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}