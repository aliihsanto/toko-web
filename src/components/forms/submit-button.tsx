'use client';

import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SubmitButtonProps {
  pending: boolean;
  children: React.ReactNode;
}

export function SubmitButton({ pending, children }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-primary text-white shadow-md shadow-primary/20"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {children}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
