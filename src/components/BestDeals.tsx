import { useState, useEffect } from "react";
import { Zap, Flame } from "lucide-react";

export const BestDeals = () => {
  // Initial countdown: 2 days, 3 hours, 19 minutes, 38 seconds
  const initialSeconds = (2 * 24 * 60 * 60) + (3 * 60 * 60) + (19 * 60) + 38;
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    // Exit if countdown is finished
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Reset to initial value when countdown ends (loop)
          return initialSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, [secondsLeft, initialSeconds]);

  // Calculate days, hours, minutes, seconds from total seconds
  const days = Math.floor(secondsLeft / (24 * 60 * 60));
  const hours = Math.floor((secondsLeft % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((secondsLeft % (60 * 60)) / 60);
  const seconds = secondsLeft % 60;

  // Format with leading zeros
  const formatNumber = (num: number) => String(num).padStart(2, '0');

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

          {/* Dynamic Countdown Timer */}
          <div 
            className="flex items-center justify-center gap-2 md:gap-4 text-xl md:text-3xl font-semibold text-foreground/90"
            role="status"
            aria-label="Deal time remaining"
            aria-live="polite"
          >
            <span className="tabular-nums">{formatNumber(days)}D</span>
            <span className="text-muted-foreground">:</span>
            <span className="tabular-nums">{formatNumber(hours)}H</span>
            <span className="text-muted-foreground">:</span>
            <span className="tabular-nums">{formatNumber(minutes)}M</span>
            <span className="text-muted-foreground">:</span>
            <span className="tabular-nums">{formatNumber(seconds)}S</span>
          </div>
        </div>
      </div>
    </section>
  );
};
