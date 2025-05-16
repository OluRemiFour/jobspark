import { Bell, Briefcase, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useAuth } from "../context/AuthContext";

const NavbarButtons = ({ isMobileMenuOpen, isScrolled }: any) => {
  const { isAuthenticated, logout, user } = useAuth();
  // console.log(user)

  return (
    <div className="flex items-center gap-4">
      {isAuthenticated ? (
        <>
          {!isScrolled ? (
            <>
              <Link href="/user/notifications" className="relative">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    *
                  </span>
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-full h-10 w-10 p-0 border-2"
                  >
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-[#f9f9f9]">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{user?.name || "User"}</span>
                      <span className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/user/dashboard" className="cursor-pointer">
                      <Briefcase className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/user/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/user/#settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="cursor-pointer text-red-500"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/user/notifications" className="relative">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Bell className="h-5 w-5" color="#fff" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    3
                  </span>
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-full border-white h-10 w-10 p-0 border-2"
                  >
                    <User className="h-5 w-5" color="#ffff" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-[#f9f9f9]">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{user?.name || "User"}</span>
                      <span className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/user/dashboard" className="cursor-pointer">
                      <Briefcase className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/user/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/user/#settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="cursor-pointer text-red-500"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </>
      ) : (
        <>
          {isScrolled || isMobileMenuOpen ? (
            <>
              <Link href="/login">
                <Button className="text-white cursor-pointer">Log in</Button>
              </Link>
              <div className="w-0.5 h-4 bg-white" />
              <Link href="/signup">
                <Button className="text-white cursor-pointer">Sign up</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button className="cursor-pointer">Log in</Button>
              </Link>
              <div className="w-0.5 h-4 bg-[#1a1a1a]" />
              <Link href="/signup">
                <Button className="cursor-pointer">Sign up</Button>
              </Link>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default NavbarButtons;
