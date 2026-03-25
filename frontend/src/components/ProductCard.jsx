import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductCard = ({ product, index = 0 }) => {
  const dispatch = useDispatch();
  const addToCartHandler = (e) => {
    e.preventDefault(); // Prevent navigating to product details when clicking Add
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`, {
      style: {
        background: '#8b5cf6',
        color: '#fff',
        border: 'none',
      }
    });
  };

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0]
      : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80";

  return (
    <Link 
      to={`/product/${product._id || product.id}`} 
      className="group flex flex-col bg-card border border-border rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-violet-500/10 hover:-translate-y-2 transition-all duration-500 relative animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted/30 p-4">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {product.category && (
            <span className="bg-white/90 text-zinc-900 shadow-sm text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full font-bold backdrop-blur-md border border-black/5">
              {product.category}
            </span>
          )}
        </div>

        {/* Floating Add to Cart Button */}
        <div className="absolute bottom-4 right-4 z-20 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Button
            onClick={addToCartHandler}
            size="icon"
            className="rounded-full bg-violet-600 hover:bg-violet-700 text-white shadow-lg h-12 w-12 hover:scale-105 transition-transform"
          >
            <ShoppingCart className="w-5 h-5 fill-current" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow bg-card z-20 relative">
        <h3 className="text-lg font-bold text-foreground line-clamp-1 group-hover:text-violet-500 transition-colors">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mt-2 line-clamp-2 font-light leading-relaxed flex-grow">
          {product.description}
        </p>

        <div className="mt-6 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Price</span>
            <span className="text-2xl font-extrabold text-foreground tracking-tight">
              ${product.price?.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
