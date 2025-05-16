import {
  BriefcaseBusiness,
  Menu,
  MessageSquareText,
  Search,
  UserRound,
} from "lucide-react";
import React from "react";
import ThemeToggle from "../components/ThemeToggle";
import { Button } from "../components/ui/button";
import { useIsMobile } from "../hooks/use-mobile";
import { useToast } from "../hooks/use-toast";
import Link from "next/link";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { toast } = useToast();

  const handleProfileClick = () => {
    toast({
      title: "Profile feature coming soon",
      description: "User profiles will be available in the next update.",
    });
  };

  const handleNotificationsClick = () => {
    toast({
      title: "Notifications feature coming soon",
      description:
        "Message notifications will be available in the next update.",
    });
  };

  const handleSearchClick = () => {
    toast({
      title: "Search feature coming soon",
      description: "Global search will be available in the next update.",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-300 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-md bg-jobspark-500 p-1">
              <BriefcaseBusiness className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">
              JobSpark AI
            </span>
          </Link>
        </div>

        {!isMobile ? (
          <nav className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/jobs"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              Find Jobs
            </Link>
            <Link
              href="/resume"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              My Resume
            </Link>
            <Link
              href="/ai-assistant"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              AI Assistant
            </Link>
          </nav>
        ) : null}

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {!isMobile ? (
            <>
              <Button variant="ghost" size="icon" onClick={handleSearchClick}>
                <Search className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNotificationsClick}
              >
                <MessageSquareText className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleProfileClick}>
                <UserRound className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {isMobile && isMenuOpen && (
        <div className="container py-4 bg-background border-b border-border/40 animate-slide-down">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/dashboard"
              className="text-foreground/70 hover:text-foreground transition-colors py-2"
            >
              Dashboard
            </Link>
            <Link
              href="/jobs"
              className="text-foreground/70 hover:text-foreground transition-colors py-2"
            >
              Find Jobs
            </Link>
            <Link
              href="/resume"
              className="text-foreground/70 hover:text-foreground transition-colors py-2"
            >
              My Resume
            </Link>
            <Link
              href="/ai-assistant"
              className="text-foreground/70 hover:text-foreground transition-colors py-2"
            >
              AI Assistant
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
