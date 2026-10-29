import type { ReactNode } from "react";

/** Text page: title and intro in the start column, the body beside it on desktop. */
export function ContentPage({ title, intro, children, aside }: { title: string; intro: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <article className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <header className="px-16 pb-30 pt-30 lg:border-e lg:border-line lg:px-32 lg:pt-32">
        <h1 className="text-subheading tracking-display lg:text-heading">{title}</h1>
        <p className="max-w-[44ch] pt-13 text-body">{intro}</p>
        {aside && <div className="pt-30">{aside}</div>}
      </header>
      <div className="border-t border-line px-16 pb-section pt-30 lg:border-t-0 lg:px-32 lg:pt-32">{children}</div>
    </article>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="max-w-[64ch] text-body [&_h2]:pb-10 [&_h2]:pt-30 [&_h2]:text-caption [&_h2]:uppercase first:[&_h2]:pt-0 [&_p+p]:pt-13 [&_ul]:list-none [&_li]:py-4">{children}</div>;
}
