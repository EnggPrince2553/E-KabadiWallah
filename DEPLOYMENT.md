# Deploying the Backend to Render

## Prerequisites
- A Render account (https://render.com).
- A MongoDB Atlas connection string (or any accessible MongoDB URI).
- The repository must be pushed to a Git provider that Render can access (GitHub, GitLab, etc.).

## Steps
1. **Create a new Web Service**
   - On Render dashboard, click **New** → **Web Service**.
   - Connect your repository containing the `scrap-management-main` project.
   - Set the **Root Directory** to `server` (Render will run commands inside this folder).
2. **Configure Build & Start Commands**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - Render automatically provides the `PORT` environment variable; the code already respects `process.env.PORT`.
3. **Add Environment Variables**
   - `MONGODB_URI` – your MongoDB connection string.
   - (Optional) `PORT` – you can leave this empty; Render injects its own.
   - Any other vars used in `.env.example` (e.g., `JWT_SECRET`). Add them as **Secret** values.
4. **Deploy**
   - Click **Create Web Service**. Render will install dependencies and start the server.
   - Once the build succeeds, you’ll see a URL like `https://your-service.onrender.com`.
5. **Verify**
   - Open the URL and hit a public endpoint, e.g., `https://your-service.onrender.com/api/v1/auth` (you should get a JSON response or a 401 if auth is required).
   - Check the Render logs for `Server running on port <port>` to confirm the server started correctly.

## Common Issues
- **Missing `MONGODB_URI`** – The server will crash with an explicit error. Ensure the variable is added under **Environment > Variables**.
- **Port Binding Errors** – Do not set a custom `PORT` unless you have a specific reason; Render overrides it.
- **CORS Errors** – If you need to expose the API to the frontend hosted elsewhere, add the appropriate CORS origins in `server.js`.

Now your backend will be live on Render, and the frontend can call the API using the Render URL.
