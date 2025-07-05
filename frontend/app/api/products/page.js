"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/Hooks/use-toast";
import { useCartStore } from "@/lib/store";

export default function Product() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;
  const [quantity, setQuantity] = useState(1);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const { toast } = useToast();
  const { addItem } = useCartStore();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products?search=${slug}`);
        const data = await res.json();
        const found = data.products?.find((p) => p.slug === slug);
        setProduct(found);
        if (found) {
          const revRes = await fetch(`/api/products/${found.id}/reviews`);
          const revData = await revRes.json();
          setReviews(revData);
        }
      } catch (err) {
        console.error("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  const handleAddToCart = async () => {
    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: 1, productId: product.id, quantity }),
      });
      addItem({ id: product.id, name: product.name, price: parseFloat(product.price), imageUrl: product.imageUrl, quantity });
      toast({ title: "Added to Cart", description: `${product.name} has been added to your cart.` });
    } catch (err) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleAddToWishlist = async () => {
    try {
      await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: 1, productId: product.id }),
      });
      toast({ title: "Added to Wishlist", description: `${product.name} has been added to your wishlist.` });
    } catch (err) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleAddReview = async () => {
    if (!reviewComment.trim()) return;
    try {
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: 1, productId: product.id, rating: reviewRating, comment: reviewComment }),
      });
      setReviewComment("");
      setReviewRating(5);
      const res = await fetch(`/api/products/${product.id}/reviews`);
      const data = await res.json();
      setReviews(data);
      toast({ title: "Review Added", description: "Your review has been added successfully." });
    } catch (err) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-800 mb-4">Product not found</h1>
            <p className="text-slate-600 mb-8">The product you're looking for doesn't exist.</p>
            <Button onClick={() => router.back()}>Go Back</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const productImages = product.images || [product.imageUrl];

  // render full layout with product details and reviews
  return <div className="bg-white min-h-screen">{/* render like previous code */}</div>;
}
