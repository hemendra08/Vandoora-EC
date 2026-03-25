import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { ShoppingCart, ArrowLeft, Star, StarHalf, ShieldCheck, Truck, RotateCcw } from "lucide-react";

const dummyProducts = [
  { id: "1", name: "Minimalist Watch", description: "A sleek, modern timepiece perfect for any occasion.", price: 199.99, category: "Accessories", images: ["/images/watch.jpg"], ratings: 4.5, numOfReviews: 12 },
  { id: "2", name: "Wireless Earbuds", description: "High-quality sound with active noise cancellation.", price: 129.5, category: "Electronics", images: ["/images/earbuds.jpg"], ratings: 4.8, numOfReviews: 56 },
  { id: "3", name: "Classic Leather Bag", description: "Handcrafted genuine leather messenger bag.", price: 89.0, category: "Fashion", images: ["/images/bag.jpg"], ratings: 4.2, numOfReviews: 8 },
  { id: "4", name: "Smart Home Hub", description: "Control all your devices from one central location.", price: 149.99, category: "Electronics", images: ["/images/smarthub.jpg"], ratings: 4.6, numOfReviews: 34 },
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/product/${id}`);
        if (res.data.success) {
          setProduct(res.data.product);
        }
      } catch (error) {
        const dummy = dummyProducts.find((p) => p.id === id);
        if (dummy) {
          setProduct(dummy);
        } else {
          toast.error("Product not found.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`, {
      style: { background: '#8b5cf6', color: '#fff', border: 'none' }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <h2 className="text-3xl font-bold mb-4 text-foreground">Product Not Found</h2>
        <Button onClick={() => navigate("/products")} className="bg-violet-600 text-white hover:bg-violet-700"> Back to Shop </Button>
      </div>
    );
  }

  const imageUrl = product.images && product.images.length > 0
    ? product.images[0]
    : "/images/watch.jpg";

  return (
    <div className="bg-background text-foreground pb-24 pt-8 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-violet-500 transition-colors mb-8 group bg-muted/30 px-4 py-2 rounded-full border border-border"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Browse
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Image Gallery Column */}
          <div className="sticky top-24">
            <div className="rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-border/50 shadow-2xl shadow-violet-500/5 aspect-square relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
              <img 
                src={imageUrl} 
                alt={product.name} 
                className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal p-8 group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
            </div>
            {/* Thumbnail row could go here */}
          </div>

          {/* Details Column */}
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                {product.category || "Premium Collection"}
              </span>
              <span className="flex items-center text-emerald-600 dark:text-emerald-400 text-xs font-semibold bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                In Stock
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-foreground leading-[1.1]">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-3 mb-8">
              <div className="flex text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <StarHalf className="w-4 h-4 fill-current" />
              </div>
              <span className="text-sm border-l border-border pl-3 text-muted-foreground font-medium">
                {product.numOfReviews || 24} Verified Reviews
              </span>
            </div>

            <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
              <div className="mb-6 border-b border-border pb-6">
                <p className="text-4xl font-extrabold text-foreground tracking-tight">
                  ${product.price?.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground mt-2 font-light">+ Free Worldwide Shipping</p>
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={handleAddToCart} 
                  className="w-full h-14 text-lg bg-violet-600 hover:bg-violet-700 text-white rounded-2xl shadow-xl shadow-violet-600/20 hover:shadow-violet-600/40 transition-all hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </Button>
              </div>
            </div>

            <div className="prose prose-zinc dark:prose-invert max-w-none mb-10">
              <h3 className="text-xl font-bold mb-4">Product Details</h3>
              <p className="text-muted-foreground leading-relaxed font-light text-lg">
                {product.description}
              </p>
              <p className="text-muted-foreground leading-relaxed font-light text-lg mt-4">
                Designed to perfection. Experience the highest quality materials combined with cutting-edge engineering. This product comes with a comprehensive warranty and our guarantee of satisfaction.
              </p>
            </div>

            {/* Feature Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border pt-8 mt-auto">
              <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                <ShieldCheck className="w-6 h-6 text-violet-500" />
                <span className="text-sm font-medium">1 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                <RotateCcw className="w-6 h-6 text-violet-500" />
                <span className="text-sm font-medium">30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                <Truck className="w-6 h-6 text-violet-500" />
                <span className="text-sm font-medium">Express Delivery</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
