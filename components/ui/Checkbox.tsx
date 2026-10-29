import type { InputHTMLAttributes, ReactNode } from "react";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: ReactNode;
  meta?: ReactNode;
  type?: "checkbox" | "radio";
};

/** Square, hairline checkbox or radio with a 44px row; fills Soot when checked. */
export function Checkbox({ label, meta, type = "checkbox", className = "", ...props }: CheckboxProps) {
  return (
    <label
      className={`flex min-h-touch cursor-pointer items-center gap-12 text-body-sm has-disabled:cursor-default has-disabled:opacity-40 ${className}`}
    >
      <input
        type={type}
        className="peer size-[13px] shrink-0 cursor-pointer appearance-none border border-soot bg-transparent checked:bg-soot disabled:cursor-default"
        {...props}
      />
      <span className="flex-1 decoration-1 underline-offset-4 peer-hover:underline">{label}</span>
      {meta != null && <span className="text-caption tabular-nums">{meta}</span>}
    </label>
  );
}
