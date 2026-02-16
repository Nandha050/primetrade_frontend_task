import React, { useState, useContext, useEffect } from 'react';
import { recipeAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Trash2, Edit2, Plus, Search, Filter, X } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Recipes</h1>
          <p className="text-gray-600">Welcome back, {user?.name}! Manage your favorite recipes.</p>
        </div>

        {/* Add Recipe Button */}
        <div className="mb-6">
          <button
            onClick={handleAddRecipe}
            className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition font-semibold"
          >
            <Plus size={20} />
            Add New Recipe
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Recipes
              </label>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title or ingredients..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
            >
              <Filter size={18} />
              Filters
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cuisine Type
                </label>
                <select
                  value={cuisineType}
                  onChange={(e) => setCuisineType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="">All Cuisines</option>
                  <option value="Italian">Italian</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Indian">Indian</option>
                  <option value="Mexican">Mexican</option>
                  <option value="American">American</option>
                  <option value="Mediterranean">Mediterranean</option>
                  <option value="Asian">Asian</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="createdAt">Newest</option>
                  <option value="title">Title A-Z</option>
                  <option value="prepTime">Prep Time</option>
                  <option value="rating">Rating</option>
                </select>
              </div>

              <button
                onClick={clearFilters}
                className="flex items-center gap-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition md:col-span-4"
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
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600">Loading recipes...</p>
            </div>
          </div>
        ) : recipes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No recipes yet</h3>
            <p className="text-gray-600 mb-4">Create your first recipe to get started!</p>
            <button
              onClick={handleAddRecipe}
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition font-semibold"
            >
              <Plus size={20} />
              Add Recipe
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="h-48 bg-gray-200 overflow-hidden">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover hover:scale-105 transition"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 flex-1">{recipe.title}</h3>
          <span className="text-2xl">{recipe.rating}⭐</span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs bg-primary text-white px-2 py-1 rounded">
            {recipe.category}
          </span>
          <span className="text-xs bg-secondary text-white px-2 py-1 rounded">
            {recipe.difficulty}
          </span>
          <span className="text-xs bg-accent text-white px-2 py-1 rounded">
            {recipe.cuisineType}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center mb-4 text-sm">
          <div className="bg-gray-100 p-2 rounded">
            <div className="font-semibold">{recipe.prepTime}</div>
            <div className="text-gray-600 text-xs">Prep</div>
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <div className="font-semibold">{recipe.cookTime}</div>
            <div className="text-gray-600 text-xs">Cook</div>
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <div className="font-semibold">{getTotalTime()}</div>
            <div className="text-gray-600 text-xs">Total</div>
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <div className="font-semibold">{recipe.servings}</div>
            <div className="text-gray-600 text-xs">Serves</div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(recipe)}
            className="flex-1 flex items-center justify-center gap-2 bg-secondary text-white py-2 rounded-lg hover:bg-opacity-90 transition"
          >
            <Edit2 size={16} />
            Edit
          </button>
          <button
            onClick={() => onDelete(recipe._id)}
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
