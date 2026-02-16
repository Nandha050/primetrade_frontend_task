import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Search, Heart, Star, UserPlus, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg-color)]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[var(--primary-color)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 left-0 -ml-20 -mt-20 w-96 h-96 bg-[var(--secondary-color)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100">
              <span className="text-[var(--primary-color)] font-bold text-sm tracking-wide uppercase">#1 Recipe App</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="text-gray-500 text-sm">Join 10,000+ Chefs</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold leading-tight text-gray-900">
              Cook Like a <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-color)] to-orange-500">Master Chef</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              Discover thousands of recipes, create your own culinary masterpieces, and share your passion with a global community of food lovers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-[var(--primary-color)] text-white rounded-full font-bold text-lg hover:bg-[var(--primary-hover)] transition shadow-lg hover:shadow-xl hover:-translate-y-1">
                Start Cooking Free <ArrowRight size={20} />
              </Link>
              <Link to="/login" className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-white text-gray-700 border-2 border-gray-100 rounded-full font-bold text-lg hover:border-gray-300 transition hover:-translate-y-1">
                Login
              </Link>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} className="w-10 h-10 rounded-full border-2 border-white" src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                ))}
              </div>
              <div className="text-sm font-semibold text-gray-600">
                <div className="flex text-yellow-500">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                10k+ Happy Cooks
              </div>
            </div>
          </div>

          {/* Visuals */}
          <div className="relative z-10 hidden lg:block">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Delicious Bowl"
                className="rounded-[3rem] shadow-2xl transform -rotate-6 hover:rotate-0 transition duration-500 w-full object-cover h-[600px]"
              />

              {/* Floating Cards */}
              <div className="absolute -left-12 top-20 bg-white p-4 rounded-2xl shadow-xl animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <ChefHat size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Pro Chefs</p>
                    <p className="text-xs text-gray-500">Learn from best</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-8 bottom-40 bg-white p-4 rounded-2xl shadow-xl animate-bounce-slow animation-delay-1000">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 p-2 rounded-full text-red-600">
                    <Heart size={24} fill="currentColor" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Healthy</p>
                    <p className="text-xs text-gray-500">Nutritious meals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need to master the kitchen</h2>
            <p className="text-xl text-gray-500">Designed for both home cooks and professional chefs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Search size={32} />}
              title="Smart Search"
              desc="Find recipes by ingredients you already have in your fridge."
              color="bg-blue-50 text-blue-600"
            />
            <FeatureCard
              icon={<UserPlus size={32} />}
              title="Community"
              desc="Share your recipes and get feedback from food lovers worldwide."
              color="bg-purple-50 text-purple-600"
            />
            <FeatureCard
              icon={<Star size={32} />}
              title="Save Favorites"
              desc="Create your personal cookbook by saving your favorite recipes."
              color="bg-orange-50 text-orange-600"
            />
          </div>
        </div>
      </section>

    </div>
  );
}

function FeatureCard({ icon, title, desc, color }) {
  return (
    <div className="p-8 rounded-3xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300 group">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${color}`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-500 leading-relaxed">
        {desc}
      </p>
    </div>
  )
}
