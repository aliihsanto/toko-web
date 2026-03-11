'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '902124506020';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className}>
      <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.129 6.742 3.047 9.379L1.054 31.35l6.16-1.965A15.907 15.907 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0Zm9.302 22.602c-.387 1.092-1.926 1.998-3.156 2.264-.84.178-1.937.32-5.632-1.21-4.725-1.956-7.766-6.742-8-7.054-.226-.312-1.89-2.52-1.89-4.808 0-2.288 1.196-3.414 1.62-3.879.387-.426 1.022-.614 1.63-.614.195 0 .37.01.528.018.465.02.698.048.006 1.168-.387.95-1.332 3.266-1.45 3.504-.117.238-.234.516-.094.828.148.312.222.504.45.778.226.274 1.508 1.865.496 2.291.938 2.291 1.39 1.462 2.66-.075 1.312-.84 1.766-.746 1.766-.746s.312.45.816.175c.504-.274 2.158-1.258 2.456-1.7.465-.55.465-1.016.324-1.168-.387-.422-1 .078-1-.094-.234-.234-3.79-1.38-4.308-1.55-.39-.128-.67-.188-.952.2-.274.387-1.07 1.344-1.312 1.618-.242.274-.484.312-.898.117-.414-.195-1.746-.643-3.328-2.05-1.23-1.094-2.06-2.445-2.302-2.859-.242-.414-.026-.637.182-.844.188-.188.414-.488.622-.733.207-.246.274-.422.414-.703.14-.28.07-.527-.035-.738-.105-.21-.952-2.294-1.305-3.14-.344-.823-.692-.712-.952-.726-.246-.012-.527-.015-.809-.015Z" />
    </svg>
  );
}

export function WhatsAppButton() {
  const t = useTranslations('Common');

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsappChat')}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-shadow hover:shadow-xl hover:shadow-[#25D366]/40"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </motion.a>
  );
}
