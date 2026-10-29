import { NextResponse, type NextRequest } from "next/server";
import { getSummaries } from "@/lib/api.server";
import { simulateLatency } from "@/lib/latency";

/** Product summaries by slug, for the cart, checkout and wishlist. */
export async function GET(request: NextRequest) {
  const slugs = (request.nextUrl.searchParams.get("slugs") ?? "").split(",").filter(Boolean).slice(0, 60);
  await simulateLatency(120, 260);
  return NextResponse.json(getSummaries(slugs));
}
