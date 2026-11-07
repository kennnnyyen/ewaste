import { NextRequest, NextResponse } from "next/server";
import { categories } from "./app/recycling-content";

const categorySlugs = new Set(categories.map(({ slug }) => slug));

export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (!categorySlugs.has(slug)) {
    // Reject before partial prerendering can stream HTTP 200 for an unknown category.
    return NextResponse.rewrite(new URL("/404", request.url), { status: 404 });
  }
  return NextResponse.next();
}

export const config = { matcher: "/recycling/:slug" };
