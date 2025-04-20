
import { Link } from "react-router-dom";
import { Gamepad } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-sm py-8">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Gamepad size={24} className="text-primary" />
              <span className="text-lg font-bold gradient-text">GameDevFolio</span>
            </Link>
            <p className="text-foreground/70 max-w-md">
              Creating immersive gaming experiences and pushing the boundaries of interactive entertainment.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-lg">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-foreground/70 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-foreground/70 hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-foreground/70 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-foreground/70 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-lg">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-foreground/50">
          <p>© {new Date().getFullYear()} GameDevFolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
