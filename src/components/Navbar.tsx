
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gamepad } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border py-3">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Gamepad size={28} className="text-primary animate-pulse" />
          <span className="text-xl font-bold gradient-text">GameDevFolio</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground/80 hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/projects" className="text-foreground/80 hover:text-primary transition-colors">
            Projects
          </Link>
          <Link to="/about" className="text-foreground/80 hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-foreground/80 hover:text-primary transition-colors">
            Contact
          </Link>
        </div>

        <Link to="/admin">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/20">
            Admin
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
