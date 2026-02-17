const express = require('express');
const {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
} = require('../controllers/recipeController');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/', upload.single('recipeImage'), createRecipe);
router.get('/', getRecipes);
router.get('/:id', getRecipeById);
router.put('/:id', upload.single('recipeImage'), updateRecipe);
router.delete('/:id', deleteRecipe);

module.exports = router;
