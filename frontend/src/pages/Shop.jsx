import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { toast } from "sonner";
import { Filter, Search } from "lucide-react";

const dummyProducts = [
  {
    id: "1",
    name: "Minimalist Watch",
    description: "A sleek, modern timepiece perfect for any occasion.",
    price: 199.99,
    category: "Accessories",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80"],
  },
  {
    id: "2",
    name: "Wireless Earbuds",
    description: "High-quality sound with active noise cancellation.",
    price: 129.5,
    category: "Electronics",
    images: ["https://images.unsplash.com/photo-1606220588913-b3a58ce681ce?w=500&q=80"],
  },
  {
    id: "3",
    name: "Classic Leather Bag",
    description: "Handcrafted genuine leather messenger bag.",
    price: 89.0,
    category: "Fashion",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80"],
  },
  {
    id: "4",
    name: "Smart Home Hub",
    description: "Control all your devices from one central location.",
    price: 149.99,
    category: "Electronics",
    images: ["https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500&q=80"],
  },
];

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/product");
        if (res.data.success && res.data.products.length > 0) {
          setProducts(res.data.products);
        } else {
          setProducts(dummyProducts);
        }
      } catch (error) {
        setProducts(dummyProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Premium Page Header */}
      <div className="bg-muted/30 border-b border-border py-12 mb-12 relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-10%] w-[50%] h-[200%] bg-violet-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
            Curated Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Explore our handpicked selection of premium electronics and accessories, designed to elevate your everyday experience.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Simple Filter/Search Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 bg-card border border-border p-4 rounded-2xl shadow-sm">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-muted/50 border border-border text-foreground text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-light"
            />
          </div>
          <button className="flex items-center gap-2 text-sm font-medium text-foreground bg-muted/50 hover:bg-muted border border-border px-4 py-2.5 rounded-xl transition-colors w-full sm:w-auto justify-center">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse bg-card border border-border rounded-3xl h-[400px]"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, idx) => (
              <ProductCard key={product._id || product.id} product={product} index={idx} />
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Shop;
