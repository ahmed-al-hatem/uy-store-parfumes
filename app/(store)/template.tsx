import { PageFade } from "@/components/motion/PageFade";

/** Templates remount on every navigation, which is what drives the page fade. */
export default function StoreTemplate({ children }: { children: React.ReactNode }) {
  return <PageFade>{children}</PageFade>;
}
