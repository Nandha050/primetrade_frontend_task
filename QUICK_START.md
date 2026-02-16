# Chef Application - Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### Prerequisites
- Node.js v14+
- MongoDB (Local or Atlas)
- npm

### Step 1: Clone and Install

```bash
# Backend Setup
cd backend
npm install

# Frontend Setup
cd frontend
npm install
```

### Step 2: Configure Environment

**Backend (.env)**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/chef-app
JWT_SECRET=your_secret_key_change_in_production
NODE_ENV=development
```

**Frontend (.env.local)** (Optional)
```
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Start MongoDB

```bash
# Windows
mongod

# macOS
brew services start mongodb-community

# Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Step 4: Run the Application

```bash
# Terminal 1: Backend
cd backend
npm start

# Terminal 2: Frontend
cd frontend
npm run dev
```

### Step 5: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **API Docs**: See POSTMAN_COLLECTION.json

---

## 📝 Test the Application

### Create Account
1. Go to http://localhost:3000
2. Click "Register"
3. Enter name, email, password
4. Click "Register"

### Add Your First Recipe
1. Click "Add New Recipe"
2. Fill in recipe details:
   - Title: "Pasta Carbonara"
   - Category: "Main Course"
   - Prep Time: 10 min
   - Cook Time: 20 min
   - Servings: 4
3. Add ingredients and instructions
4. Click "Create Recipe"

### Search & Filter
1. Use search box to find recipes
2. Click "Filters" to filter by:
   - Category
   - Difficulty
   - Cuisine Type
   - Sort options

### Manage Recipes
- **Edit**: Click "Edit" button on recipe card
- **Delete**: Click "Delete" button on recipe card
- **View**: Click on recipe for details

---

## 🔧 Useful Commands

### Backend
```bash
npm start      # Production mode
npm run dev    # Development with auto-reload
```

### Frontend
```bash
npm run dev    # Start dev server
npm run build  # Build for production
npm run preview # Preview production build
```

---

## 📚 Project Structure

```
frontend-task/
├── backend/
│   ├── src/
│   │   ├── models/        # Database schemas
│   │   ├── controllers/   # Business logic
│   │   ├── routes/        # API routes
│   │   └── middleware/    # Auth & validation
│   ├── index.js           # Server entry
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── services/      # API client
│   │   └── context/       # Auth state
│   ├── index.html
│   └── package.json
└── README.md
```

---

## 🎨 Features Implemented

✅ User Authentication (Register/Login/Logout)
✅ Recipe CRUD Operations
✅ Advanced Search Functionality
✅ Filter by Category, Difficulty, Cuisine Type
✅ Sort Recipes
✅ Responsive Design
✅ Protected Routes
✅ JWT Token Authentication
✅ Password Hashing with bcryptjs
✅ Form Validation
✅ Error Handling
✅ Loading States
✅ Toast Notifications

---

## 🔐 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT-based authentication
- ✅ Protected API routes
- ✅ Front-end route protection
- ✅ CORS enabled
- ✅ Input validation
- ✅ Authorization checks

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user info

### Recipes
- `POST /api/recipes` - Create recipe
- `GET /api/recipes` - Get all recipes (with filters)
- `GET /api/recipes/:id` - Get single recipe
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Solution: Ensure MongoDB is running
- Windows: Run mongod command
- Check connection URI in .env
```

### Port Already in Use
```
Solution: Change port in .env or kill process
- Windows: netstat -ano | findstr :5000
- Kill process and restart
```

### CORS Error
```
Solution: Ensure backend is running on correct port
- Check .env CORS settings
- Restart both backend and frontend
```

### Module Not Found
```
Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📱 Responsive Design

The application is fully responsive:
- ✅ Desktop (1920px+)
- ✅ Laptop (1024px - 1920px)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 768px)

---

## 🚀 Production Deployment

For detailed production deployment instructions, see `DEPLOYMENT_GUIDE.md`

Quick summary:
1. Use environment variables for secrets
2. Enable HTTPS/SSL
3. Set up database replication
4. Implement load balancing
5. Add CDN for static files
6. Set up monitoring & logging

---

## 📞 Support

For issues or questions:
1. Check README.md for detailed docs
2. Review API endpoints in POSTMAN_COLLECTION.json
3. Check frontend console for client-side errors
4. Check backend logs for server errors

---

## 🎯 Next Steps

1. **Customize Colors**: Edit `frontend/tailwind.config.js`
2. **Add More Features**: Follow the modular structure
3. **Deploy**: Follow DEPLOYMENT_GUIDE.md
4. **Scale**: Add caching, load balancing, microservices

---

**Happy Cooking! 👨‍🍳**
