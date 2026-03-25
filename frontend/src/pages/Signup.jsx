import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/v1/user/register", formData, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/verify");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex text-foreground bg-background">
      {/* Left Branding Panel */}
      <div className="hidden lg:flex w-1/2 bg-zinc-950 relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/signup-bg.jpg')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-indigo-600/30 blur-[150px] rounded-full"></div>
        </div>
        
        <div className="relative z-10 text-white max-w-lg animate-fade-in-up">
          <Link to="/" className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">V</div>
            <span className="text-3xl font-extrabold tracking-tight">Vandoora</span>
          </Link>
          <h1 className="text-5xl font-black mb-6 leading-tight">Join the evolution.</h1>
          <p className="text-lg text-zinc-300 font-light leading-relaxed">
            Create your account today and unlock a world of premium electronics, exclusive deals, and unparalleled service.
          </p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative animate-fade-in">
        {/* Mobile Logo */}
        <Link to="/" className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold text-xl">V</div>
        </Link>

        <div className="w-full max-w-md">
          <div className="mb-10 mt-12 lg:mt-0">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Create an account</h2>
            <p className="text-muted-foreground font-light text-sm">
              Already have an account? <Link to="/login" className="text-violet-600 dark:text-violet-400 font-semibold hover:underline">Sign in</Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 flex flex-col">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">First Name</Label>
                <Input
                  id="firstName" name="firstName" type="text" placeholder="John"
                  value={formData.firstName} onChange={handleChange} required
                  className="h-14 bg-muted/50 border-border focus:border-violet-500 focus:ring-violet-500/20 rounded-xl transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Last Name</Label>
                <Input
                  id="lastName" name="lastName" type="text" placeholder="Doe"
                  value={formData.lastName} onChange={handleChange} required
                  className="h-14 bg-muted/50 border-border focus:border-violet-500 focus:ring-violet-500/20 rounded-xl transition-all"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Email Address</Label>
              <Input
                id="email" name="email" type="email" placeholder="you@example.com"
                value={formData.email} onChange={handleChange} required
                className="h-14 bg-muted/50 border-border focus:border-violet-500 focus:ring-violet-500/20 rounded-xl transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Create Password</Label>
              <div className="relative">
                <Input
                  id="password" name="password" type={showPassword ? "text" : "password"}
                  placeholder="••••••••" value={formData.password} onChange={handleChange} required
                  className="h-14 bg-muted/50 border-border focus:border-violet-500 focus:ring-violet-500/20 rounded-xl transition-all pr-12"
                />
                <button
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit" disabled={loading}
              className="w-full h-14 text-lg font-bold mt-6 bg-violet-600 hover:bg-violet-700 text-white rounded-xl shadow-lg shadow-violet-600/20 transition-all hover:-translate-y-0.5"
            >
              {loading ? (
                <><Loader className="w-5 h-5 animate-spin mr-2" /> Creating account...</>
              ) : (
                <>Create Account <ArrowRight className="w-5 h-5 ml-2" /></>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
