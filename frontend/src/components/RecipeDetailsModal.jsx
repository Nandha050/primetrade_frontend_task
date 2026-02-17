import React from 'react';
import { X, Clock, Flame, Users, ChefHat, Scroll, List } from 'lucide-react';

export default function RecipeDetailsModal({ recipe, onClose }) {
    if (!recipe) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl w-full max-w-6xl mx-auto overflow-hidden shadow-2xl animate-fade-in-up max-h-[90vh] flex flex-col md:flex-row relative">

                {/* Close Button Mobile */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full md:hidden"
                >
                    <X size={20} />
                </button>

                {/* Left Side - Image & Key Stats */}
                <div className="md:w-2/5 relative h-64 md:h-auto">
                    <img
                        src={recipe.imageUrl}
                        alt={recipe.title}
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
                <div className="flex-1 overflow-y-auto bg-white p-8 relative">
                    {/* Close Button Desktop */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-20 hover:bg-gray-100 text-gray-500 p-2 rounded-full hidden md:block transition"
                    >
                        <X size={24} />
                    </button>

                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2 mt-4 md:mt-0">
                        {recipe.title}
                    </h2>

                    <div className="flex items-center gap-4 text-yellow-500 text-lg mb-6">
                        {'★'.repeat(Math.round(recipe.rating))}
                        <span className="text-gray-400 text-sm">({recipe.rating} / 5)</span>
                    </div>

                    <p className="text-gray-600 italic mb-8 border-l-4 border-primary-color pl-4">
                        "{recipe.description}"
                    </p>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="bg-orange-50 p-4 rounded-xl text-center">
                            <Clock className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                            <span className="block font-bold text-gray-800">{recipe.prepTime + recipe.cookTime} min</span>
                            <span className="text-xs text-gray-500">Total Time</span>
                        </div>
                        <div className="bg-red-50 p-4 rounded-xl text-center">
                            <Flame className="w-6 h-6 text-red-500 mx-auto mb-2" />
                            <span className="block font-bold text-gray-800">{recipe.calories}</span>
                            <span className="text-xs text-gray-500">Calories</span>
                        </div>
                        <div className="bg-green-50 p-4 rounded-xl text-center">
                            <Users className="w-6 h-6 text-green-500 mx-auto mb-2" />
                            <span className="block font-bold text-gray-800">{recipe.servings} pp</span>
                            <span className="text-xs text-gray-500">Servings</span>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Ingredients */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="bg-green-100 p-2 rounded-lg text-green-600">
                                    <List size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Ingredients</h3>
                            </div>
                            <ul className="space-y-3">
                                {(recipe.ingredients || []).map((ing, idx) => (
                                    <li key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
                                        <span className="w-2 h-2 mt-2 rounded-full bg-primary-color flex-shrink-0"></span>
                                        <span className="flex-1 text-gray-700 font-medium">{ing.item}</span>
                                        <span className="font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded text-sm whitespace-nowrap">
                                            {ing.quantity} {ing.unit}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Instructions */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                                    <Scroll size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Instructions</h3>
                            </div>
                            <div className="space-y-6 relative border-l-2 border-dashed border-gray-200 ml-3 md:ml-4 pl-8 md:pl-10 py-2">
                                {(recipe.instructions || []).map((step, idx) => (
                                    <div key={idx} className="relative group">
                                        <span className="absolute -left-[45px] top-0 w-8 h-8 rounded-full bg-white border-2 border-primary-color text-primary-color flex items-center justify-center font-bold text-sm z-10 group-hover:bg-primary-color group-hover:text-white transition-colors">
                                            {idx + 1}
                                        </span>
                                        <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                                            {step.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
