// file: src/components/ui/Badge.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'inline-block rounded-full bg-accent px-3 py-1 text-sm font-semibold text-secondary shadow-md',
      className
    )}
    {...props}
  />
));
Badge.displayName = 'Badge';

export { Badge };