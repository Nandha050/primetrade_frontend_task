import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-50 via-red-50 to-white min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <div className="text-7xl font-bold mb-2">👨‍🍳</div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4">
                Chef
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-4">
                A Recipe Book
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Discover, create, and manage your favorite recipes in one beautiful place. From quick snacks to gourmet meals, organize your culinary creations with ease.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full transition transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
                >
                  Get Started Now
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-bold py-4 px-8 rounded-full transition text-lg"
                >
                  Sign In
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-12">
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <div className="text-3xl font-bold text-red-500">1000+</div>
                  <div className="text-gray-600 font-semibold">Recipes Created</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <div className="text-3xl font-bold text-orange-500">500+</div>
                  <div className="text-gray-600 font-semibold">Active Users</div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="hidden md:block">
              <div className="text-center">
                <div className="text-9xl animate-bounce">🍝</div>
                <p className="text-gray-600 text-lg mt-4">
                  Create, Share & Enjoy!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Chef?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to manage your recipes in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Easy to Create</h3>
              <p className="text-gray-600 leading-relaxed">
                Add recipes with detailed ingredients, instructions, and nutritional information. Beautiful forms make it simple and enjoyable.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Smart Search</h3>
              <p className="text-gray-600 leading-relaxed">
                Find recipes instantly by title, ingredients, cuisine type, or difficulty level. Advanced filters help you discover exactly what you want.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="text-6xl mb-4">✏️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Full Control</h3>
              <p className="text-gray-600 leading-relaxed">
                Update and manage your recipes anytime. Delete old recipes or edit details whenever you need. Complete control at your fingertips.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="text-6xl mb-4">🔐</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Secure</h3>
              <p className="text-gray-600 leading-relaxed">
                Your recipes are private and secure. Only you can access and modify your collection with our secure authentication.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Organize</h3>
              <p className="text-gray-600 leading-relaxed">
                Sort recipes by prep time, difficulty, cuisine type, and rating. Keep your culinary collection organized and easy to navigate.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Beautiful Design</h3>
              <p className="text-gray-600 leading-relaxed">
                Enjoy a clean, modern interface that's a pleasure to use. Responsive design works perfectly on all your devices.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Cooking?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of home chefs managing their recipes beautifully
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white text-red-600 hover:bg-opacity-90 font-bold py-4 px-8 rounded-full transition transform hover:scale-105 shadow-lg text-lg"
          >
            Create Your Account
          </Link>
        </div>
      </div>
    </div>
  );
}
