"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "wouter";
import { useState } from "react";
import Navigation from "@/components/navigation";
import { useToast } from "@/Hooks/use-toast";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useCartStore } from "@/lib/store";

export default function Product() {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { addItem } = useCartStore();

  const { data: productsData } = useQuery({
    queryKey: ["/api/products", { search: slug }],
  });

  const product = productsData?.products?.find((p) => p.slug === slug);

  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: [`/api/products/${product?.id}/reviews`],
    enabled: !!product,
  });

  const addToCartMutation = useMutation({
    mutationFn: (data) => apiRequest("POST", "/api/cart", data),
    onSuccess: () => {
      addItem({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        imageUrl: product.imageUrl,
        quantity,
      });
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const addToWishlistMutation = useMutation({
    mutationFn: (data) => apiRequest("POST", "/api/wishlist", data),
    onSuccess: () => {
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const addReviewMutation = useMutation({
    mutationFn: (data) => apiRequest("POST", "/api/reviews", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/products/${product?.id}/reviews`] });
      setReviewComment("");
      setReviewRating(5);
      toast({
        title: "Review Added",
        description: "Your review has been added successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleAddToCart = () => {
    addToCartMutation.mutate({ userId: 1, productId: product.id, quantity });
  };

  const handleAddToWishlist = () => {
    addToWishlistMutation.mutate({ userId: 1, productId: product.id });
  };

  const handleAddReview = () => {
    if (!reviewComment.trim()) return;
    addReviewMutation.mutate({
      userId: 1,
      productId: product.id,
      rating: reviewRating,
      comment: reviewComment,
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-800 mb-4">Product not found</h1>
            <p className="text-slate-600 mb-8">The product you're looking for doesn't exist.</p>
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const productImages = product.images || [product.imageUrl];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product display logic */}
        {/* Review section */}
      </main>
      <Footer />
    </div>
  );
}
