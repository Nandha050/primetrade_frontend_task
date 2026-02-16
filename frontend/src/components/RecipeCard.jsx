import React from 'react';
import { Clock, Flame, Users, Edit2, Trash2, Star, ChefHat } from 'lucide-react';

export default function RecipeCard({ recipe, onClick, onEdit, onDelete }) {
    const isOwner = true; // Replace with actual ownership check

    return (
        <div
            className="group bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer relative border border-gray-100 hover:-translate-y-2 h-full flex flex-col"
            onClick={onClick}
        >
            {/* Image Container */}
            <div className="relative h-64 md:h-72 overflow-hidden">
                <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-gray-800 shadow-sm">
                        {recipe.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-sm ${recipe.difficulty === 'Easy' || recipe.difficulty === 'Beginner' ? 'bg-green-500' :
                            recipe.difficulty === 'Medium' || recipe.difficulty === 'Intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}>
                        {recipe.difficulty}
                    </span>
                </div>

                {/* Action Buttons */}
                {isOwner && (
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                            onClick={(e) => { e.stopPropagation(); onEdit(recipe); }}
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-blue-600 hover:bg-blue-50 transition shadow-md"
                            title="Edit"
                        >
                            <Edit2 size={16} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onDelete(recipe._id); }}
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-600 hover:bg-red-50 transition shadow-md"
                            title="Delete"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                )}

                {/* Bottom Info on Image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-1 mb-1 text-yellow-400">
                        <Star size={16} fill="currentColor" />
                        <span className="font-bold">{recipe.rating || 4.5}</span>
                        <span className="text-gray-300 text-xs">({Math.floor(Math.random() * 50) + 10} reviews)</span>
                    </div>
                    <h3 className="text-2xl font-bold font-serif leading-tight mb-1 drop-shadow-md group-hover:text-[var(--secondary-color)] transition-colors">
                        {recipe.title}
                    </h3>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-gray-500 line-clamp-2 text-sm mb-6 leading-relaxed">
                    {recipe.description || "A delicious recipe waiting for you to try. Packed with flavors and easy to make."}
                </p>

                <div>
                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-4 mb-6">
                        <div className="text-center group-hover:bg-orange-50 rounded-lg p-1 transition-colors">
                            <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
                                <Clock size={14} />
                            </div>
                            <span className="block font-bold text-gray-700 text-sm">{recipe.prepTime + recipe.cookTime}m</span>
                        </div>
                        <div className="text-center group-hover:bg-red-50 rounded-lg p-1 transition-colors">
                            <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
                                <Flame size={14} />
                            </div>
                            <span className="block font-bold text-gray-700 text-sm">{recipe.calories}</span>
                        </div>
                        <div className="text-center group-hover:bg-blue-50 rounded-lg p-1 transition-colors">
                            <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
                                <Users size={14} />
                            </div>
                            <span className="block font-bold text-gray-700 text-sm">{recipe.servings}pp</span>
                        </div>
                    </div>

                    <button className="w-full py-3 rounded-xl bg-gray-50 text-gray-800 font-bold group-hover:bg-[var(--primary-color)] group-hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                        <ChefHat size={18} />
                        Start Cooking
                    </button>
                </div>
            </div>
        </div>
    );
}
