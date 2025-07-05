"use client"; // if used in app directory

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, User, Heart, ShoppingCart, Menu, X, Bot } from "lucide-react";
import { useCartStore, useWishlistStore } from "@/lib/store";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { items: cartItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" passHref>
            <div className="flex items-center cursor-pointer">
              <Bot className="w-8 h-8 text-purple-600 mr-2" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                TrustKart
              </span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <Input
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Account</span>
            </Button>

            <Link href="/wishlist" passHref>
              <Button variant="ghost" className="relative p-2" asChild>
                <a>
                  <Heart className="w-5 h-5" />
                  {wishlistItems.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-xs">
                      {wishlistItems.length}
                    </Badge>
                  )}
                </a>
              </Button>
            </Link>

            <Link href="/cart" passHref>
              <Button variant="ghost" className="relative p-2" asChild>
                <a>
                  <ShoppingCart className="w-5 h-5" />
                  {cartItems.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-purple-600 text-xs">
                      {cartItems.length}
                    </Badge>
                  )}
                </a>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white border-t border-slate-200"
        >
          <div className="px-4 py-4 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            </form>

            <div className="flex flex-col space-y-2">
              <Button variant="ghost" className="justify-start">
                <User className="w-5 h-5 mr-2" />
                Account
              </Button>

              <Link href="/wishlist" passHref>
                <Button variant="ghost" className="justify-start w-full" asChild>
                  <a>
                    <Heart className="w-5 h-5 mr-2" />
                    Wishlist
                    {wishlistItems.length > 0 && (
                      <Badge className="ml-auto bg-red-500 text-xs">
                        {wishlistItems.length}
                      </Badge>
                    )}
                  </a>
                </Button>
              </Link>

              <Link href="/cart" passHref>
                <Button variant="ghost" className="justify-start w-full" asChild>
                  <a>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Cart
                    {cartItems.length > 0 && (
                      <Badge className="ml-auto bg-purple-600 text-xs">
                        {cartItems.length}
                      </Badge>
                    )}
                  </a>
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
