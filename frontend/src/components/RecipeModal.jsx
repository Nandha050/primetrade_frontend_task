import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { recipeAPI } from '../services/api';
import toast from 'react-hot-toast';
import { X, Plus, Trash2, Info, Clock, Flame } from 'lucide-react';
import { sanitizeInput, fileToDataUrl } from '../utils/helpers';

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
  const [imageFile, setImageFile] = useState(null);

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

  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      toast.error('Image size should be 3MB or less');
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      setFormData(prev => ({ ...prev, imageUrl: dataUrl }));
      setImageFile(file);
      toast.success('Recipe image selected');
    } catch (error) {
      toast.error('Failed to process image');
    }
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

    const requestData = imageFile ? (() => {
      const data = new FormData();
      data.append('title', sanitizedData.title);
      data.append('description', sanitizedData.description || '');
      data.append('category', sanitizedData.category);
      data.append('difficulty', sanitizedData.difficulty);
      data.append('cuisineType', sanitizedData.cuisineType);
      data.append('prepTime', String(sanitizedData.prepTime));
      data.append('cookTime', String(sanitizedData.cookTime));
      data.append('servings', String(sanitizedData.servings));
      data.append('calories', sanitizedData.calories === '' ? '' : String(sanitizedData.calories));
      data.append('rating', String(sanitizedData.rating));
      data.append('dietary', sanitizedData.dietary || 'Veg');
      data.append('ingredients', JSON.stringify(sanitizedData.ingredients || []));
      data.append('instructions', JSON.stringify(sanitizedData.instructions || []));
      data.append('recipeImage', imageFile);
      return data;
    })() : sanitizedData;

    try {
      if (recipe) {
        await recipeAPI.updateRecipe(recipe._id, requestData);
        toast.success('Recipe updated successfully!');
      } else {
        await recipeAPI.createRecipe(requestData);
        toast.success('Recipe created successfully!');
      }
      onClose(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save recipe');
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-[200] p-2 sm:p-4 overflow-y-auto">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95dvh] sm:max-h-[92dvh] my-0 sm:my-6 overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label={recipe ? 'Edit recipe' : 'Create recipe'}
      >
        {/* Header with Gradient */}
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 flex justify-between items-start gap-3 shrink-0">
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              {recipe ? '✏️ Edit Recipe' : '➕ Add New Recipe'}
            </h2>
            <p className="text-orange-100 text-xs sm:text-sm mt-1">
              {recipe ? 'Update your recipe details' : 'Create a delicious new recipe'}
            </p>
          </div>
          <button
            onClick={() => onClose(false)}
            className="text-white hover:bg-red-600 min-h-11 min-w-11 p-2 rounded-full transition shrink-0"
            aria-label="Close recipe form"
          >
            <X size={24} className="sm:w-7 sm:h-7" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 overflow-y-auto min-h-0">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2 sm:mb-4">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-1.5 sm:p-2 rounded-lg">
                <Info size={16} className="sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Basic Information</h3>
            </div>

            <div className="bg-orange-50 rounded-xl border border-orange-100 p-3 sm:p-4">
              <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-1.5 sm:mb-2">
                Recipe Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-gray-900 font-semibold text-sm sm:text-base"
                placeholder="e.g., Chocolate Chip Cookies"
                required
              />
            </div>

            <div className="bg-blue-50 rounded-xl border border-blue-100 p-3 sm:p-4">
              <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-1.5 sm:mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 text-sm sm:text-base"
                placeholder="Describe your delicious recipe..."
                rows="3"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-purple-50 rounded-xl border border-purple-100 p-3 sm:p-4">
                <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-1.5 sm:mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-900 font-medium text-sm sm:text-base"
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

              <div className="bg-green-50 rounded-xl border border-green-100 p-3 sm:p-4">
                <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-1.5 sm:mb-2">
                  Difficulty
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-900 font-medium text-sm sm:text-base"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div className="bg-yellow-50 rounded-xl border border-yellow-100 p-3 sm:p-4">
                <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-1.5 sm:mb-2">
                  Cuisine Type
                </label>
                <select
                  name="cuisineType"
                  value={formData.cuisineType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none text-gray-900 font-medium text-sm sm:text-base"
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

              <div className="bg-pink-50 rounded-xl border border-pink-100 p-3 sm:p-4">
                <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-1.5 sm:mb-2">
                  Rating
                </label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none text-gray-900 font-medium text-sm sm:text-base"
                >
                  <option value="1">1 ⭐</option>
                  <option value="2">2 ⭐</option>
                  <option value="3">3 ⭐</option>
                  <option value="4">4 ⭐</option>
                  <option value="5">5 ⭐</option>
                </select>
              </div>

              <div className="bg-green-50 rounded-xl border border-green-100 p-3 sm:p-4 lg:col-span-full">
                <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-1.5 sm:mb-2">
                  Dietary Preference
                </label>
                <select
                  name="dietary"
                  value={formData.dietary || 'Veg'}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-900 font-medium text-sm sm:text-base"
                >
                  <option value="Veg">Vegetarian 🥬</option>
                  <option value="Non-Veg">Non-Vegetarian 🍗</option>
                </select>
              </div>
            </div>
          </div>

          {/* Timing & Servings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2 sm:mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-1.5 sm:p-2 rounded-lg">
                <Clock size={16} className="sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Timing & Servings</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-blue-50 rounded-xl border border-blue-100 p-3 sm:p-4">
                <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-1.5 sm:mb-2">
                  ⏱️ Prep Time *
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="prepTime"
                    value={formData.prepTime}
                    onChange={handleInputChange}
                    className="flex-1 min-w-0 px-3 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 font-semibold text-sm sm:text-base"
                    min="1"
                    required
                  />
                  <span className="text-gray-600 font-bold text-sm whitespace-nowrap">min</span>
                </div>
              </div>

              <div className="bg-orange-50 rounded-xl border border-orange-100 p-3 sm:p-4">
                <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-1.5 sm:mb-2">
                  🔥 Cook Time *
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="cookTime"
                    value={formData.cookTime}
                    onChange={handleInputChange}
                    className="flex-1 min-w-0 px-3 py-2 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-gray-900 font-semibold text-sm sm:text-base"
                    min="1"
                    required
                  />
                  <span className="text-gray-600 font-bold text-sm whitespace-nowrap">min</span>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl border border-green-100 p-3 sm:p-4">
                <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-1.5 sm:mb-2">
                  👥 Servings
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="servings"
                    value={formData.servings}
                    onChange={handleInputChange}
                    className="flex-1 min-w-0 px-3 py-2 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-900 font-semibold text-sm sm:text-base"
                    min="1"
                  />
                  <span className="text-gray-600 font-bold text-sm whitespace-nowrap">ppl</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-yellow-50 rounded-xl border border-yellow-100 p-3 sm:p-4">
                <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-1.5 sm:mb-2">
                  🔥 Calories
                </label>
                <input
                  type="number"
                  name="calories"
                  value={formData.calories}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none text-gray-900 font-semibold text-sm sm:text-base"
                  min="0"
                />
              </div>

              <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-3 sm:p-4">
                <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-1.5 sm:mb-2">
                  🖼️ Image URL
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-900 text-xs sm:text-sm"
                  placeholder="https://example.com/image.jpg"
                />
                <label className="mt-3 block text-xs sm:text-sm font-bold text-gray-800 mb-1.5 sm:mb-2">
                  Upload from device
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="w-full text-xs sm:text-sm text-gray-700 file:mr-3 file:py-2 file:px-3 file:border-0 file:rounded-lg file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
                />
                {formData.imageUrl && (
                  <img
                    src={formData.imageUrl}
                    alt="Recipe preview"
                    className="mt-3 w-full h-24 sm:h-28 object-cover rounded-lg border border-indigo-200"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-2 rounded-lg">
                  <Flame size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Ingredients</h3>
              </div>
              <button
                type="button"
                onClick={addIngredient}
                className="inline-flex min-h-11 items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full hover:from-green-600 hover:to-emerald-600 transition font-semibold"
              >
                <Plus size={18} /> Add Ingredient
              </button>
            </div>

            <div className="space-y-3">
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="bg-green-50 rounded-xl border border-green-100 p-3 sm:p-4 grid grid-cols-12 gap-2 items-center group hover:border-green-300 transition">
                  <div className="col-span-12 sm:col-span-6">
                    <label className="text-[10px] sm:text-xs font-bold text-gray-600 mb-1 block">Item</label>
                    <input
                      type="text"
                      placeholder="e.g., Flour"
                      value={ingredient.item}
                      onChange={(e) => handleIngredientChange(index, 'item', e.target.value)}
                      className="w-full px-3 py-2 border border-green-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500 text-gray-900 font-semibold text-sm"
                    />
                  </div>
                  <div className="col-span-5 sm:col-span-2">
                    <label className="text-[10px] sm:text-xs font-bold text-gray-600 mb-1 block">Qty</label>
                    <input
                      type="text"
                      placeholder="2"
                      value={ingredient.quantity}
                      onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                      className="w-full px-3 py-2 border border-green-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500 text-gray-900 font-semibold text-sm"
                    />
                  </div>
                  <div className="col-span-5 sm:col-span-3">
                    <label className="text-[10px] sm:text-xs font-bold text-gray-600 mb-1 block">Unit</label>
                    <select
                      value={ingredient.unit}
                      onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                      className="w-full px-3 py-2 border border-green-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500 text-gray-900 font-semibold text-sm"
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
                  <div className="col-span-2 sm:col-span-1 flex justify-end mt-4 sm:mt-0">
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="min-h-11 min-w-11 text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg transition"
                      aria-label={`Remove ingredient ${index + 1}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-lg">
                  <Info size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Instructions</h3>
              </div>
              <button
                type="button"
                onClick={addInstruction}
                className="inline-flex min-h-11 items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition font-semibold"
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
                    className="min-h-11 min-w-11 text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg transition flex-shrink-0"
                    aria-label={`Remove instruction ${index + 1}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t-2 border-gray-200">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="w-full sm:flex-1 min-h-11 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 hover:border-gray-400 transition font-bold text-base md:text-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:flex-1 min-h-11 px-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:from-red-600 hover:to-orange-600 transition font-bold text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? '⏳ Saving...' : recipe ? '✏️ Update Recipe' : '➕ Create Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
