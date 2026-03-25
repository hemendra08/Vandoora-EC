import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, CreditCard, ShieldCheck } from "lucide-react";
import { addToCart, decreaseCart, removeFromCart, clearCart } from "../redux/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (cartItem) => dispatch(removeFromCart(cartItem));
  const handleDecreaseCart = (cartItem) => dispatch(decreaseCart(cartItem));
  const handleIncreaseCart = (cartItem) => dispatch(addToCart(cartItem));
  const handleClearCart = () => dispatch(clearCart());

  return (
    <div className="bg-background text-foreground pb-24 pt-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="mb-10 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 text-foreground">
            Your Cart
          </h1>
          <p className="text-muted-foreground text-lg font-light">
            {cart.cartItems.length === 0 
              ? "Your cart is currently empty." 
              : `You have ${cart.cartTotalQuantity} items in your cart.`}
          </p>
        </div>

        {cart.cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-card border border-border rounded-3xl shadow-sm animate-fade-in">
            <div className="w-24 h-24 bg-violet-50 dark:bg-violet-900/20 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-10 h-10 text-violet-500" />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-foreground">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto font-light leading-relaxed">
              Looks like you haven't added anything to your cart yet. Discover our premium collection.
            </p>
            <Button 
              onClick={() => navigate("/products")} 
              className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-8 h-14 text-lg shadow-lg shadow-violet-600/20 transition-all hover:-translate-y-1"
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Cart Items List */}
            <div className="lg:w-[65%] space-y-6">
              <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
                
                {/* Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 text-xs tracking-wider uppercase font-bold text-muted-foreground p-6 border-b border-border bg-muted/30">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>
                
                <div className="divide-y divide-border">
                  {cart.cartItems.map((cartItem) => {
                    const imageUrl = cartItem.images && cartItem.images.length > 0
                      ? cartItem.images[0]
                      : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80";

                    return (
                      <div key={cartItem._id || cartItem.id} className="p-6 grid grid-cols-1 md:grid-cols-12 items-center gap-6 group hover:bg-muted/10 transition-colors">
                        
                        {/* Product Info */}
                        <div className="col-span-1 md:col-span-6 flex items-center gap-6">
                          <Link to={`/product/${cartItem._id || cartItem.id}`} className="w-24 h-24 rounded-2xl overflow-hidden bg-muted/50 flex-shrink-0 border border-border/50 block">
                            <img src={imageUrl} alt={cartItem.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-500" />
                          </Link>
                          <div className="flex flex-col">
                            <span className="text-xs text-violet-500 font-bold uppercase tracking-wider mb-1">{cartItem.category || 'Premium'}</span>
                            <Link to={`/product/${cartItem._id || cartItem.id}`} className="hover:text-violet-500 transition-colors">
                              <h3 className="font-bold text-lg text-foreground line-clamp-1">{cartItem.name}</h3>
                            </Link>
                            <button 
                              onClick={() => handleRemoveFromCart(cartItem)}
                              className="text-sm text-destructive/80 hover:text-destructive flex items-center mt-3 w-max font-medium transition-colors"
                            >
                              <Trash2 className="w-4 h-4 mr-1.5" /> Remove
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-1 md:col-span-2 flex items-center md:justify-center">
                          <span className="md:hidden text-sm text-muted-foreground mr-2">Price:</span>
                          <span className="font-semibold text-foreground">${cartItem.price?.toFixed(2)}</span>
                        </div>

                        {/* Quantity */}
                        <div className="col-span-1 md:col-span-2 flex items-center md:justify-center">
                          <div className="flex items-center bg-muted/50 rounded-xl border border-border">
                            <button 
                              onClick={() => handleDecreaseCart(cartItem)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-zinc-800 rounded-l-xl transition-colors text-foreground"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center font-bold text-sm">
                              {cartItem.cartQuantity}
                            </span>
                            <button 
                              onClick={() => handleIncreaseCart(cartItem)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-zinc-800 rounded-r-xl transition-colors text-foreground"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Total Price */}
                        <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center">
                          <span className="md:hidden text-sm text-muted-foreground mr-2">Total:</span>
                          <span className="font-extrabold text-lg text-foreground">
                            ${(cartItem.price * cartItem.cartQuantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Bottom Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <Button variant="ghost" onClick={() => navigate("/products")} className="text-muted-foreground hover:text-foreground rounded-full h-12 px-6 w-full sm:w-auto">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
                </Button>
                <Button variant="outline" onClick={handleClearCart} className="text-muted-foreground border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive rounded-full h-12 px-6 w-full sm:w-auto transition-colors">
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-[35%]">
              <div className="bg-card rounded-3xl border border-border p-8 shadow-sm sticky top-28">
                <h2 className="text-2xl font-black mb-6 border-b border-border pb-6 text-foreground">Order Summary</h2>
                
                <div className="space-y-4 text-sm mb-6">
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="text-foreground font-semibold">${cart.cartTotalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-emerald-500 font-medium">Free Express</span>
                  </div>
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span>Estimated Tax</span>
                    <span className="text-foreground font-medium">Calculated at checkout</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-6 border-t border-border mt-6">
                    <span className="text-lg font-bold text-foreground">Total</span>
                    <span className="text-3xl font-black text-foreground">${cart.cartTotalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full h-14 text-lg font-bold rounded-2xl shadow-xl bg-violet-600 hover:bg-violet-700 hover:shadow-violet-600/20 text-white transition-all hover:-translate-y-1 mt-4">
                  Proceed to Checkout
                </Button>

                {/* Trust Badges */}
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex items-center justify-center gap-4 mb-4 text-muted-foreground">
                    <CreditCard className="w-5 h-5" />
                    <span className="text-xs font-medium uppercase tracking-wider">Secure Checkout</span>
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-center text-muted-foreground font-light">
                    Your personal information is encrypted and secure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
