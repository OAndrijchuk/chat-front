import { ReactNode } from 'react';

export default function Section(
  { children, className }: { children: ReactNode, className?: string }) {
  return <section className={`min-w-full h-screen flex flex-col items-center justify-center py-20 ${className}`}>{children}</section>;
}
