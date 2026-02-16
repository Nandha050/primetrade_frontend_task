const Recipe = require('../models/Recipe');

const createRecipe = async (req, res) => {
  try {
    const {
      title, description, category, difficulty, cuisineType,
      prepTime, cookTime, servings, ingredients, instructions,
      calories, rating, imageUrl
    } = req.body;

    if (!title || !prepTime || !cookTime || !servings) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const recipe = new Recipe({
      title, description, category, difficulty, cuisineType,
      prepTime, cookTime, servings,
      ingredients: ingredients || [],
      instructions: instructions || [],
      calories, rating, imageUrl,
      user: req.user.id
    });

    await recipe.save();
    res.status(201).json({ success: true, recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getRecipes = async (req, res) => {
  try {
    const { search, category, difficulty, cuisineType, sortBy } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (cuisineType) filter.cuisineType = cuisineType;

    let sortObj = { createdAt: -1 };
    if (sortBy === 'title') sortObj = { title: 1 };
    else if (sortBy === 'prepTime') sortObj = { prepTime: 1 };
    else if (sortBy === 'rating') sortObj = { rating: -1 };

    const recipes = await Recipe.find(filter).sort(sortObj);
    res.status(200).json({ success: true, count: recipes.length, recipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.status(200).json({ success: true, recipe });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateRecipe = async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const {
      title, description, category, difficulty, cuisineType,
      prepTime, cookTime, servings, ingredients, instructions,
      calories, rating, imageUrl
    } = req.body;

    if (title) recipe.title = title;
    if (description) recipe.description = description;
    if (category) recipe.category = category;
    if (difficulty) recipe.difficulty = difficulty;
    if (cuisineType) recipe.cuisineType = cuisineType;
    if (prepTime) recipe.prepTime = prepTime;
    if (cookTime) recipe.cookTime = cookTime;
    if (servings) recipe.servings = servings;
    if (ingredients) recipe.ingredients = ingredients;
    if (instructions) recipe.instructions = instructions;
    if (calories) recipe.calories = calories;
    if (rating) recipe.rating = rating;
    if (imageUrl) recipe.imageUrl = imageUrl;
    recipe.updatedAt = Date.now();

    await recipe.save();
    res.status(200).json({ success: true, recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Recipe deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createRecipe, getRecipes, getRecipeById, updateRecipe, deleteRecipe
};
