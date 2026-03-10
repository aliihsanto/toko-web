'use client';

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '905XXXXXXXXX';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function WhatsAppButton() {
  const t = useTranslations('Common');

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsappChat')}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-shadow hover:shadow-xl"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="h-7 w-7" />
    </motion.a>
  );
}
