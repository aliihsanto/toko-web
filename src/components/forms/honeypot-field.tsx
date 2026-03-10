'use client';

import type { UseFormRegisterReturn } from 'react-hook-form';

interface HoneypotFieldProps {
  register: UseFormRegisterReturn;
}

export function HoneypotField({ register }: HoneypotFieldProps) {
  return (
    <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
      <label htmlFor="website">Website</label>
      <input
        type="text"
        id="website"
        tabIndex={-1}
        autoComplete="off"
        {...register}
      />
    </div>
  );
}
