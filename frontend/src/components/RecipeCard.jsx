import React from 'react';
import { Clock, Flame, Users, Play, Star } from 'lucide-react';

export default function RecipeCard({ recipe, onClick, onEdit, onDelete }) {
    const getTotalTime = () => recipe.prepTime + recipe.cookTime;

    return (
        <div
            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group relative"
            onClick={() => onClick(recipe)}
        >
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700 uppercase tracking-wide">
                    {recipe.difficulty}
                </div>

                {/* Quick Actions (Edit/Delete) - Only visible on hover or if needed */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* These buttons stop propagation to prevent opening the modal when clicking edit/delete */}
                    <button
                        onClick={(e) => { e.stopPropagation(); onEdit(recipe); }}
                        className="bg-white/90 p-2 rounded-full text-blue-500 hover:text-blue-600 hover:bg-white transition shadow-sm"
                        title="Edit"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(recipe._id); }}
                        className="bg-white/90 p-2 rounded-full text-red-500 hover:text-red-600 hover:bg-white transition shadow-sm"
                        title="Delete"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-primary-color transition-colors font-serif">
                        {recipe.title}
                    </h3>
                </div>

                {/* Category Pill */}
                <div className="mb-4">
                    <span className="inline-block bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1 rounded-full">
                        {recipe.category}
                    </span>
                </div>

                {/* Stats Row */}
                <div className="flex justify-between items-center mb-6 text-gray-500 text-sm">
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-gray-900 text-lg">{recipe.prepTime + recipe.cookTime}</span>
                        <span className="text-xs">Min</span>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-gray-900 text-lg">{recipe.calories || 350}</span>
                        <span className="text-xs">Kcal</span>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="flex flex-col items-center">
                        {/* Icon for type/cuisine */}
                        <span className="font-bold text-gray-900 text-lg capitalize">{recipe.cuisineType === 'Other' ? 'Veg' : recipe.cuisineType}</span>
                        <span className="text-xs">Type</span>
                    </div>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={16}
                            className={`${i < Math.floor(recipe.rating) ? 'text-red-500 fill-red-500' : 'text-gray-300'}`}
                        />
                    ))}
                </div>

                {/* Button */}
                <button className="w-full bg-white border-2 border-primary-color text-primary-color font-bold py-3 rounded-xl hover:bg-primary-color hover:text-white transition-all duration-300 group-hover:shadow-lg flex items-center justify-center gap-2">
                    Start cooking
                </button>
            </div>
        </div>
    );
}
