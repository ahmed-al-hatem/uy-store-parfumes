import { formatPrice, storeConfig } from "@/lib/config";

export function AnnouncementBar() {
  return (
    <p className="label bg-ink px-16 py-10 text-center text-canvas">
      Complimentary delivery over {formatPrice(storeConfig.freeShippingThreshold)}. Two samples with every order.
    </p>
  );
}
