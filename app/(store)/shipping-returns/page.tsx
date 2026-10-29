import type { Metadata } from "next";
import { ContentPage, Prose } from "@/components/content/ContentPage";
import { formatPrice, storeConfig } from "@/lib/config";
import { GIFT_WRAP_PRICE } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Shipping and returns",
  description: "Delivery times and prices, gift wrapping, samples and how to return a bottle.",
};

export default function ShippingReturnsPage() {
  return (
    <ContentPage title="Shipping and returns" intro="Wrapped in the studio, sent from Berlin, and easy to send back if it is not the one.">
      <Prose>
        <h2>Delivery</h2>
        <ul>
          <li>
            Standard, 2 to 3 working days: {formatPrice(storeConfig.standardShipping)}, free on orders over{" "}
            {formatPrice(storeConfig.freeShippingThreshold)}.
          </li>
          <li>Express, next working day when ordered before 14:00: {formatPrice(storeConfig.expressShipping)}.</li>
          <li>We ship to Germany, Austria, Switzerland, France, the Netherlands, Belgium, Italy, Spain, Denmark, Sweden and the United Kingdom.</li>
        </ul>
        <p>
          Orders placed on a weekend or public holiday leave on the next working day. You will receive a tracking link by e-mail as soon as the parcel is
          collected. Deliveries to Switzerland and the United Kingdom may be subject to import duties, which are charged by the carrier.
        </p>
        <h2>Samples and gift wrapping</h2>
        <p>
          Every order includes two samples of your choice, chosen in your bag. Gift wrapping is {formatPrice(GIFT_WRAP_PRICE)} and comes with a handwritten
          card; prices are never included in the parcel.
        </p>
        <h2>Returns</h2>
        <p>
          Unopened, sealed bottles can be returned within 30 days of delivery for a full refund. Not sure about a fragrance? Try the sample first. If it is
          not for you, send the sealed bottle back and we will cover the return postage.
        </p>
        <p>
          For hygiene reasons we cannot accept opened bottles unless they arrived damaged or faulty. In that case, write to us within 14 days with a photo
          and we will replace it.
        </p>
        <h2>How to return</h2>
        <p>
          Write to orders@uy-studio.example with your order number. We will reply within one working day with a prepaid label. Refunds are made to the
          original payment method within five working days of the parcel reaching us.
        </p>
      </Prose>
    </ContentPage>
  );
}
