import { NavLink } from "react-router-dom";
import { Globe, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "홈", path: "/" },
  { name: "목표", path: "/goals" },
  { name: "추진전략", path: "/roadmap" },
  { name: "성과", path: "/results" },
  { name: "데이터 파이프라인", path: "/pipeline" },
  { name: "시뮬레이터", path: "/simulator" },
  { name: "간호 코디네이터", path: "/coordinator" },
  { name: "팀/파트너", path: "/team" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="w-full max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center space-x-2">
          <img src="/aicube.png" alt="AI CUBE Logo" className="h-8 w-auto" />
          <span className="text-lg font-bold text-blue-600">
            Train Studio
          </span>
        </NavLink>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  "transition-colors hover:text-blue-600",
                  isActive ? "text-blue-600" : "text-gray-600"
                )
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-gray-600" />

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 pt-6">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.path}>
                      <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                          cn(
                            "text-lg transition-colors hover:text-blue-600",
                            isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                          )
                        }
                      >
                        {link.name}
                      </NavLink>
                    </SheetClose>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}