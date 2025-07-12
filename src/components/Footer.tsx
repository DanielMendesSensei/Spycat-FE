import React from "react";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Made by</span>
            <a
              href="https://github.com/DanielMendesSensei"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:text-primary/80 transition-colors duration-200 flex items-center space-x-1"
            >
              <Github className="h-4 w-4" />
              <span>Daniel Mendes</span>
            </a>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>Spy Cat Agency - Elite Feline Operatives Management System</p>
            <p className="mt-1">
              Built with Next.js, React, TypeScript, and Tailwind CSS
            </p>
          </div>

          <div className="text-xs text-muted-foreground/70">
            © 2025 Daniel Mendes. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
