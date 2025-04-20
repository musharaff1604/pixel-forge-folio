
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center bg-grid">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-20 w-40 h-40 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-60 h-60 rounded-full bg-game-cyan/20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-game-magenta/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold">
            <span className="block">Turning</span>
            <span className="block gradient-text">Ideas Into</span>
            <span className="block animate-glow">Interactive Realities</span>
          </h1>

          <p className="text-lg md:text-xl text-foreground/80 max-w-xl">
            Game Developer passionate about creating immersive experiences and pushing the boundaries of interactive entertainment.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/projects">
              <Button className="relative overflow-hidden px-6 py-6 bg-primary text-primary-foreground hover:bg-primary/90 group">
                <span className="relative z-10">View Projects</span>
                <span className="absolute inset-0 bg-gradient-to-r from-game-purple to-game-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="px-6 py-6 border-primary text-primary hover:bg-primary/20 animate-pulse-border">
                Contact Me
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-sm text-foreground/60">Scroll to discover</span>
        <div className="h-12 w-6 rounded-full border-2 border-foreground/20 flex items-start justify-center p-1">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
