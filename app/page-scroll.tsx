"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PageScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // Let the new route commit before reading its fragment or resetting scroll.
    const frame = window.requestAnimationFrame(() => {
      if (!window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
