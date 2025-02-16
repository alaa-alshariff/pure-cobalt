import { useEffect, useState } from 'react';

type ScrollState = { x: number | null; y: number | null };

// Initial version pulled from https://github.com/uidotdev/usehooks/blob/main/index.js#L1310C1-L1343C1
export function useWindowScroll() {
  const [state, setState] = useState<ScrollState>({
    x: null,
    y: null,
  });

  useEffect(() => {
    const handleScroll = () => {
      setState({ x: window.scrollX, y: window.scrollY });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return [state];
}
