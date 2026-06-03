"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Accounts", href: "/accounts" },
  { label: "Records", href: "/records" },
  { label: "Analysis", href: "/analysis" },
  { label: "Budgets", href: "/budgets" },
];

export default function TopBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b">
      <div className="flex h-14 lg:h-16 items-center px-6">
        {/* Brand */}
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-sm font-semibold shrink-0"
        >
          MitWallet
        </Link>

        {/* Vertical divider */}
        <Separator orientation="vertical" className="mx-4 hidden lg:block h-5" />

        {/* Nav links — hidden on mobile */}
        <nav className="hidden lg:flex items-center gap-0">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "inline-flex shrink-0 items-center justify-center rounded-md px-2.5 h-8 text-sm font-medium whitespace-nowrap transition-colors outline-none",
                "hover:bg-accent hover:text-accent-foreground",
                "focus-visible:ring-[3px] focus-visible:ring-ring/50",
                pathname === href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2">
          {/* Search */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8 h-8 text-sm rounded-lg bg-muted border-0 w-40 xl:w-56 focus-visible:bg-muted"
            />
          </div>

          {/* Vertical divider */}
          <Separator orientation="vertical" className="mx-1 hidden lg:block h-5" />

          {/* Avatar */}
          <Avatar className="rounded-lg w-8 h-8">
            <AvatarImage src="https://github.com/evilrabbit.png" alt="user" />
            <AvatarFallback className="rounded-lg text-xs">ED</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
