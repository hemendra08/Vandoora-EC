import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-600/20 blur-[120px] mix-blend-screen animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="flex flex-col text-center lg:text-left space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 text-sm font-medium text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/30 px-4 py-2 rounded-full w-fit mx-auto lg:mx-0 shadow-sm border border-violet-200 dark:border-violet-800/50">
              <Sparkles className="w-4 h-4" />
              <span>Discover the Future of Tech</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Elevate Your <br />
              <span className="text-gradient">Digital Life.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
              Experience unparalleled clarity, speed, and premium quality with our meticulously curated collection of state-of-the-art electronics.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link to="/products">
                <Button className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white border-transparent px-8 py-6 h-auto text-lg rounded-full shadow-lg shadow-violet-600/30 transition-all hover:-translate-y-1 hover:shadow-violet-600/50 group">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Shop Collection
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline" className="w-full sm:w-auto px-8 py-6 h-auto text-lg rounded-full border-border bg-background/50 backdrop-blur-sm hover:bg-muted transition-all">
                  View Latest Deals
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual Content (Floating Cards/Images) */}
          <div className="relative hidden lg:flex flex-col items-center justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {/* Main Showcase Card */}
            <div className="glass-card p-6 rounded-3xl w-full max-w-md relative z-20 hover:-translate-y-2 transition-transform duration-500">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-tr from-zinc-100 to-white dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center mb-6 overflow-hidden relative shadow-inner">
                {/* Fallback image if no real product images are handy, using an abstract tech shape or icon */}
                <div className="absolute inset-0 bg-[url('/images/macbook.jpg')] bg-cover bg-center rounded-2xl"></div>
                <div className="w-32 h-32 rounded-full bg-violet-500/20 blur-3xl absolute"></div>
              </div>
              <h3 className="text-xl font-bold text-foreground">MacBook Pro 16"</h3>
              <p className="text-muted-foreground text-sm mt-1">M3 Max • 64GB RAM • 2TB SSD</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-extrabold text-foreground">$3,499</span>
                <span className="text-sm font-medium text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">In Stock</span>
              </div>
            </div>

            {/* Floating Accessory Card 1 */}
            <div className="glass-card p-4 rounded-2xl w-48 absolute -bottom-10 -left-10 z-30 shadow-2xl animate-pulse-slow" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/40 flex flex-shrink-0 items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-violet-500"></div>
                </div>
                <div>
                  <h4 className="text-sm font-bold leading-tight">AirPods Max</h4>
                  <p className="text-xs text-muted-foreground">$549</p>
                </div>
              </div>
            </div>

            {/* Floating Stats Card 2 */}
            <div className="glass-card p-4 rounded-2xl w-48 absolute top-10 -right-10 z-10 shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Top Rated</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-black text-violet-500">4.9</span>
                <span className="text-sm pb-1 font-medium text-foreground">/ 5.0</span>
              </div>
              <div className="flex gap-1 mt-2">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className={`w-4 h-4 ${i===5 ? 'text-violet-500/30' : 'text-violet-500'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
