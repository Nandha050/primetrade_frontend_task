# Chef - A Recipe Book Application

## Overview
Chef is a full-stack web application that allows users to create, manage, and discover recipes. It features user authentication, CRUD operations on recipes, and advanced search and filtering capabilities.

## Application Features

### 🔐 Authentication
- User registration with validation
- Secure login with JWT tokens
- Password hashing using bcryptjs
- Protected routes for authenticated users
- User profile management

### 📖 Recipe Management
- **Create**: Add new recipes with detailed information
- **Read**: View all recipes with filtering and search
- **Update**: Edit existing recipes
- **Delete**: Remove recipes from collection

### 🔍 Search & Filter
- Search recipes by title and description
- Filter by:
  - Category (Appetizer, Main Course, Dessert, etc.)
  - Difficulty level (Beginner, Intermediate, Advanced)
  - Cuisine type (Italian, Chinese, Indian, Mexican, etc.)
- Sort by:
  - Newest first
  - Title (A-Z)
  - Prep time
  - Rating

### 💻 Tech Stack

#### Backend
- **Framework**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Encryption**: bcryptjs
- **Validation**: express-validator
- **CORS**: Enabled for frontend integration

#### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **UI Components**: Lucide React Icons
- **Notifications**: React Hot Toast

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file with:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/chef-app
JWT_SECRET=your_secure_jwt_secret_key
NODE_ENV=development

# Start the server
npm start

# For development with auto-reload
npm run dev
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}

Response: 201 Created
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Get User Profile
```http
GET /auth/profile
Authorization: Bearer jwt_token_here

Response: 200 OK
{
  "success": true,
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Recipe Endpoints

#### Create Recipe
```http
POST /recipes
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "title": "Chocolate Chip Cookies",
  "description": "Delicious homemade chocolate chip cookies",
  "category": "Dessert",
  "difficulty": "Beginner",
  "cuisineType": "American",
  "prepTime": 15,
  "cookTime": 12,
  "servings": 24,
  "calories": 200,
  "rating": 5,
  "imageUrl": "https://example.com/image.jpg",
  "ingredients": [
    {
      "item": "Flour",
      "quantity": "2",
      "unit": "cup"
    }
  ],
  "instructions": [
    {
      "stepNumber": 1,
      "description": "Preheat oven to 375°F"
    }
  ]
}

Response: 201 Created
{
  "success": true,
  "recipe": { ... }
}
```

#### Get All Recipes
```http
GET /recipes?search=cookies&category=Dessert&difficulty=Beginner&sortBy=rating
Authorization: Bearer jwt_token_here

Query Parameters:
- search: Search term for title/description
- category: Appetizer, Main Course, Dessert, etc.
- difficulty: Beginner, Intermediate, Advanced
- cuisineType: Italian, Chinese, Indian, etc.
- sortBy: createdAt, title, prepTime, rating

Response: 200 OK
{
  "success": true,
  "count": 5,
  "recipes": [ ... ]
}
```

#### Get Single Recipe
```http
GET /recipes/:id
Authorization: Bearer jwt_token_here

Response: 200 OK
{
  "success": true,
  "recipe": { ... }
}
```

#### Update Recipe
```http
PUT /recipes/:id
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "title": "Updated Recipe Name",
  "description": "Updated description",
  ...
}

Response: 200 OK
{
  "success": true,
  "recipe": { ... }
}
```

#### Delete Recipe
```http
DELETE /recipes/:id
Authorization: Bearer jwt_token_here

Response: 200 OK
{
  "success": true,
  "message": "Recipe deleted"
}
```

## Project Structure

### Backend
```
backend/
├── src/
│   ├── models/
│   │   ├── User.js
│   │   └── Recipe.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── recipeController.js
│   ├── middleware/
│   │   └── auth.js
│   └── routes/
│       ├── auth.js
│       └── recipes.js
├── index.js
├── package.json
├── .env
└── .gitignore
```

### Frontend
```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── RecipeModal.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   ├── services/
│   │   └── api.js
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── .gitignore
```

## Security Features

✅ **Password Hashing**: Uses bcryptjs with salt rounds
✅ **JWT Authentication**: Secure token-based authentication
✅ **Protected Routes**: Frontend and backend route protection
✅ **CORS Enabled**: Configured for secure cross-origin requests
✅ **Input Validation**: Server-side validation on all inputs
✅ **Authorization Checks**: Users can only access their own recipes

## Scalability Considerations

### Frontend Scalability
1. **Component-based Architecture**: Easy to extend with new features
2. **Context API**: State management for authentication
3. **Separation of Concerns**: Services, components, pages organized
4. **Environment Variables**: Easy configuration for different environments
5. **Responsive Design**: Mobile-first approach with TailwindCSS

### Backend Scalability
1. **Modular Structure**: Controllers, models, and routes separated
2. **Database Indexing**: MongoDB indexes on frequently queried fields
3. **Middleware Pattern**: Easy to add new middleware for features
4. **API Versioning**: Structure supports future API versions (/api/v1, /api/v2)
5. **Error Handling**: Comprehensive error handling and logging
6. **Stateless Architecture**: JWT-based authentication for horizontal scaling

### Production Deployment
1. **Environment Variables**: Separate dev/prod configs
2. **Docker Support**: Can be containerized easily
3. **Logging**: Add Winston/Morgan for production logging
4. **Rate Limiting**: Implement express-rate-limit for API protection
5. **Database Replication**: MongoDB replica sets for HA
6. **CDN**: Static assets on CDN for faster delivery
7. **Caching**: Redis caching for frequently accessed recipes

## Future Enhancements

- 👥 Social features (sharing, ratings, comments)
- 📸 Image upload functionality
- 🔖 Save/favorite recipes
- 👨‍🍳 Chef profiles for recipe attribution
- 📊 Analytics and statistics
- 🌐 Multi-language support
- 🔔 Notifications for recipe updates
- 📱 Mobile app (React Native)

## Running the Application

### Development Mode (Concurrently)
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

Frontend will run at: `http://localhost:3000`
Backend will run at: `http://localhost:5000`

## Testing Credentials
```
Email: demo@example.com
Password: Demo@123
```

## Contributing
Feel free to submit issues and enhancement requests!

## License
MIT License - feel free to use this project for any purpose.

## Author
Built as an internship project for Frontend Development

---

**For more information, visit the dashboard at `http://localhost:3000/dashboard`**
