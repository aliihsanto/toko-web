'use client';

import * as runtime from 'react/jsx-runtime';
import Image from 'next/image';

function useMDXComponent(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const sharedComponents: Record<string, React.ComponentType<any>> = {
  h2: (props: any) => (
    <h2 className="heading-serif text-2xl mt-10 mb-4" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="heading-serif text-xl mt-8 mb-3" {...props} />
  ),
  h4: (props: any) => (
    <h4 className="heading-serif text-lg mt-6 mb-2" {...props} />
  ),
  p: (props: any) => (
    <p className="leading-relaxed mb-4 text-muted-foreground" {...props} />
  ),
  a: (props: any) => (
    <a
      className="text-primary underline hover:no-underline"
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul className="list-disc pl-6 mb-4 space-y-1" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal pl-6 mb-4 space-y-1" {...props} />
  ),
  li: (props: any) => (
    <li className="text-muted-foreground" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-primary/30 pl-4 italic my-6 text-muted-foreground"
      {...props}
    />
  ),
  table: (props: any) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props: any) => (
    <thead className="bg-muted/50" {...props} />
  ),
  th: (props: any) => (
    <th
      className="border border-border px-3 py-2 text-left font-semibold"
      {...props}
    />
  ),
  td: (props: any) => (
    <td className="border border-border px-3 py-2" {...props} />
  ),
  img: (props: any) => {
    const { src, alt, ...rest } = props;
    if (!src) return null;
    // Use Next.js Image for optimized loading when possible
    if (src.startsWith('/') || src.startsWith('http')) {
      return (
        <Image
          src={src}
          alt={alt || ''}
          width={800}
          height={450}
          className="rounded-lg my-6 w-full h-auto"
          {...rest}
        />
      );
    }
    return (
      <img
        src={src}
        alt={alt || ''}
        className="rounded-lg my-6 w-full h-auto"
        {...rest}
      />
    );
  },
  hr: (props: any) => (
    <hr className="my-8 border-border" {...props} />
  ),
  pre: (props: any) => (
    <pre
      className="overflow-x-auto rounded-lg p-4 my-6 text-sm"
      {...props}
    />
  ),
  code: (props: any) => {
    // Inline code (not inside pre)
    const isInline = typeof props.children === 'string';
    if (isInline) {
      return (
        <code
          className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
          {...props}
        />
      );
    }
    return <code {...props} />;
  },
};
/* eslint-enable @typescript-eslint/no-explicit-any */

interface MDXContentProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

export function MDXContent({ code, components }: MDXContentProps) {
  const Component = useMDXComponent(code);
  return <Component components={{ ...sharedComponents, ...components }} />;
}
