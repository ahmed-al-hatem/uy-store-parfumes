import { NextResponse, type NextRequest } from "next/server";
import { searchSuggestions } from "@/lib/api.server";
import { simulateLatency } from "@/lib/latency";

export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get("q") ?? "").slice(0, 80);
  await simulateLatency(120, 220);
  return NextResponse.json(searchSuggestions(q));
}
