import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Search, ArrowRight, Star, Globe, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-orange-600 selection:text-white overflow-x-hidden">

      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background - Cinematic Effect */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
            alt="Culinary Masterpiece"
            className="w-full h-full object-cover opacity-60 scale-105 animate-slow-pan" // "animate-slow-pan" custom class or just slow zoom
            style={{ animation: 'zoomIn 20s infinite alternate linear' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-10" />
        </div>

        {/* Content */}
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto space-y-6 md:space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-2 md:mb-4 animate-fade-in">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-gray-200 text-[10px] md:text-xs font-bold uppercase tracking-widest">Join 10k+ Chefs</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tight leading-tight md:leading-none text-white drop-shadow-2xl">
            Taste the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 animate-gradient-x">
              Extraordinary
            </span>
          </h1>

          <div className="flex flex-col items-center gap-6">
            <p className="text-lg md:text-2xl text-gray-300 max-w-2xl font-light leading-relaxed px-4">
              Unlock a world of culinary possibilities. Share recipes, discover flavors, and connect with a global community.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4 w-full sm:w-auto px-6 sm:px-0">
              <Link
                to="/register"
                className="group relative px-8 py-4 bg-orange-600 rounded-full font-bold text-lg overflow-hidden transition-transform hover:scale-105 shadow-xl hover:shadow-orange-600/30 w-full sm:w-auto flex justify-center"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  Start Cooking Free <ArrowRight size={20} />
                </span>
              </Link>

              <Link
                to="/login"
                className="px-8 py-4 rounded-full font-bold text-lg border border-white/20 hover:bg-white/10 transition-colors backdrop-blur-sm w-full sm:w-auto flex justify-center"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features / Value Prop Grid */}
      <section className="py-32 bg-black relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Elevate Your Kitchen</h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">Everything you need to master your culinary journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureTile
              icon={<Search className="w-8 h-8 text-orange-400" />}
              title="Smart Discovery"
              desc="Find recipes based on ingredients you have. Zero waste, maximum flavor."
            />
            <FeatureTile
              icon={<Globe className="w-8 h-8 text-blue-400" />}
              title="Global Flavors"
              desc="Explore authentic dishes from cultures around the world."
            />
            <FeatureTile
              icon={<TrendingUp className="w-8 h-8 text-green-400" />}
              title="Community Trends"
              desc="See what's cooking. Follow top chefs and trending recipes."
            />
          </div>
        </div>
      </section>

      {/* Footer / CTA Simple */}
      <div className="py-24 border-t border-white/10 text-center">
        <h2 className="text-3xl font-serif font-bold mb-8">Ready to get started?</h2>
        <Link
          to="/register"
          className="inline-flex items-center gap-2 text-orange-500 font-bold hover:text-orange-400 text-xl transition-colors"
        >
          Create your free account <ArrowRight size={20} />
        </Link>
      </div>

    </div>
  );
}

function FeatureTile({ icon, title, desc }) {
  return (
    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:-translate-y-2 duration-300 group">
      <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:bg-white/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 font-serif">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-lg">
        {desc}
      </p>
    </div>
  );
}
