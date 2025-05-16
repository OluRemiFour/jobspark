"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import ThemeToggle from "../components/ThemeToggle";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/AuthContext";
import NavbarButtons from "./NavbarButtons";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const location = useRouter();
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  // Update scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const navLinks = [
    // { name: "Home", path: "/" },
    ...(isAuthenticated
      ? [
          { name: "Dashboard", path: "/user/dashboard" },
          { name: "Jobs", path: "/user/jobs" },
          { name: "Resume", path: "/user/resume" },
          { name: "AI Assistant", path: "/user/ai-assistant" },
        ]
      : [
          { name: "Features", path: "/features" },
          { name: "Pricing", path: "/pricing" },
          { name: "For Employers", path: "/employers" },
        ]),
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled || isMobileMenuOpen
          ? "bg-white/80 backdrop-blur-md dark:bg-gray-900/90 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link
            href={`${isAuthenticated ? "#" : "/"}`}
            className="flex items-center"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {isScrolled || isMobileMenuOpen ? (
                <span className="text-2xl font-bold text-black dark:text-white">
                  JobSpark<span className="text-jobspark-500">AI</span>
                </span>
              ) : (
                <span className="text-2xl font-bold text-black dark:gray-900/90">
                  JobSpark<span className="text-jobspark-500">AI</span>
                </span>
              )}
            </motion.div>
          </Link>

          <nav className="ml-8 hidden  md:flex space-x-6">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {isScrolled || isMobileMenuOpen ? (
                  <Link
                    href={link.path}
                    className={`text-sm transition-colors hover:text-black dark:hover:text-white ${
                      pathname === link.path
                        ? "font-medium text-black dark:text-white"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <Link
                    href={link.path}
                    className={`text-sm transition-colors hover:text-black dark:hover:text-gray-600 ${
                      pathname === link.path
                        ? "font-medium text-black dark:text-gray-900/90"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </motion.div>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-4">
            {/* <ThemeToggle /> */}
            <NavbarButtons
              isScrolled={isScrolled}
              isMobileMenuOpen={isMobileMenuOpen}
            />
          </div>

          <div className="flex md:hidden">
            {/* <ThemeToggle /> */}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="container mx-auto px-4 py-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`px-2 py-2 text-sm transition-colors hover:text-black dark:hover:text-white ${
                      location.pathname === link.path
                        ? "font-medium text-black dark:text-white"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex flex-col gap-2">
                    <NavbarButtons />
                  </div>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
