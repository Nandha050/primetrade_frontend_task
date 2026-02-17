import React, { useState, useEffect } from 'react';
import { recipeAPI } from '../services/api';
import toast from 'react-hot-toast';
import { X, Plus, Trash2, Info, Clock, Users, Flame } from 'lucide-react';
import { sanitizeInput } from '../utils/helpers';

export default function RecipeModal({ recipe, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Main Course',
    difficulty: 'Beginner',
    cuisineType: 'Other',
    prepTime: 30,
    cookTime: 30,
    servings: 4,
    ingredients: [{ item: '', quantity: '', unit: '' }],
    instructions: [{ stepNumber: 1, description: '' }],
    calories: '',
    rating: 4,
    imageUrl: 'https://via.placeholder.com/400x300?text=Recipe',
    dietary: 'Veg'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (recipe) {
      setFormData(recipe);
    }
  }, [recipe]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      // If value is empty string, keep it as empty string. 
      // Otherwise, check if it's a number (and not whitespace strings that cast to 0)
      [name]: value === '' ? '' : (isNaN(Number(value)) ? value : Number(value))
    }));
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setFormData(prev => ({ ...prev, ingredients: newIngredients }));
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { item: '', quantity: '', unit: '' }]
    }));
  };

  const removeIngredient = (index) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const handleInstructionChange = (index, field, value) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = { ...newInstructions[index], [field]: value };
    setFormData(prev => ({ ...prev, instructions: newInstructions }));
  };

  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, { stepNumber: prev.instructions.length + 1, description: '' }]
    }));
  };

  const removeInstruction = (index) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.prepTime || !formData.cookTime) {
      toast.error('Please fill in required fields: Title, Prep Time, Cook Time');
      return;
    }

    setLoading(true);

    // Sanitize Data
    const sanitizedData = {
      ...formData,
      title: sanitizeInput(formData.title),
      description: sanitizeInput(formData.description),
      dietary: formData.dietary || 'Veg', // Ensure dietary is included!
      ingredients: formData.ingredients.map(ing => ({
        ...ing,
        item: sanitizeInput(ing.item),
        quantity: sanitizeInput(ing.quantity),
        unit: sanitizeInput(ing.unit)
      })),
      instructions: formData.instructions.map(ins => ({
        ...ins,
        description: sanitizeInput(ins.description)
      }))
    };

    try {
      if (recipe) {
        await recipeAPI.updateRecipe(recipe._id, sanitizedData);
        toast.success('Recipe updated successfully!');
      } else {
        await recipeAPI.createRecipe(sanitizedData);
        toast.success('Recipe created successfully!');
      }
      onClose(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save recipe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 overflow-hidden">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 px-8 py-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-white">
              {recipe ? '✏️ Edit Recipe' : '➕ Add New Recipe'}
            </h2>
            <p className="text-orange-100 text-sm mt-1">
              {recipe ? 'Update your recipe details' : 'Create a delicious new recipe'}
            </p>
          </div>
          <button
            onClick={() => onClose(false)}
            className="text-white hover:bg-red-600 p-2 rounded-full transition"
          >
            <X size={28} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-200px)]">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-2 rounded-lg">
                <Info size={20} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Basic Information</h3>
            </div>

            <div className="bg-orange-50 rounded-xl border border-orange-100 p-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Recipe Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-gray-900 font-semibold"
                placeholder="e.g., Chocolate Chip Cookies"
                required
              />
            </div>

            <div className="bg-blue-50 rounded-xl border border-blue-100 p-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                placeholder="Describe your delicious recipe..."
                rows="3"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-purple-50 rounded-xl border border-purple-100 p-4">
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-900 font-medium"
                >
                  <option>Appetizer</option>
                  <option>Main Course</option>
                  <option>Dessert</option>
                  <option>Beverage</option>
                  <option>Snack</option>
                  <option>Salad</option>
                  <option>Soup</option>
                  <option>Bread</option>
                </select>
              </div>

              <div className="bg-green-50 rounded-xl border border-green-100 p-4">
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Difficulty
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-900 font-medium"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div className="bg-yellow-50 rounded-xl border border-yellow-100 p-4">
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Cuisine Type
                </label>
                <select
                  name="cuisineType"
                  value={formData.cuisineType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none text-gray-900 font-medium"
                >
                  <option>Italian</option>
                  <option>Chinese</option>
                  <option>Indian</option>
                  <option>Mexican</option>
                  <option>American</option>
                  <option>Mediterranean</option>
                  <option>Asian</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="bg-pink-50 rounded-xl border border-pink-100 p-4">
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Rating
                </label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none text-gray-900 font-medium"
                >
                  <option value="1">1 ⭐</option>
                  <option value="2">2 ⭐</option>
                  <option value="3">3 ⭐</option>
                  <option value="4">4 ⭐</option>
                  <option value="5">5 ⭐</option>
                </select>
              </div>

              <div className="bg-green-50 rounded-xl border border-green-100 p-4">
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Dietary Preference
                </label>
                <select
                  name="dietary"
                  value={formData.dietary || 'Veg'}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-900 font-medium"
                >
                  <option value="Veg">Vegetarian 🥬</option>
                  <option value="Non-Veg">Non-Vegetarian 🍗</option>
                </select>
              </div>
            </div>
          </div>

          {/* Timing & Servings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-2 rounded-lg">
                <Clock size={20} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Timing & Servings</h3>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-xl border border-blue-100 p-4">
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  ⏱️ Prep Time *
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="prepTime"
                    value={formData.prepTime}
                    onChange={handleInputChange}
                    className="flex-1 px-3 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 font-semibold"
                    min="1"
                    required
                  />
                  <span className="text-gray-600 font-bold">min</span>
                </div>
              </div>

              <div className="bg-orange-50 rounded-xl border border-orange-100 p-4">
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  🔥 Cook Time *
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="cookTime"
                    value={formData.cookTime}
                    onChange={handleInputChange}
                    className="flex-1 px-3 py-2 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-gray-900 font-semibold"
                    min="1"
                    required
                  />
                  <span className="text-gray-600 font-bold">min</span>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl border border-green-100 p-4">
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  👥 Servings
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="servings"
                    value={formData.servings}
                    onChange={handleInputChange}
                    className="flex-1 px-3 py-2 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-900 font-semibold"
                    min="1"
                  />
                  <span className="text-gray-600 font-bold">servings</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-yellow-50 rounded-xl border border-yellow-100 p-4">
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  🔥 Calories
                </label>
                <input
                  type="number"
                  name="calories"
                  value={formData.calories}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none text-gray-900 font-semibold"
                  min="0"
                />
              </div>

              <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-4">
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  🖼️ Image URL
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-900 text-xs"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-2 rounded-lg">
                  <Flame size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Ingredients</h3>
              </div>
              <button
                type="button"
                onClick={addIngredient}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full hover:from-green-600 hover:to-emerald-600 transition font-semibold"
              >
                <Plus size={18} /> Add Ingredient
              </button>
            </div>

            <div className="space-y-3">
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="bg-green-50 rounded-xl border border-green-100 p-4 flex gap-2 items-end group hover:border-green-300 transition">
                  <div className="flex-1">
                    <label className="text-xs font-bold text-gray-600 mb-1 block">Item</label>
                    <input
                      type="text"
                      placeholder="e.g., Flour"
                      value={ingredient.item}
                      onChange={(e) => handleIngredientChange(index, 'item', e.target.value)}
                      className="w-full px-3 py-2 border border-green-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500 text-gray-900 font-semibold"
                    />
                  </div>
                  <div className="w-20">
                    <label className="text-xs font-bold text-gray-600 mb-1 block">Quantity</label>
                    <input
                      type="text"
                      placeholder="2"
                      value={ingredient.quantity}
                      onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                      className="w-full px-3 py-2 border border-green-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500 text-gray-900 font-semibold"
                    />
                  </div>
                  <div className="w-24">
                    <label className="text-xs font-bold text-gray-600 mb-1 block">Unit</label>
                    <select
                      value={ingredient.unit}
                      onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                      className="w-full px-3 py-2 border border-green-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500 text-gray-900 font-semibold"
                    >
                      <option value="">Select</option>
                      <option value="cup">Cup</option>
                      <option value="tbsp">Tbsp</option>
                      <option value="tsp">Tsp</option>
                      <option value="g">g</option>
                      <option value="kg">kg</option>
                      <option value="ml">ml</option>
                      <option value="l">l</option>
                      <option value="pcs">Pcs</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-lg">
                  <Info size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Instructions</h3>
              </div>
              <button
                type="button"
                onClick={addInstruction}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition font-semibold"
              >
                <Plus size={18} /> Add Step
              </button>
            </div>

            <div className="space-y-3">
              {formData.instructions.map((instruction, index) => (
                <div key={index} className="bg-purple-50 rounded-xl border border-purple-100 p-4 flex gap-3 items-start group hover:border-purple-300 transition">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0 w-12 h-12 text-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-bold text-gray-600 mb-1 block">Step {index + 1} Instructions</label>
                    <textarea
                      placeholder="Describe this step in detail..."
                      value={instruction.description}
                      onChange={(e) => handleInstructionChange(index, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-purple-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                      rows="2"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeInstruction(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg transition flex-shrink-0"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-6 border-t-2 border-gray-200">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 hover:border-gray-400 transition font-bold text-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:from-red-600 hover:to-orange-600 transition font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? '⏳ Saving...' : recipe ? '✏️ Update Recipe' : '➕ Create Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
