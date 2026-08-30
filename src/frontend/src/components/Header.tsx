import { Zap } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <a
          href="#top"
          data-ocid="header.logo"
          className="group flex items-center gap-2.5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary transition-smooth group-hover:bg-primary/25">
            <Zap className="h-5 w-5" fill="currentColor" />
          </span>
          <span className="font-display text-xl font-bold tracking-[0.18em] text-foreground">
            VOLTS
          </span>
        </a>
      </div>
    </header>
  );
}
