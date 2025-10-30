import { useState, useEffect } from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "PUBG Player",
    feedback: "Best service I've ever used! Lightning-fast delivery and great prices. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Free Fire Enthusiast",
    feedback: "Amazing experience! The support team is incredibly helpful and the process is super smooth.",
    rating: 5,
  },
  {
    id: 3,
    name: "Mike Chen",
    role: "Roblox Creator",
    feedback: "Trustworthy and reliable. I've been using this service for months and never had any issues.",
    rating: 5,
  },
  {
    id: 4,
    name: "Emma Davis",
    role: "Mobile Gamer",
    feedback: "The cheapest prices and fastest delivery. This is my go-to platform for all game top-ups!",
    rating: 5,
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
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
            What Our <span className="text-primary">Customers</span> Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied gamers who trust us for their top-ups
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-all duration-700 ${
                  index === currentIndex 
                    ? "opacity-100 translate-x-0" 
                    : "absolute opacity-0 translate-x-full"
                }`}
              >
                <div className="relative">
                  {/* Quote Icon Background */}
                  <div className="absolute -top-4 -left-4 opacity-10">
                    <Quote className="h-20 w-20 text-primary" />
                  </div>
                  
                  {/* Card */}
                  <div className="relative glass-card rounded-3xl p-8 md:p-12 border border-border/50 hover:border-primary/30 transition-all duration-300">
                    {/* Stars */}
                    <div className="flex gap-1 mb-6 justify-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="h-5 w-5 fill-primary text-primary" 
                        />
                      ))}
                    </div>

                    {/* Feedback */}
                    <p className="mb-8 text-lg md:text-xl leading-relaxed text-foreground/90 text-center italic">
                      "{testimonial.feedback}"
                    </p>

                    {/* User Info */}
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground font-bold text-lg shadow-lg">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-foreground text-lg">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="mt-10 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-10 bg-primary shadow-lg shadow-primary/50"
                    : "w-2.5 bg-muted hover:bg-muted-foreground/50"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
