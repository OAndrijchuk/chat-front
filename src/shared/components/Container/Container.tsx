import { ReactNode } from 'react';

export default function Container({ children, className }: { children: ReactNode, className?:string }) {
  return (
    <div className={` w-full h-full mx-auto px-4 md:px-8 xl:px-20 ${className}`}>{children}</div>
  );
}
