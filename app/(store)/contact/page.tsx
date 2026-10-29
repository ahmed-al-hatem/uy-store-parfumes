import type { Metadata } from "next";
import { ContactForm } from "@/components/content/ContactForm";
import { ContentPage } from "@/components/content/ContentPage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Visit the studio on Linienstraße in Berlin, or write to us.",
};

export default function ContactPage() {
  return (
    <ContentPage
      title="Contact"
      intro="Visit the studio, or write to us. A person answers every message within one working day."
      aside={
        <dl className="grid grid-cols-[96px_1fr] gap-x-13 gap-y-10 text-body-sm">
          <dt className="text-caption uppercase">Studio</dt>
          <dd>
            Linienstraße 40
            <br />
            10119 Berlin
          </dd>
          <dt className="text-caption uppercase">Hours</dt>
          <dd>
            Tuesday to Saturday, 11 to 19
            <br />
            Sunday by appointment
          </dd>
          <dt className="text-caption uppercase">E-mail</dt>
          <dd>hello@uy-studio.example</dd>
          <dt className="text-caption uppercase">Phone</dt>
          <dd>+49 30 0000 0000</dd>
        </dl>
      }
    >
      <ContactForm />
    </ContentPage>
  );
}
