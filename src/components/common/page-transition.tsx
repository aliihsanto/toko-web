'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  locale: string;
}

export function PageTransition({ children, locale }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={locale}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
