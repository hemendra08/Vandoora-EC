import { Headphones, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import React from "react";

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <div 
    className="flex flex-col items-center text-center p-8 bg-card border border-border rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
    style={{ animationDelay: delay }}
  >
    <div className="h-16 w-16 bg-violet-50 dark:bg-violet-500/10 rounded-2xl flex items-center justify-center mb-6 text-violet-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm">
      <Icon className="h-8 w-8" />
    </div>
    <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
    <p className="text-muted-foreground font-light text-sm leading-relaxed">{description}</p>
  </div>
);

const Features = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Subtle top border/separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
            Why Shop With Us
          </h2>
          <p className="text-muted-foreground">
            We provide a premium shopping experience from start to finish.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <FeatureCard 
            icon={Truck} 
            title="Free Shipping" 
            description="Enjoy free express delivery on all orders over $50. Tracked and insured."
            delay="0.1s"
          />
          <FeatureCard 
            icon={ShieldCheck} 
            title="Secure Payments" 
            description="100% secure, encrypted transactions. Your data is perfectly safe with us."
            delay="0.2s"
          />
          <FeatureCard 
            icon={RotateCcw} 
            title="Easy Returns" 
            description="30-day no-questions-asked return policy. Hassle-free exchanges."
            delay="0.3s"
          />
          <FeatureCard 
            icon={Headphones} 
            title="24/7 Support" 
            description="Our award-winning support team is always here to resolve your issues."
            delay="0.4s"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
