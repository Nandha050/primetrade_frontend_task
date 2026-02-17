import React, { useState, useContext, useEffect } from 'react';
import { recipeAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Search, Filter } from 'lucide-react';
import RecipeModal from '../components/RecipeModal';
import RecipeDetailsModal from '../components/RecipeDetailsModal';
import RecipeCard from '../components/RecipeCard';
import EmptyState from '../components/EmptyState';
import Skeleton from '../components/Skeleton';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingRecipe, setViewingRecipe] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);

  // Filter and search states
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [dietary, setDietary] = useState(''); // New State for Veg/Non-Veg
  const [sortBy, setSortBy] = useState('createdAt');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchRecipes();
  }, [search, category, difficulty, cuisineType, dietary, sortBy]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await recipeAPI.getRecipes({
        search,
        category: category || undefined,
        difficulty: difficulty || undefined,
        cuisineType: cuisineType || undefined,
        dietary: dietary || undefined, // Pass dietary to API
        sortBy: sortBy || undefined
      });
      setRecipes(response.data.recipes || []);
    } catch (error) {
      toast.error('Failed to fetch recipes');
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecipe = () => {
    setEditingRecipe(null);
    setIsModalOpen(true);
  };

  const handleEditRecipe = (recipe) => {
    setEditingRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleDeleteRecipe = async (id) => {
    if (confirm('Are you sure you want to delete this recipe?')) {
      try {
        await recipeAPI.deleteRecipe(id);
        toast.success('Recipe deleted successfully');
        fetchRecipes();
      } catch (error) {
        toast.error('Failed to delete recipe');
      }
    }
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setDifficulty('');
    setCuisineType('');
    setDietary('');
    setSortBy('createdAt');
  };

  return (
    <div className="min-h-dvh relative z-0">
      {/* Background Image */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url('https://plus.unsplash.com/premium_photo-1728412897842-06f0fc4c2ec6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D')`,
          height: '100%',
          width: '100%',
          backgroundSize: 'cover', // Or 'contain' if preferred, but cover is standard for backgrounds
          backgroundPosition: 'right center', // Align to right as requested
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Gradient Overlays - Adjusted for better visibility with full opacity image */}
      <div
        className="absolute inset-0 -z-10 hidden lg:block"
        style={{
          background: 'linear-gradient(to right, var(--color-background) 0%, var(--color-background) 10%, transparent 100%)', // Fade from solid background on left to transparent on right
        }}
      />
      <div className="relative px-4 py-5 sm:px-6 sm:py-6 lg:px-6 lg:py-8 w-full">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8 lg:mb-12 animate-fade-in-up">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] font-serif mb-2 sm:mb-3 leading-tight">
            Only the best recipes!
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-[var(--color-text-secondary)] font-medium">Today's new recipes for you</p>
        </div>

        {/* Search & Filter Section */}
        <div className="mb-6 sm:mb-8 lg:mb-12 space-y-4 sm:space-y-6 animate-fade-in-up animation-delay-150">
          {/* Search Bar */}
          <div className="relative w-full max-w-3xl">
            <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 md:pl-6 flex items-center pointer-events-none">
              <Search className="text-gray-500" size={20} />
            </div>
            <input
              type="text"
              className="w-full glass-strong pl-12 sm:pl-14 md:pl-16 pr-20 sm:pr-24 md:pr-32 py-3.5 sm:py-4 md:py-5 rounded-2xl shadow-lg border border-white/30 focus:border-black focus:ring-4 focus:ring-black/20 text-gray-800 placeholder-gray-500 text-sm sm:text-base md:text-lg transition-all hover:shadow-xl"
              placeholder="Search recipes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search recipes"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`absolute right-2 sm:right-3 top-1.5 sm:top-2 bottom-1.5 sm:bottom-2 min-w-11 px-3 sm:px-4 md:px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 ${showFilters ? 'bg-gradient-to-r from-[var(--color-primary)] to-orange-500 text-white shadow-md' : 'bg-white/90 text-gray-700 hover:bg-white shadow-sm'}`}
              aria-expanded={showFilters}
              aria-controls="recipe-filters"
              aria-label="Toggle filters"
            >
              <Filter size={18} />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* Collapsible Filters */}
          <div id="recipe-filters" className={`transition-all duration-500 overflow-hidden ${showFilters ? 'max-h-[1000px] opacity-100 animate-scale-in' : 'max-h-0 opacity-0'}`}>
            <div className="glass-strong p-4 sm:p-5 md:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-white/30 space-y-5 sm:space-y-6 md:space-y-8">
              {/* Categories */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Category</label>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {['Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Snack', 'Salad', 'Soup', 'Bread'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategory(category === cat ? '' : cat)}
                      className={`min-h-10 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all active:scale-95 ${category === cat
                        ? 'bg-[var(--color-secondary)] text-white shadow-md hover:bg-[var(--color-secondary-hover)]'
                        : 'bg-gray-100 text-[var(--color-text-primary)] hover:bg-gray-200 border border-gray-200'
                        }`}
                      aria-pressed={category === cat}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
                {/* Difficulty */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Difficulty</label>
                  <div className="flex flex-wrap gap-2">
                    {['Beginner', 'Intermediate', 'Advanced'].map(diff => (
                      <button
                        key={diff}
                        onClick={() => setDifficulty(difficulty === diff ? '' : diff)}
                        className={`min-h-10 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all active:scale-95 ${difficulty === diff
                          ? 'bg-[var(--color-warning)] text-white shadow-md hover:opacity-90'
                          : 'bg-gray-100 text-[var(--color-text-primary)] hover:bg-gray-200 border border-gray-200'
                          }`}
                        aria-pressed={difficulty === diff}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Cuisine */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Cuisine</label>
                  <div className="flex flex-wrap gap-2">
                    {['Italian', 'Chinese', 'Indian', 'Mexican', 'American'].map(type => (
                      <button
                        key={type}
                        onClick={() => setCuisineType(cuisineType === type ? '' : type)}
                        className={`min-h-10 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all active:scale-95 ${cuisineType === type
                          ? 'bg-[var(--color-info)] text-white shadow-md hover:opacity-90'
                          : 'bg-gray-100 text-[var(--color-text-primary)] hover:bg-gray-200 border border-gray-200'
                          }`}
                        aria-pressed={cuisineType === type}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Dietary Filter (Veg/Non-Veg) */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Dietary</label>
                  <div className="flex flex-wrap gap-2">
                    {['Veg', 'Non-Veg'].map(type => (
                      <button
                        key={type}
                        onClick={() => setDietary(dietary === type ? '' : type)}
                        className={`min-h-10 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all active:scale-95 ${dietary === type
                          ? 'bg-green-500 text-white shadow-md hover:opacity-90'
                          : 'bg-gray-100 text-[var(--color-text-primary)] hover:bg-gray-200 border border-gray-200'
                          }`}
                        aria-pressed={dietary === type}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button
                  onClick={clearFilters}
                  className="min-h-11 px-2 text-[var(--color-danger)] font-bold hover:text-[var(--color-danger)] hover:underline transition-colors active:scale-95"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 animate-fade-in-up animation-delay-300">
          {/* Create New Card */}
          <div
            onClick={handleAddRecipe}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleAddRecipe();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Create new recipe"
            className="bg-gradient-to-br from-[#F77F00] to-[#F77F00] rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 flex flex-col justify-between text-white cursor-pointer hover:shadow-2xl transition-all duration-300 group relative overflow-hidden min-h-[260px] sm:min-h-[320px] md:min-h-[390px] card-hover-lift hover-glow"
          >
            <div className="relative z-10">
              <div className="bg-white/20 w-fit px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold mb-3 sm:mb-4 uppercase tracking-wide border-2 border-white">
                New Recipe
              </div>
              <h3 className="text-2xl sm:text-3xl text-black font-serif font-bold mb-2 leading-tight">Share your <br />creation</h3>
              <p className="opacity-90 leading-relaxed text-sm sm:text-base text-black max-w-xs">
                Got a new culinary masterpiece? Add it to your collection and share it with the world.
              </p>
            </div>
            <div className="relative z-10 mt-4 sm:mt-auto">
              <span className="inline-flex min-h-11 items-center bg-white text-black px-5 sm:px-6 py-3 rounded-xl font-bold shadow-sm group-hover:scale-105 hover:bg-black hover:text-white transition-transform">
                Create Now
              </span>
            </div>

            {/* Decorative Chef Illustration Placeholder */}
            <div className="absolute -bottom-4 -right-4 opacity-50 transform rotate-12 scale-150">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="80" fill="currentColor" fillOpacity="0.2" />
                <path d="M100 40C66.8629 40 40 66.8629 40 100C40 133.137 66.8629 160 100 160C133.137 160 160 133.137 160 100C160 66.8629 133.137 40 100 40Z" stroke="white" strokeWidth="4" />
              </svg>
            </div>
          </div>

          {loading ? (
            // Skeleton Loader
            [1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="min-h-[320px] sm:min-h-[400px] md:min-h-[450px] rounded-2xl sm:rounded-3xl overflow-hidden glass border border-white/30">
                <Skeleton height={200} className="rounded-t-3xl" />
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <Skeleton height={30} width="80%" />
                  <Skeleton count={2} />
                  <div className="flex justify-between pt-4">
                    <Skeleton width={60} height={20} />
                    <Skeleton width={60} height={20} />
                  </div>
                </div>
              </div>
            ))
          ) : recipes.filter(r => {
            // Client-side fallback filtering
            if (!dietary) return true;
            return (r.dietary || 'Veg') === dietary;
          }).length === 0 ? (
            <div className="col-span-full">
              <EmptyState onCreate={handleAddRecipe} />
            </div>
          ) : (
            recipes
              .filter(r => {
                // Client-side fallback filtering to ensure accuracy
                if (!dietary) return true;
                return (r.dietary || 'Veg') === dietary;
              })
              .map((recipe) => (
                <RecipeCard
                  key={recipe._id}
                  recipe={recipe}
                  onClick={setViewingRecipe}
                  onEdit={handleEditRecipe}
                  onDelete={handleDeleteRecipe}
                />
              ))
          )}
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && (
        <RecipeModal
          isOpen={isModalOpen}
          onClose={(shouldRefresh) => {
            setIsModalOpen(false);
            if (shouldRefresh === true) {
              fetchRecipes();
            }
          }}
          initialData={editingRecipe}
        />
      )}

      {viewingRecipe && (
        <RecipeDetailsModal
          recipe={viewingRecipe}
          isOpen={!!viewingRecipe}
          onClose={() => setViewingRecipe(null)}
        />
      )}
    </div>
  );
}
