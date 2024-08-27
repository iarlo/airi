import { cn } from '@utils/cn';
import { forwardRef, InputHTMLAttributes, LegacyRef } from 'react';
import { IMaskInputProps, IMaskMixin } from 'react-imask';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

const MaskedInput = IMaskMixin<HTMLInputElement, IMaskInputProps<HTMLInputElement>>(({ inputRef, ...props }) => (
  <Input {...props} ref={inputRef as LegacyRef<HTMLInputElement>} />
));

export { Input, MaskedInput };
