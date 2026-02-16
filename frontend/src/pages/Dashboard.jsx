import React, { useState, useContext, useEffect } from 'react';
import { recipeAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Trash2, Edit2, Plus, Search, Filter, X, Clock, Flame, Users } from 'lucide-react';
import RecipeModal from '../components/RecipeModal';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">
                Only the best recipes!
              </h1>
              <p className="text-lg text-gray-600">Welcome, {user?.name}! Discover and manage your culinary creations</p>
            </div>
            <button
              onClick={handleAddRecipe}
              className="mt-4 md:mt-0 flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition transform hover:scale-105"
            >
              <Plus size={22} />
              Create Recipe
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
            <div className="text-4xl font-bold text-red-500 mb-2">{recipes.length}</div>
            <div className="text-gray-600">Total Recipes</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
            <div className="text-4xl font-bold text-orange-500 mb-2">
              {recipes.reduce((sum, r) => sum + r.rating, 0) / (recipes.length || 1)}
            </div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
            <div className="text-4xl font-bold text-amber-500 mb-2">
              {recipes.reduce((sum, r) => sum + r.prepTime + r.cookTime, 0)}
            </div>
            <div className="text-gray-600">Total Cook Time (mins)</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-end mb-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Recipes
              </label>
              <div className="relative">
                <Search size={20} className="absolute left-4 top-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search recipes, ingredients..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-red-500 outline-none transition"
                />
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition font-semibold"
            >
              <Filter size={18} />
              Advanced Filters
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t-2 border-gray-200">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 outline-none transition"
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 outline-none transition"
                >
                  <option value="">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Cuisine</label>
                <select
                  value={cuisineType}
                  onChange={(e) => setCuisineType(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 outline-none transition"
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

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 outline-none transition"
                >
                  <option value="createdAt">Newest</option>
                  <option value="title">Title A-Z</option>
                  <option value="prepTime">Prep Time</option>
                  <option value="rating">Rating</option>
                </select>
              </div>

              <button
                onClick={clearFilters}
                className="flex items-center justify-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition font-semibold md:col-span-4"
              >
                <X size={18} />
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Recipes Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-red-200 border-t-red-500"></div>
              <p className="mt-4 text-gray-600 font-semibold">Loading delicious recipes...</p>
            </div>
          </div>
        ) : recipes.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-16 text-center">
            <div className="text-7xl mb-4">🍽️</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">No recipes yet</h3>
            <p className="text-gray-600 mb-6 text-lg">Start creating your first delicious recipe today!</p>
            <button
              onClick={handleAddRecipe}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-full hover:from-red-600 hover:to-orange-600 transition font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus size={20} />
              Create First Recipe
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                onEdit={handleEditRecipe}
                onDelete={handleDeleteRecipe}
              />
            ))}
          </div>
        )}
      </div>

      {/* Recipe Modal */}
      {isModalOpen && (
        <RecipeModal
          recipe={editingRecipe}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

function RecipeCard({ recipe, onEdit, onDelete }) {
  const getTotalTime = () => recipe.prepTime + recipe.cookTime;

  const difficultyColors = {
    'Beginner': 'bg-green-100 text-green-700 border-green-300',
    'Intermediate': 'bg-yellow-100 text-yellow-700 border-yellow-300',
    'Advanced': 'bg-red-100 text-red-700 border-red-300'
  };

  const renderStars = (rating) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative h-56 bg-gray-200 overflow-hidden">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Rating Badge - Top Right */}
        <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-2 font-bold shadow-lg flex items-center gap-1">
          <span className="text-2xl text-yellow-400">{renderStars(recipe.rating)}</span>
        </div>

        {/* Difficulty Badge - Top Left */}
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full font-bold border-2 ${difficultyColors[recipe.difficulty] || 'bg-gray-100 text-gray-700'}`}>
          {recipe.difficulty}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition">
          {recipe.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {recipe.description || 'A delicious recipe'}
        </p>

        {/* Category & Cuisine Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full border border-orange-300">
            {recipe.category}
          </span>
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-300">
            {recipe.cuisineType}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-3 mb-6 bg-gray-50 rounded-lg p-3">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock size={16} className="text-red-500" />
            </div>
            <div className="text-sm font-bold text-gray-900">{recipe.prepTime}</div>
            <div className="text-xs text-gray-600">Prep</div>
          </div>
          <div className="text-center border-l border-gray-300">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Flame size={16} className="text-orange-500" />
            </div>
            <div className="text-sm font-bold text-gray-900">{recipe.cookTime}</div>
            <div className="text-xs text-gray-600">Cook</div>
          </div>
          <div className="text-center border-l border-gray-300">
            <div className="font-bold text-sm text-gray-900">
              {getTotalTime()}
            </div>
            <div className="text-xs text-gray-600">Total</div>
          </div>
          <div className="text-center border-l border-gray-300">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users size={16} className="text-green-500" />
            </div>
            <div className="text-sm font-bold text-gray-900">{recipe.servings}</div>
            <div className="text-xs text-gray-600">Serves</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onEdit(recipe)}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 rounded-lg transition transform hover:scale-105 flex items-center justify-center gap-2 shadow-md"
          >
            <Edit2 size={18} />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            onClick={() => onDelete(recipe._id)}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-lg transition transform hover:scale-105 flex items-center justify-center gap-2 shadow-md"
          >
            <Trash2 size={18} />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
