"use client";
import { Button } from "@/components/ui/button";
import { Brain, LineChart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#features", label: "Features" },
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container px-4 mx-auto">
        <div className="flex h-16 items-center">
          {/* Logo */}
          <div 
            onClick={() => scrollToSection('#hero')}
            className="flex items-center space-x-2.5 cursor-pointer"
          >
            <Brain className="h-6 w-6" />
            <span className="font-semibold text-lg">TradeMind</span>
          </div>
          
          {/* Spacer */}
          <div className="flex-1" />

          {/* Desktop Navigation and Button */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <Button 
              onClick={() => scrollToSection('#hero')}
              className="h-10 px-6 whitespace-nowrap text-sm bg-gradient-to-r from-blue-400/80 to-purple-400/80 hover:from-blue-400 hover:to-purple-400 text-white/90 hover:text-white transition-all duration-200 shadow-lg shadow-blue-500/20"
            >
              <LineChart className="mr-2 h-4 w-4" />
              Join Waitlist
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2 ml-4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60 text-left"
                >
                  {link.label}
                </button>
              ))}
              <Button 
                onClick={() => scrollToSection('#hero')}
                className="w-full bg-gradient-to-r from-blue-400/80 to-purple-400/80 hover:from-blue-400 hover:to-purple-400 text-white/90 hover:text-white transition-all duration-200 shadow-lg shadow-blue-500/20"
              >
                <LineChart className="mr-2 h-4 w-4" />
                Join Waitlist
              </Button>
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
}