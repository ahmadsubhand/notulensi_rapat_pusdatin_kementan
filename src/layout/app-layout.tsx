import AppLogo from "@/components/app-logo";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle"
import { Button } from "@/components/ui/button";

export default function AppLayout() {
  const isMobile = useIsMobile();

  const menu = [
    { title: 'Notulensi Rapat', href: '/notulensi-rapat' },
    { title: 'Perjalanan Dinas', href: '/perjalanan-dinas' }
  ];

  const h1Content = (() => {
    if (location.pathname.startsWith('/perjalanan-dinas')) return 'Perjalanan Dinas Pusdatin';
    if (location.pathname.startsWith('/notulensi-rapat')) return 'Notulensi Rapat Pusdatin';
    if (location.pathname === '/') return '';
    return '';
  })();

  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="flex gap-2 m-6">
        <Link to={'/'} className="flex gap-2 w-full">
          <AppLogo fullText={true} />
        </Link>
        <NavigationMenu viewport={isMobile}>
          <NavigationMenuList className="gap-4">
            {menu.map((menu, i) => (
              <NavigationMenuItem key={i}>
                <Button onClick={() => navigate(menu.href)} variant={location.pathname.startsWith(menu.href) ? 'default' : 'ghost'}>{menu.title}</Button>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <ThemeToggle />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex flex-col justify-center items-center gap-6">
        <h1 className="font-bold text-xl">{h1Content}</h1>
        <Outlet />
      </div>
    </div>
  )
}