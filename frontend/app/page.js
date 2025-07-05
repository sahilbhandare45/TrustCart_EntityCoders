"use client";

import { Button } from "../components/ui/button";
import useappcontext from "../Hooks/Hook";

export default function LandingPage() {
   const { handlepush } = useappcontext();
  const Feature = ({ emoji, title, description }) => (
    <div className="p-6 bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition duration-300 border border-gray-100">
      <div className="text-5xl mb-4">{emoji}</div>
      <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 to-white text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="text-center py-24 px-6 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-300 opacity-30 rounded-full blur-3xl animate-pulse"></div>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
          TrustKart
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-gray-700">
          AI-powered eCommerce platform that ensures transparency, smart comparisons, and truly trustworthy product insights.
        </p>
       <Button
      onClick={() => handlepush("/Auth/login")} // ✅ Use directly, not from router
      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 text-lg rounded-2xl shadow-xl"
    >
      Explore TrustKart
    </Button>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <Feature
            emoji="🛡️"
            title="Transparent Shopping"
            description="Verified sellers, real pricing, and honest ratings you can trust."
          />
          <Feature
            emoji="✨"
            title="AI-Powered Comparisons"
            description="Our intelligent engine compares products for you in seconds."
          />
          <Feature
            emoji="🔎"
            title="Review Validation"
            description="Spot fake reviews instantly and buy with confidence."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-indigo-100 via-white to-purple-100 text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">
          Shopping That Understands You
        </h2>
        <p className="text-md md:text-lg max-w-xl mx-auto mb-8 text-gray-600">
          TrustKart isn’t just an eCommerce site—it’s your intelligent shopping companion.
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg rounded-2xl shadow-md">
          Start Shopping
        </Button>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-6">
        © 2025 TrustKart. Built with ❤️ for trust, clarity, and next-gen commerce.
      </footer>
    </main>
  );
}