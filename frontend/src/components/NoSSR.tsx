'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

interface NoSSRProps {
  children: ReactNode;
}

/**
 * Wrapper component that disables server-side rendering
 * Useful for components that cause hydration mismatches
 */
const NoSSR = ({ children }: NoSSRProps) => {
  return <>{children}</>;
};

export default dynamic(() => Promise.resolve(NoSSR), {
  ssr: false,
}); 