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

      {/* Search Bar - styled like the design (top left usually, but we have it here for now) */}
      <div className="relative mb-8 max-w-xl">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          className="w-full bg-white pl-12 pr-4 py-4 rounded-full shadow-sm border-none outline-none focus:ring-2 focus:ring-primary-color/20 text-gray-600 placeholder-gray-400"
          placeholder="Enter your search request..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition text-gray-600"
        >
          <Filter size={18} />
        </button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-color"
            >
              <option value="">All Categories</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Main Course">Main Course</option>
              <option value="Dessert">Dessert</option>
              <option value="Beverage">Beverage</option>
              <option value="Snack">Snack</option>
              <option value="Salad">Salad</option>
              <option value="Soup">Soup</option>
              <option value="Bread">Bread</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-color"
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Cuisine</label>
            <select
              value={cuisineType}
              onChange={(e) => setCuisineType(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-color"
            >
              <option value="">All Cuisines</option>
              <option value="Italian">Italian</option>
              <option value="Chinese">Chinese</option>
              <option value="Indian">Indian</option>
              <option value="Mexican">Mexican</option>
              <option value="American">American</option>
              <option value="Mediterranean">Mediterranean</option>
              <option value="Asian">Asian</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="w-full py-2 text-red-500 font-bold text-sm bg-red-50 rounded-lg hover:bg-red-100 transition"
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button for Create Recipe (if we want to stick to a button on screen always) or Keep existing button? Design has "Start cooking" on cards. Let's keep a prominent Create button somewhere. The header is clean. Maybe a FAB or a card in the grid? Let's use a nice button in the layout or header. I'll add a card that acts as "Create New" or just a button.
      The previous dashboard had a Create button. I'll put it next to search or as a special card.
      Let's use a special "Action Card" that encourages users to create, similar to the "Mentorship program" card in the design.
       */}

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
