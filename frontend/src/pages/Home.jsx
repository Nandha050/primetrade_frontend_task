import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="text-7xl mb-4">👨‍🍳</div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to Chef</h1>
          <p className="text-xl text-gray-600 mb-8">A Recipe Book - Manage your favorite recipes</p>
          <Link
            to="/login"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            Get Started
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold mb-2">Add Recipes</h3>
            <p className="text-gray-600">Create and save your favorite recipes in one place</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">Search & Filter</h3>
            <p className="text-gray-600">Find recipes by category, difficulty, or cuisine type</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">✏️</div>
            <h3 className="text-xl font-bold mb-2">Edit & Delete</h3>
            <p className="text-gray-600">Manage your recipes with full CRUD operations</p>
          </div>
        </div>
      </div>
    </div>
  );
}
