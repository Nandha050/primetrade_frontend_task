import React, { useState, useContext, useEffect } from 'react';
import { recipeAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Plus, Search, Filter, X } from 'lucide-react';
import RecipeModal from '../components/RecipeModal';
import RecipeDetailsModal from '../components/RecipeDetailsModal';
import RecipeCard from '../components/RecipeCard';

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
  const [sortBy, setSortBy] = useState('createdAt');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchRecipes();
  }, [search, category, difficulty, cuisineType, sortBy]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await recipeAPI.getRecipes({
        search,
        category: category || undefined,
        difficulty: difficulty || undefined,
        cuisineType: cuisineType || undefined,
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
        setRecipes(recipes.filter(r => r._id !== id));
      } catch (error) {
        toast.error('Failed to delete recipe');
      }
    }
  };

  const handleModalClose = (shouldRefresh) => {
    setIsModalOpen(false);
    setEditingRecipe(null);
    if (shouldRefresh) {
      fetchRecipes();
    }
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setDifficulty('');
    setCuisineType('');
    setSortBy('createdAt');
    setShowFilters(false);
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 font-serif">
            Only the best recipes!
          </h1>
          <p className="text-gray-500 font-medium">Today's new recipes for you</p>
        </div>
        <div className="flex gap-8 text-center mt-4 md:mt-0">
          <div>
            <span className="block text-3xl font-bold text-gray-900">{recipes.length}</span>
            <span className="text-sm text-gray-400 font-medium">Recipes</span>
          </div>
          <div>
            <span className="block text-3xl font-bold text-gray-900">12</span>
            <span className="text-sm text-gray-400 font-medium">Tutorials</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="mb-12 space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={24} />
          </div>
          <input
            type="text"
            className="w-full bg-white pl-16 pr-6 py-5 rounded-2xl shadow-sm border border-transparent focus:border-[var(--primary-color)] focus:ring-4 focus:ring-[var(--primary-color)]/10 text-gray-800 placeholder-gray-400 text-lg transition-all"
            placeholder="What do you want to cook today?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`absolute right-3 top-2 bottom-2 px-6 rounded-xl font-bold flex items-center gap-2 transition-all ${showFilters ? 'bg-[var(--primary-color)] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>

        {/* Collapsible Filters */}
        <div className={`transition-all duration-300 overflow-hidden ${showFilters ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-8">
            {/* Categories */}
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Category</label>
              <div className="flex flex-wrap gap-2">
                {['Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Snack', 'Salad', 'Soup', 'Bread'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(category === cat ? '' : cat)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${category === cat ? 'bg-[var(--secondary-color)] text-white shadow-md transform scale-105' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Difficulty */}
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Difficulty</label>
                <div className="flex flex-wrap gap-2">
                  {['Beginner', 'Intermediate', 'Advanced'].map(diff => (
                    <button
                      key={diff}
                      onClick={() => setDifficulty(difficulty === diff ? '' : diff)}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${difficulty === diff ? 'bg-orange-400 text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
              {/* Cuisine */}
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Cuisine</label>
                <div className="flex flex-wrap gap-2">
                  {['Italian', 'Chinese', 'Indian', 'Mexican', 'American'].map(type => (
                    <button
                      key={type}
                      onClick={() => setCuisineType(cuisineType === type ? '' : type)}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${cuisineType === type ? 'bg-blue-400 text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-50">
              <button
                onClick={clearFilters}
                className="text-red-500 font-bold hover:underline"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button for Create Recipe (if we want to stick to a button on screen always) or Keep existing button? Design has "Start cooking" on cards. Let's keep a prominent Create button somewhere. The header is clean. Maybe a FAB or a card in the grid? Let's use a nice button in the layout or header. I'll add a card that acts as "Create New" or just a button.
      The previous dashboard had a Create button. I'll put it next to search or as a special card.
      Let's use a special "Action Card" that encourages users to create, similar to the "Mentorship program" card in the design.
       */}

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Create New Card (mimicking the "Mentorship program" card style but for creating) */}
        <div
          onClick={handleAddRecipe}
          className="bg-[#4ADE80] rounded-3xl p-8 flex flex-col justify-between text-white cursor-pointer hover:shadow-xl transition-shadow group relative overflow-hidden h-[420px]"
        >
          <div className="relative z-10">
            <div className="bg-white/20 w-fit px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wide">
              New Recipe
            </div>
            <h3 className="text-3xl font-serif font-bold mb-2">Share your <br />creation</h3>
            <p className="opacity-90 leading-relaxed text-sm">
              Got a new culinary masterpiece? Add it to your collection and share it with the world.
            </p>
          </div>
          <div className="relative z-10 mt-auto">
            <button className="bg-white text-green-600 px-6 py-3 rounded-xl font-bold shadow-sm group-hover:scale-105 transition-transform">
              Create Now
            </button>
          </div>

          {/* Decorative Chef Illustration Placeholder */}
          <div className="absolute -bottom-4 -right-4 opacity-50 transform rotate-12 scale-150">
            <svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="white" fillOpacity="0.2" />
            </svg>
          </div>
        </div>

        {loading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-3xl h-[420px] animate-pulse"></div>
          ))
        ) : (
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              onClick={() => setViewingRecipe(recipe)}
              onEdit={handleEditRecipe}
              onDelete={handleDeleteRecipe}
            />
          ))
        )}
      </div>

      {isModalOpen && (
        <RecipeModal
          recipe={editingRecipe}
          onClose={handleModalClose}
        />
      )}

      {viewingRecipe && (
        <RecipeDetailsModal
          recipe={viewingRecipe}
          onClose={() => setViewingRecipe(null)}
        />
      )}
    </div>
  );
}
