"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/ui/navigation";
import ProductCard from "@/components/ui/product-card";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function CategoryPage() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");

  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
  });

  const category = useMemo(() => {
    return categories?.find((c) => c.slug === slug);
  }, [categories, slug]);

  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: [
      "/api/products",
      {
        categoryId: category?.id,
        minPrice: minPrice ? parseFloat(minPrice) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
        sortBy,
        sortOrder,
      },
    ],
    enabled: !!category,
  });

  if (!category) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-800 mb-4">
              Category not found
            </h1>
            <p className="text-slate-600 mb-8">
              The category you're looking for doesn't exist.
            </p>
            <Button onClick={() => window.history.back()}>Go Back</Button>
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
        {/* Category Header */}
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
              <p className="text-xl text-purple-100">{category.description}</p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <Label className="text-sm font-medium text-slate-700">Price Range:</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-20"
                    />
                    <span className="text-slate-500">-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-20"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Label className="text-sm font-medium text-slate-700">Sort by:</Label>
                  <Select
                    value={`${sortBy}-${sortOrder}`}
                    onValueChange={(value) => {
                      const [newSortBy, newSortOrder] = value.split("-");
                      setSortBy(newSortBy);
                      setSortOrder(newSortOrder);
                    }}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="created_at-desc">Newest First</SelectItem>
                      <SelectItem value="created_at-asc">Oldest First</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="rating-desc">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Products Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800">
              {category.name} Products
            </h2>
            {productsData && (
              <Badge variant="outline" className="text-slate-600">
                {productsData.total} products found
              </Badge>
            )}
          </div>

          {productsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-80 w-full rounded-xl" />
              ))}
            </div>
          ) : productsData?.products?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {productsData.products.map((product, index) => (
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
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">
                No products found
              </h3>
              <p className="text-slate-600 mb-8">
                Try adjusting your filters or check back later for new arrivals.
              </p>
              <Button
                onClick={() => {
                  setMinPrice("");
                  setMaxPrice("");
                  setSortBy("created_at");
                  setSortOrder("desc");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}