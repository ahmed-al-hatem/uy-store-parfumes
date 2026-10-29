import { NextResponse, type NextRequest } from "next/server";
import { listProducts } from "@/lib/api.server";
import { simulateLatency } from "@/lib/latency";
import { asGender, loadShopParams, PAGE_SIZE } from "@/lib/shop/query";

export async function GET(request: NextRequest) {
  const { page: _page, ...params } = loadShopParams(request.nextUrl.searchParams);
  const sp = request.nextUrl.searchParams;
  const offset = Math.max(0, Number(sp.get("offset")) || 0);
  const limit = Math.min(120, Math.max(1, Number(sp.get("limit")) || PAGE_SIZE));
  const category = sp.get("category") ?? "";

  await simulateLatency();
  return NextResponse.json(
    listProducts({ ...params, offset, limit, category: asGender(category) ? category : undefined }),
  );
}
