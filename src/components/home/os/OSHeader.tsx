import * as React from "react"
import Link from "next/link"
import { Container } from "@/components/ui/Container"
import { NexusLogo } from "@/components/layout/NexusLogo"

export function OSHeader() {
  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "FEATURES", href: "#features" },
    { label: "ABOUT", href: "/about" },
    { label: "CAREERS", href: "/careers" },
    { label: "CONTACT", href: "/contact" }
  ]

  return (
    <header className="bg-[#FAF7F2] border-b border-[#E6E2DA]/50 sticky top-0 z-50">
      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <NexusLogo iconColor="text-[#0F5B3E]" textColor="text-[#1A1A1A]" iconSize={30} />
          </Link>


          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[11px] font-medium text-[#6B7280] hover:text-[#1A1A1A] uppercase tracking-[0.15em] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu (Optional placeholder) */}
          <div className="md:hidden">
            {/* Hamburger icon can be added here if needed */}
          </div>
        </div>
      </Container>
    </header>
  )
}
