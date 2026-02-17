import React from 'react';
import { Clock, Flame, Users, Edit2, Trash2, Star, Heart } from 'lucide-react';

export default function RecipeCard({ recipe, onClick, onEdit, onDelete }) {
    return (
        <div
            className="group relative min-h-[320px] sm:min-h-[400px] md:min-h-[450px] w-full rounded-2xl sm:rounded-[2rem] overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 card-hover-lift"
            onClick={() => onClick(recipe)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick(recipe);
                }
            }}
            role="button"
            tabIndex={0}
            aria-label={`View recipe ${recipe.title}`}
        >
            {/* Full Background Image */}
            <img
                src={recipe.imageUrl}
                alt={recipe.title || 'Recipe image'}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

            {/* Top Section: Badges & Actions */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                <div className="flex flex-col gap-2">
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white border border-white/10 shadow-sm w-fit">
                        {recipe.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-sm w-fit border border-white/10 ${recipe.difficulty === 'Easy' || recipe.difficulty === 'Beginner' ? 'bg-green-500/80 backdrop-blur-md' :
                        recipe.difficulty === 'Medium' || recipe.difficulty === 'Intermediate' ? 'bg-yellow-500/80 backdrop-blur-md' : 'bg-red-500/80 backdrop-blur-md'
                        }`}>
                        {recipe.difficulty}
                    </span>
                    {/* Dietary Badge */}
                    <span className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-sm w-fit border border-white/10 ${(recipe.dietary || 'Veg') === 'Non-Veg' ? 'bg-red-600/80 backdrop-blur-md' : 'bg-green-600/80 backdrop-blur-md'
                        }`}>
                        {recipe.dietary || 'Veg'}
                    </span>
                </div>

                {/* Actions - Always Visible on Mobile, Hover on Desktop */}
                <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 translate-x-2 group-hover:translate-x-0">
                    <button
                        onClick={(e) => { e.stopPropagation(); onEdit(recipe); }}
                        className="min-h-11 min-w-11 p-2 bg-white/20 backdrop-blur-md rounded-full text-blue-600 hover:bg-white hover:text-blue-600 transition-all border border-white/10"
                        title="Edit / Clone"
                        aria-label={`Edit ${recipe.title}`}
                    >
                        <Edit2 size={16} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(recipe._id); }}
                        className="min-h-11 min-w-11 p-2 bg-white/20 backdrop-blur-md rounded-full text-red-600 hover:bg-white hover:text-red-600 transition-all border border-white/10"
                        title="Delete"
                        aria-label={`Delete ${recipe.title}`}
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            {/* Bottom Section: Content & Stats */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 text-white z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                {/* Title */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold leading-tight mb-2 drop-shadow-lg hover:text-white line-clamp-2">
                    {recipe.title}
                </h3>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 mb-4 text-yellow-400">
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={14}
                                fill={star <= (recipe.rating || 4) ? "currentColor" : "none"}
                                className={star <= (recipe.rating || 4) ? "" : "text-gray-400"}
                            />
                        ))}
                    </div>
                    <span className="text-sm font-bold text-white">{recipe.rating || 4.5}</span>
                    <span className="text-xs text-gray-200 font-medium">({Math.floor(Math.random() * 100) + 10} reviews)</span>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-white/20 mb-4"></div>

                {/* Stats Row (Replacing Chef Info) */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-medium text-gray-100">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                        {/* Time */}
                        <div className="flex items-center gap-1.5" title="Total Time">
                            <Clock size={16} className="text-orange-400" />
                            <span>{recipe.prepTime + recipe.cookTime} m</span>
                        </div>

                        {/* Servings */}
                        <div className="flex items-center gap-1.5" title="Servings">
                            <Users size={16} className="text-blue-400" />
                            <span>{recipe.servings} pp</span>
                        </div>

                        {/* Calories (Optional extra) */}
                        <div className="flex items-center gap-1.5" title="Calories">
                            <Flame size={16} className="text-red-400" />
                            <span>{recipe.calories}</span>
                        </div>
                    </div>

                    {/* Like Button (Visual Only for now) */}
                    <button className="min-h-11 px-2 flex items-center gap-1.5 hover:text-red-400 transition-colors group/heart" aria-label={`Save ${recipe.title}`}>
                        <Heart size={18} className="group-hover/heart:fill-red-400 transition-colors" />
                        <span className="text-xs opacity-80">Save</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
