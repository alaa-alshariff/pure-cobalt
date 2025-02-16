"use client";

import { useEffect } from "react";

import { useMediaQueries } from "@/contexts/responsive";

/**
 * Utility function to apply equal height to a group of elements.
 * It calculates the maximum height globally across all elements in the group and applies it.
 *
 * @param elements - Array of elements to equalize.
 */
const applyGlobalEqualHeight = (elements: HTMLElement[]) => {
  if (elements.length === 0) return;

  // Calculate the maximum height across all elements
  const maxHeight = Math.max(
    ...elements.map((element) => element.clientHeight)
  );

  // Apply the maximum height to all elements
  elements.forEach((element) => {
    element.style.minHeight = `${maxHeight}px`;
  });
};

/**
 * Custom hook to handle global equal height logic for `.eqh` blocks.
 *
 * This hook processes all `.eqh` blocks on the page, identifies their `data-eqh` selectors,
 * calculates the global maximum height for each selector, and applies the height globally.
 */
const useEqualHeight = () => {
  const { minWidth, isReady } = useMediaQueries();
  useEffect(() => {
    const isMobile = !minWidth.md;

    //early return on mobile
    if (!isReady || isMobile) return;

    // Select all `.eqh` blocks
    const blocks = document.querySelectorAll(".eqh");
    if (blocks.length === 0) return;

    // Map to store all elements globally for each selector
    const globalElementsMap: Record<string, HTMLElement[]> = {};

    // Collect all elements matching the selectors globally
    blocks.forEach((block) => {
      const selectors = block
        .getAttribute("data-eqh")
        ?.split(",")
        .map((s) => s.trim());

      if (!selectors) return;

      selectors.forEach((selector) => {
        globalElementsMap[selector] = [
          ...(globalElementsMap[selector] || []),
          ...Array.from(block.querySelectorAll<HTMLElement>(selector)),
        ];
      });
    });

    // Apply global equal height for each selector
    Object.values(globalElementsMap).forEach((elements) => {
      applyGlobalEqualHeight(elements);
    });

    // Observe DOM changes to dynamically reapply equal heights
    const observer = new MutationObserver(() => {
      Object.values(globalElementsMap).forEach((elements) => {
        applyGlobalEqualHeight(elements);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup the observer on unmount
    return () => observer.disconnect();
  }, [isReady, minWidth.md]);
};

export default useEqualHeight;
