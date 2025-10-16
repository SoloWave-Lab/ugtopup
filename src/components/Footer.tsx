import { Facebook, Youtube, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="mb-6 text-xl font-semibold">Connect With Us On</h3>
          <div className="mb-8 flex justify-center gap-6">
            <a
              href="#"
              className="group rounded-full bg-muted p-4 transition-all hover:bg-primary hover:scale-110"
            >
              <Facebook className="h-6 w-6 text-foreground group-hover:text-primary-foreground" />
            </a>
            <a
              href="#"
              className="group rounded-full bg-muted p-4 transition-all hover:bg-primary hover:scale-110"
            >
              <Youtube className="h-6 w-6 text-foreground group-hover:text-primary-foreground" />
            </a>
            <a
              href="#"
              className="group rounded-full bg-muted p-4 transition-all hover:bg-primary hover:scale-110"
            >
              <Instagram className="h-6 w-6 text-foreground group-hover:text-primary-foreground" />
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} GameTopUp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
