import { Facebook, Youtube, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-background to-card border-t border-border/50">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              GameTopUp
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted partner for instant game top-ups. Fast, secure, and reliable service for all your gaming needs.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "Products", path: "/#products" },
                { name: "About Us", path: "/#about" },
                { name: "Contact", path: "/#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm inline-block hover:translate-x-1 duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Games */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Popular Games</h4>
            <ul className="space-y-2">
              {[
                { name: "Free Fire Diamonds", path: "/freefire" },
                { name: "TikTok Coins", path: "/tiktok" },
                { name: "Netflix Premium", path: "/netflix" },
                { name: "Garena Shells", path: "/garena" },
              ].map((game) => (
                <li key={game.name}>
                  <Link
                    to={game.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm inline-block hover:translate-x-1 duration-300"
                  >
                    {game.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>support@gametopup.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>123 Gaming Street, Digital City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden md:block">Follow us:</span>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="group flex items-center justify-center h-10 w-10 rounded-full bg-muted/50 border border-border/50 transition-all hover:bg-primary hover:border-primary hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4 text-foreground group-hover:text-primary-foreground transition-colors" />
                </a>
                <a
                  href="#"
                  className="group flex items-center justify-center h-10 w-10 rounded-full bg-muted/50 border border-border/50 transition-all hover:bg-primary hover:border-primary hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                  aria-label="YouTube"
                >
                  <Youtube className="h-4 w-4 text-foreground group-hover:text-primary-foreground transition-colors" />
                </a>
                <a
                  href="#"
                  className="group flex items-center justify-center h-10 w-10 rounded-full bg-muted/50 border border-border/50 transition-all hover:bg-primary hover:border-primary hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4 text-foreground group-hover:text-primary-foreground transition-colors" />
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">
                © {currentYear} <span className="text-primary font-semibold">GameTopUp</span>. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
