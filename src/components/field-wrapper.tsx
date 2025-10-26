import type { ReactNode } from "react";

export function FieldWrapper({ children, isMobile=false } : { children: ReactNode, isMobile?: boolean }) {
  return (
    <div className={`w-full flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4 items-start`}>
      {children}
    </div>
  )
}