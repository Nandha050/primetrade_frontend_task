import React from 'react';
import { ChefHat, Plus } from 'lucide-react';

export default function EmptyState({ onCreate }) {
    return (
        <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4 text-center animate-fade-in-up">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-orange-100 rounded-full flex items-center justify-center mb-5 sm:mb-6 animate-float">
                <ChefHat size={40} className="sm:w-12 sm:h-12 text-orange-500" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 font-serif">No recipes found</h2>
            <p className="text-gray-600 mb-7 sm:mb-8 max-w-md text-sm sm:text-base lg:text-lg">
                It looks like you haven't created any recipes yet. Start your culinary journey by adding your first masterpiece!
            </p>
            <button
                onClick={onCreate}
                className="inline-flex min-h-11 items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
                <Plus size={20} className="sm:w-6 sm:h-6" />
                Create First Recipe
            </button>
        </div>
    );
}
