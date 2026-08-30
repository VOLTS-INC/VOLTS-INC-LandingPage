import { Sparkles } from "lucide-react";
import { useGetBusinessInfo } from "../hooks/useQueries";

export default function Hero() {
  const { data: info } = useGetBusinessInfo();

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-background"
      aria-label="VOLTS introduction"
    >
      {/* Ambient glow orbs */}
      <div className="glow-orb animate-orb-drift left-[-10%] top-[-10%] h-96 w-96 bg-primary/25" />
      <div className="glow-orb animate-orb-drift bottom-[-20%] right-[-5%] h-[28rem] w-[28rem] bg-primary/15 [animation-delay:-6s]" />

      <div className="container relative grid items-center gap-14 py-20 md:grid-cols-2 md:py-28">
        <div>
          <p
            className="eyebrow animate-fade-up mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-primary"
            style={{ animationDelay: "0ms" }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {info?.tagline ?? "The next generation of technology"}
          </p>

          <h1
            className="animate-fade-up font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl"
            style={{ animationDelay: "120ms" }}
          >
            Powering the
            <br />
            <span className="text-gradient">next era of energy.</span>
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
            style={{ animationDelay: "240ms" }}
          >
            VOLTS is an upcoming technology company building intelligent,
            human-centered products that move at the speed of ideas. We turn
            ambitious visions into systems that just work.
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "360ms" }}
          >
            <span className="animate-float lift-glow inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-display font-semibold text-primary-foreground">
              Clean energy
            </span>
            <span className="animate-float lift-glow inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 font-display font-semibold text-foreground [animation-delay:0.6s]">
              Intelligent systems
            </span>
          </div>
        </div>

        <div
          className="animate-fade-up relative"
          style={{ animationDelay: "300ms" }}
        >
          <div className="animate-float flex items-center gap-2 rounded-2xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground shadow-elevated">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Building the future, today
          </div>
        </div>
      </div>
    </section>
  );
}
