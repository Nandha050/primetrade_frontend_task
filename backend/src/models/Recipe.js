const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a recipe title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters']
    },
    category: {
      type: String,
      required: true,
      enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Snack', 'Salad', 'Soup', 'Bread'],
      default: 'Main Course'
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner'
    },
    cuisineType: {
      type: String,
      enum: ['Italian', 'Chinese', 'Indian', 'Mexican', 'American', 'Mediterranean', 'Asian', 'Other'],
      default: 'Other'
    },
    dietary: {
      type: String,
      enum: ['Veg', 'Non-Veg'],
      default: 'Veg'
    },
    prepTime: {
      type: Number, // in minutes
      required: true,
      min: 1
    },
    cookTime: {
      type: Number, // in minutes
      required: true,
      min: 1
    },
    servings: {
      type: Number,
      required: true,
      min: 1
    },
    ingredients: [
      {
        item: String,
        quantity: String,
        unit: String
      }
    ],
    instructions: [
      {
        stepNumber: Number,
        description: String
      }
    ],
    calories: {
      type: Number,
      min: 0
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 4
    },
    imageUrl: {
      type: String,
      default: 'https://via.placeholder.com/400x300?text=Recipe'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recipe', recipeSchema);
