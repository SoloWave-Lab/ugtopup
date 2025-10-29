import { Zap, Flame } from "lucide-react";

export const BestDeals = () => {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          {/* Best Deals Title */}
          <h2 
            className="flex items-center justify-center gap-3 text-2xl md:text-4xl font-bold tracking-wider"
            aria-label="Best Deals"
          >
            <Zap className="w-7 h-7 md:w-10 md:h-10 text-yellow-400 fill-yellow-400" />
            <span className="text-primary uppercase" style={{ letterSpacing: '0.1em' }}>
              BEST DEALS
            </span>
            <Flame className="w-7 h-7 md:w-10 md:h-10 text-orange-500 fill-orange-500" />
          </h2>

          {/* Countdown Timer */}
          <div 
            className="flex items-center justify-center gap-2 md:gap-4 text-xl md:text-3xl font-semibold text-foreground/90"
            role="status"
            aria-label="Deal time remaining"
          >
            <span className="tabular-nums">02D</span>
            <span className="text-muted-foreground">:</span>
            <span className="tabular-nums">03H</span>
            <span className="text-muted-foreground">:</span>
            <span className="tabular-nums">19M</span>
            <span className="text-muted-foreground">:</span>
            <span className="tabular-nums">38S</span>
          </div>
        </div>
      </div>
    </section>
  );
};
