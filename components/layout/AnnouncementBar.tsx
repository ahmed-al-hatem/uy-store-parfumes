import { formatPrice, storeConfig } from "@/lib/config";

export function AnnouncementBar() {
  return (
    <p className="border-b border-soot px-16 py-7 text-center text-caption">
      Complimentary delivery over {formatPrice(storeConfig.freeShippingThreshold)}. Two samples with every order.
    </p>
  );
}
