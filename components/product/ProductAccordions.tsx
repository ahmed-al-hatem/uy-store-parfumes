"use client";

import { Accordion } from "radix-ui";
import type { ReactNode } from "react";

export type AccordionSection = { id: string; title: string; content: ReactNode };

/** Description, notes, shipping and returns. Description starts open. */
export function ProductAccordions({ sections }: { sections: AccordionSection[] }) {
  return (
    <Accordion.Root type="multiple" defaultValue={[sections[0]?.id]} className="border-t border-soot">
      {sections.map((s) => (
        <Accordion.Item key={s.id} value={s.id} className="border-b border-soot">
          <Accordion.Header>
            <Accordion.Trigger className="group flex min-h-[52px] w-full items-center justify-between text-caption uppercase">
              <span className="decoration-1 underline-offset-4 group-hover:underline">{s.title}</span>
              <span aria-hidden="true" className="text-body-sm transition-transform duration-[var(--duration-fast)] group-data-[state=open]:rotate-45">
                +
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="pb-17 text-body-sm">{s.content}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
