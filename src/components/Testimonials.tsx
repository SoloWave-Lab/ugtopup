import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "PUBG Player",
    feedback: "Best service I've ever used! Lightning-fast delivery and great prices. Highly recommended!",
    initials: "AJ",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Free Fire Enthusiast",
    feedback: "Amazing experience! The support team is incredibly helpful and the process is super smooth.",
    initials: "SW",
  },
  {
    id: 3,
    name: "Mike Chen",
    role: "Roblox Creator",
    feedback: "Trustworthy and reliable. I've been using this service for months and never had any issues.",
    initials: "MC",
  },
  {
    id: 4,
    name: "Emma Davis",
    role: "Mobile Gamer",
    feedback: "The cheapest prices and fastest delivery. This is my go-to platform for all game top-ups!",
    initials: "ED",
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          Testimonials
        </h2>

        <div className="relative mx-auto max-w-3xl">
          <div className="overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-opacity duration-500 ${
                  index === currentIndex ? "opacity-100" : "absolute opacity-0"
                }`}
              >
                <div className="glass-card rounded-2xl p-8 md:p-12">
                  <Quote className="mb-4 h-8 w-8 text-primary" />
                  <p className="mb-6 text-lg leading-relaxed text-foreground">
                    "{testimonial.feedback}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-primary">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dot Indicators */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-primary glow-border"
                    : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
