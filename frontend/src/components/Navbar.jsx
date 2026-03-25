import { ShoppingCart, LogOut, LogIn, User } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";
import axios from "axios";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const { cartTotalQuantity } = useSelector((store) => store.cart);
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "glass shadow-sm py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 lg:px-8">
        {/* logo section */}
        <div>
          <Link to={"/"} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-violet-500/30 group-hover:scale-105 transition-transform">
              V
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors">
              Vandoora
            </span>
          </Link>
        </div>

        {/* nav section */}
        <nav className="hidden md:flex gap-8 justify-center items-center">
          <ul className="flex gap-8 items-center text-[15px] font-medium text-foreground/80">
            <li>
              <Link to={"/"} className="hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full pb-1">
                Home
              </Link>
            </li>
            <li>
              <Link to={"/products"} className="hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full pb-1">
                Products
              </Link>
            </li>
            {user && (
              <li>
                <Link to={"/profile"} className="hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full pb-1">
                  Profile
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* right section */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <Link to={"/cart"} className="relative p-2 rounded-full hover:bg-muted transition-colors text-foreground/80 hover:text-primary group">
            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {cartTotalQuantity > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm animate-fade-in">
                {cartTotalQuantity > 99 ? '99+' : cartTotalQuantity}
              </span>
            )}
          </Link>
          
          <div className="w-px h-6 bg-border mx-2 hidden sm:block"></div>
          
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-sm font-medium text-muted-foreground mr-1 h-max">
                {user.firstName}
              </span>
              <Button
                onClick={logoutHandler}
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button 
              onClick={()=>navigate('/login')} 
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 shadow-md shadow-primary/20 transition-all hover:shadow-primary/40 hover:-translate-y-0.5"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
