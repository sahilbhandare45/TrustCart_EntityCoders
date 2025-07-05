"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Navigation from "@/components/ui/navigation";
import ProductCard from "@/components/ui/product-card";
import FeatureCards from "@/components/ui/feature-cards";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function Home() {
  const { data: categories, isLoading: categoriesLoading } = useQuery({
  queryKey: ["/api/categories"],
  queryFn: async () => {
    const res = await fetch("/api/categories");
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  },
});

const { data: productsData, isLoading: productsLoading } = useQuery({
  queryKey: ["/api/products", { limit: 8 }],
  queryFn: async ({ queryKey }) => {
    const [url, params] = queryKey;
    const search = new URLSearchParams(params).toString();
    const res = await fetch(`${url}?${search}`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  },
});


  if (categoriesLoading || productsLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <Skeleton className="h-12 w-96 mx-auto mb-4 bg-white/20" />
              <Skeleton className="h-6 w-72 mx-auto mb-8 bg-white/20" />
              <Skeleton className="h-10 w-32 mx-auto bg-white/20" />
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-xl" />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-80 w-full rounded-xl" />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <main>
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold mb-4"
              >
                AI-Powered Shopping
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl mb-8 text-purple-100"
              >
                Discover, Compare, and Buy with Confidence
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button 
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-slate-100 font-semibold"
                >
                  Shop Now
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Category Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories?.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/category/${category.slug}`}>
                  <Card className="relative overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow duration-300">
                    <div
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${category.imageUrl})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
                      <CardContent className="relative h-full flex flex-col justify-end p-8">
                        <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                        <p className="text-slate-200">{category.description}</p>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800">Featured Products</h2>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              AI Recommended
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productsData?.products?.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Feature Cards */}
        <FeatureCards />

        {/* Newsletter Section */}
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated with TrustKart</h2>
            <p className="text-xl text-purple-100 mb-8">
              Get the latest deals, product launches, and AI-powered recommendations delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button className="bg-white text-purple-600 hover:bg-slate-100 font-semibold">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
