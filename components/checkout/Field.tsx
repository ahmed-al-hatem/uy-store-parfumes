import { forwardRef, useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from "react";

const control =
  "block min-h-[48px] w-full rounded-input border border-ink/40 bg-transparent px-12 text-body-sm placeholder:text-muted focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 aria-[invalid=true]:border-2";

type FieldShellProps = { label: string; error?: string; hint?: string; id: string; children: ReactNode; className?: string };

function FieldShell({ label, error, hint, id, children, className = "" }: FieldShellProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block pb-6 text-caption uppercase">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="pt-4 text-caption">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="pt-4 text-caption" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; hint?: string; adornment?: ReactNode; wrapperClassName?: string };

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(function InputField(
  { label, error, hint, adornment, wrapperClassName, ...props },
  ref,
) {
  const id = useId();
  const describedBy = [error && `${id}-error`, hint && !error && `${id}-hint`].filter(Boolean).join(" ") || undefined;
  return (
    <FieldShell label={label} error={error} hint={hint} id={id} className={wrapperClassName}>
      <div className="relative">
        <input ref={ref} id={id} aria-invalid={!!error} aria-describedby={describedBy} className={`${control} ${adornment ? "pe-[110px]" : ""}`} {...props} />
        {adornment && <span className="pointer-events-none absolute inset-y-0 end-12 flex items-center text-caption">{adornment}</span>}
      </div>
    </FieldShell>
  );
});

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string; wrapperClassName?: string };

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(function SelectField(
  { label, error, wrapperClassName, children, ...props },
  ref,
) {
  const id = useId();
  return (
    <FieldShell label={label} error={error} id={id} className={wrapperClassName}>
      <div className="relative">
        <select ref={ref} id={id} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} className={`${control} appearance-none pe-30`} {...props}>
          {children}
        </select>
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 end-12 flex items-center text-caption">
          ▾
        </span>
      </div>
    </FieldShell>
  );
});
