# Deploying to Vercel (Step-by-Step)

This guide will help you deploy the "Chef" application (Frontend + Backend) to Vercel effectively.

## Prerequisites
1.  **GitHub Account**: Ensure your code is pushed to a GitHub repository.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com).
3.  **MongoDB Atlas**: You need a cloud MongoDB database (since Vercel is serverless, you cannot run a local MongoDB there).

---

## Step 1: Prepare Your Code (Already Done by Agent)
We have already:
1.  Created a `vercel.json` file in the root directory to tell Vercel how to build both the frontend and backend.
2.  Updated `backend/index.js` to be compatible with serverless environments.

## Step 2: Push to GitHub
If you haven't already, commit and push your changes:
```bash
git add .
git commit -m "Prepared for Vercel deployment"
git push origin main
```

## Step 3: Deployment on Vercel

1.  **Log in to Vercel** and go to your Dashboard.
2.  Click **"Add New..."** -> **"Project"**.
3.  **Import** your GitHub repository.
4.  **Configure Project**:
    *   **Framework Preset**: Select **Vite** (Vercel might auto-detect this, but double check).
    *   **Root Directory**: Leave as `./` (Root).
    *   **Build & Output Settings**:
        *   Build Command: `npm run build` (This usually runs inside frontend, but our `vercel.json` handles this).
        *   *Actually, with our `vercel.json` setup, you might NOT need to change these override settings manually as Vercel will read the config.*
    *   **Environment Variables**: You MUST add these before deploying:
        *   `MONGODB_URI`: Your MongoDB Atlas Connection String (e.g., `mongodb+srv://user:pass@cluster.mongodb.net/chef-app`).
        *   `JWT_SECRET`: A secure random string.
        *   `VITE_API_URL`: Set this to `/api` (This ensures the frontend talks to the backend on the same domain).

5.  Click **Deploy**.

## Step 4: Verify Deployment
1.  Once deployed, Vercel will give you a domain (e.g., `your-app.vercel.app`).
2.  Visit the URL.
3.  **Test API**: Try to Register or Login.
    *   If it fails, check the **Logs** tab in Vercel Dashboard for any backend errors (e.g., MongoDB connection issues).

## Troubleshooting

### "404 Not Found" on API routes?
*   Check if `vercel.json` exists in the root.
*   Ensure the `builds` configuration points to correct paths (`backend/index.js`).

### Frontend cannot connect to Backend?
*   Check the Network tab in browser dev tools.
*   Ensure `VITE_API_URL` environment variable is set to `/api`.

### MongoDB Connection Error?
*   Ensure your MongoDB Atlas IP Access List allows `0.0.0.0/0` (Allow Access from Anywhere) since Vercel IPs change dynamicall.

---
**Enjoy your deployed application!**
