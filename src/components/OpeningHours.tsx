import { useState } from "react";
import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const OpeningHours = () => {
  const [open, setOpen] = useState(false);

  const schedule = [
    { day: "Sunday", time: "08:00 PM - 10:00 PM" },
    { day: "Monday", time: "08:00 AM - 10:00 PM" },
    { day: "Tuesday", time: "08:00 AM - 10:00 PM" },
    { day: "Wednesday", time: "08:00 AM - 10:00 PM" },
    { day: "Thursday", time: "08:00 AM - 10:00 PM" },
    { day: "Friday", time: "08:00 AM - 10:00 PM" },
    { day: "Saturday", time: "08:00 AM - 10:00 PM" },
  ];

  return (
    <section className="py-3 md:py-4 bg-background">
      <div className="container mx-auto px-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button 
              className="w-full flex items-center justify-center gap-3 md:gap-4 py-3 px-4 bg-card/50 backdrop-blur-sm border border-border/40 rounded-xl hover:bg-card/70 transition-all duration-300"
              aria-label="View opening hours"
            >
              {/* Open Badge */}
              <span className="px-4 py-1.5 bg-primary text-white text-xs md:text-sm font-bold rounded-full uppercase tracking-wide">
                Open
              </span>
              
              {/* Time Display */}
              <span className="text-muted-foreground text-sm md:text-base font-medium">
                08:00 AM – 10:00 PM
              </span>
              
              {/* Info Icon */}
              <Info className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </button>
          </DialogTrigger>

          {/* Modal Content */}
          <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border-border/50">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-foreground">
                Opening Hours
              </DialogTitle>
            </DialogHeader>

            {/* Notice Banner */}
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 text-center">
              <p className="text-primary font-semibold text-sm md:text-base">
                Note: We are open! Feel free to place your order.
              </p>
            </div>

            {/* Schedule Table */}
            <div className="space-y-0 border border-border/30 rounded-lg overflow-hidden">
              {schedule.map((item, index) => (
                <div
                  key={item.day}
                  className={`flex items-center justify-between py-4 px-6 ${
                    index !== schedule.length - 1 ? "border-b border-border/20" : ""
                  } hover:bg-background/50 transition-colors`}
                >
                  <span className="font-semibold text-foreground text-base md:text-lg">
                    {item.day}
                  </span>
                  <span className="text-muted-foreground font-medium text-sm md:text-base">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
