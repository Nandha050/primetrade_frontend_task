import React from 'react';
import { createPortal } from 'react-dom';
import { X, Clock, Flame, Users, ChefHat, Scroll, List } from 'lucide-react';

export default function RecipeDetailsModal({ recipe, onClose }) {
    if (!recipe) return null;

    return createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-[100] backdrop-blur-sm p-2 sm:p-4 overflow-y-auto">
            <div
                className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-6xl mx-auto overflow-hidden shadow-2xl animate-fade-in-up max-h-[95dvh] lg:max-h-[90vh] flex flex-col lg:flex-row relative"
                role="dialog"
                aria-modal="true"
                aria-label={`${recipe.title} recipe details`}
            >

                {/* Close Button Mobile */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 bg-black/20 hover:bg-black/40 text-white min-h-11 min-w-11 p-2 rounded-full md:hidden"
                    aria-label="Close recipe details"
                >
                    <X size={20} />
                </button>

                {/* Left Side - Image & Key Stats */}
                <div className="lg:w-2/5 relative h-52 sm:h-64 lg:h-auto shrink-0">
                    <img
                        src={recipe.imageUrl}
                        alt={recipe.title || 'Recipe image'}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10"></div>

                    {/* Overlay Info */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex gap-2 mb-2">
                            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase border border-white/10">
                                {recipe.category}
                            </span>
                            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase border border-white/10">
                                {recipe.difficulty}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Side - Content */}
                <div className="flex-1 overflow-y-auto bg-white p-4 sm:p-6 md:p-8 relative">
                    {/* Close Button Desktop */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 hover:bg-gray-100 text-gray-500 min-h-11 min-w-11 p-2 rounded-full hidden md:block transition"
                        aria-label="Close recipe details"
                    >
                        <X size={24} />
                    </button>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2 mt-4 md:mt-0 pr-12">
                        {recipe.title}
                    </h2>

                    <div className="flex items-center gap-4 text-yellow-500 text-lg mb-6">
                        {'★'.repeat(Math.round(recipe.rating))}
                        <span className="text-gray-400 text-sm">({recipe.rating} / 5)</span>
                    </div>

                    <p className="text-gray-600 italic mb-6 sm:mb-8 border-l-4 border-[var(--color-primary)] pl-4">
                        "{recipe.description}"
                    </p>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
                        <div className="bg-orange-50 p-2 sm:p-4 rounded-xl text-center">
                            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 mx-auto mb-1 sm:mb-2" />
                            <span className="block font-bold text-gray-800 text-sm sm:text-base">{recipe.prepTime + recipe.cookTime} min</span>
                            <span className="text-[10px] sm:text-xs text-gray-500">Total Time</span>
                        </div>
                        <div className="bg-red-50 p-2 sm:p-4 rounded-xl text-center">
                            <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 mx-auto mb-1 sm:mb-2" />
                            <span className="block font-bold text-gray-800 text-sm sm:text-base">{recipe.calories}</span>
                            <span className="text-[10px] sm:text-xs text-gray-500">Calories</span>
                        </div>
                        <div className="bg-green-50 p-2 sm:p-4 rounded-xl text-center">
                            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mx-auto mb-1 sm:mb-2" />
                            <span className="block font-bold text-gray-800 text-sm sm:text-base">{recipe.servings} pp</span>
                            <span className="text-[10px] sm:text-xs text-gray-500">Servings</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Ingredients */}
                        <div>
                            <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                <div className="bg-green-100 p-1.5 sm:p-2 rounded-lg text-green-600">
                                    <List size={18} className="sm:w-5 sm:h-5" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Ingredients</h3>
                            </div>
                            <ul className="space-y-2 sm:space-y-3">
                                {(recipe.ingredients || []).map((ing, idx) => (
                                    <li key={idx} className="flex items-start gap-3 p-2.5 sm:p-3 rounded-lg hover:bg-gray-50 transition">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 mt-2 rounded-full bg-[var(--color-primary)] flex-shrink-0"></span>
                                        <span className="flex-1 text-gray-700 font-medium text-sm sm:text-base">{ing.item}</span>
                                        <span className="font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm whitespace-nowrap">
                                            {ing.quantity} {ing.unit}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Instructions */}
                        <div>
                            <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                <div className="bg-blue-100 p-1.5 sm:p-2 rounded-lg text-blue-600">
                                    <Scroll size={18} className="sm:w-5 sm:h-5" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Instructions</h3>
                            </div>
                            <div className="space-y-4 sm:space-y-6">
                                {(recipe.instructions || []).map((step, idx) => (
                                    <div key={idx} className="flex gap-3 sm:gap-4 group">
                                        <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] flex items-center justify-center font-bold text-xs sm:text-sm group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors mt-0.5">
                                            {idx + 1}
                                        </div>
                                        <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors text-sm sm:text-base">
                                            {step.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>,
        document.body
    );
}
