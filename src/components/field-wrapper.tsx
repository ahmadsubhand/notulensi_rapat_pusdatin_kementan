import type { ReactNode } from "react";

export function FieldWrapper({ children } : { children: ReactNode }) {
  return (
    <div className={`w-full flex flex-col sm:flex-row gap-4 items-start`}>
      {children}
    </div>
  )
}