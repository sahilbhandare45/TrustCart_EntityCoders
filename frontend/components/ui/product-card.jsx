"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { useToast } from "@/Hooks/use-toast";



export default function ProductCard({ product }) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { addItem } = useCartStore();
  const { addItem: addToWishlist } = useWishlistStore();
  const { toast } = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      imageUrl: product.imageUrl,
      quantity: 1,
    });

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWishlist) {
      setIsInWishlist(false);
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        imageUrl: product.imageUrl,
        slug: product.slug,
      });
      setIsInWishlist(true);
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Link href={`/product/${product.slug}`} passHref>
        <a>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
            <div className="relative">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                onClick={handleToggleWishlist}
              >
                <Heart
                  className={`w-4 h-4 ${
                    isInWishlist ? "text-red-500 fill-current" : "text-slate-600"
                  }`}
                />
              </Button>
              {product.originalPrice && (
                <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                  Save $
                  {(
                    parseFloat(product.originalPrice) - parseFloat(product.price)
                  ).toFixed(0)}
                </Badge>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 text-slate-800 line-clamp-1">
                {product.name}
              </h3>
              <div className="flex items-center mb-2">
                <div className="flex items-center text-yellow-400 text-sm">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(parseFloat(product.rating))
                          ? "fill-current"
                          : "text-slate-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-slate-600 text-sm ml-2">
                  ({product.rating})
                </span>
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-2xl font-bold text-purple-600">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </a>
      </Link>
    </motion.div>
  );
}
