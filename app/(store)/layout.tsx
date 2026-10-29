import { NuqsAdapter } from "nuqs/adapters/next/app";
import { StoreChrome } from "@/components/layout/StoreChrome";

export default function StoreLayout({ children }: LayoutProps<"/">) {
  return (
    <NuqsAdapter>
      <StoreChrome>{children}</StoreChrome>
    </NuqsAdapter>
  );
}
