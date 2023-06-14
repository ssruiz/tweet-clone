import * as React from 'react';

import { cn } from '@/app/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  floatingLabel?: boolean;
  showHr?: boolean;
  label?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, floatingLabel, id, label, showHr, ...props }, ref) => {
    return (
      <div className="relative z-0 w-full group">
        <textarea
          className={cn(
            'flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 peer',
            className
          )}
          ref={ref}
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            'absolute left-4 text-lg text-gray-500 duration-300 transform scale-75 top-1 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-0 peer-focus:font-medium peer-focus:text-brand '
          )}
        >
          {label}
        </label>
        {showHr && (
          <hr className="opacity-0 peer-focus:opacity-100 border border-gray-600 h-0 w-full transition-opacity" />
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
