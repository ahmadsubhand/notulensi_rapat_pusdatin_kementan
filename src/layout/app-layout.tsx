import AppLogo from "@/components/app-logo";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import type { ReactNode } from "react";

export default function AppLayout({ 
  children, h1Content 
} : {
  children: ReactNode, h1Content: string
}) {
  const isMobile = useIsMobile();

  const menu = [
    { title: 'Notulensi Rapat', href: '/notulensi-rapat' },
    { title: 'Perjalanan Dinas', href: '/perjalanan-dinas' }
  ]

  return (
    <div className="w-full">
      <div className="flex gap-2 m-6">
        <AppLogo fullText={true} />
        <NavigationMenu viewport={isMobile}>
          <NavigationMenuList className="gap-4">
            {menu.map((menu, i) => (
              <NavigationMenuItem key={i}>
                <NavigationMenuLink href={menu.href}>{menu.title}</NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex flex-col justify-center items-center gap-6">
        <h1 className="font-bold text-xl">{h1Content}</h1>
        {children}
      </div>
    </div>
  )
}