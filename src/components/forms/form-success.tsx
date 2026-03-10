'use client';

import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface FormSuccessProps {
  message: string;
}

export function FormSuccess({ message }: FormSuccessProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', duration: 0.5 }}
      className="rich-card border-t-4 border-t-emerald-500 p-8 text-center"
    >
      <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-emerald-600" />
      <p className="text-lg font-medium text-foreground">{message}</p>
    </motion.div>
  );
}
