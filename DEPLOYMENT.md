# 🚀 Visit Vagad Deployment Guide

Follow these steps to launch Visit Vagad for real users.

---

## 1. Backend Deployment (Render / Railway)

### Step 1: Push Code
Ensure your code is pushed to a GitHub repository.

### Step 2: Create Web Service
1. Connect your GitHub account to **Render** or **Railway**.
2. Create a new **Web Service**.
3. Select the `server` directory as the root.
4. Build Command: `npm install && npm run build`
5. Start Command: `npm start`

### Step 3: Configure Environment Variables
Add the following keys from your `server/.env.example`:
- `MONGO_URI`
- `CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `IMAGEKIT_PUBLIC_KEY`
- `IMAGEKIT_PRIVATE_KEY`
- `IMAGEKIT_URL_ENDPOINT`
- `CORS_ORIGIN` (Set this to your Vercel URL later)
- `NODE_ENV` (Set to `production`)

---

## 2. Frontend Deployment (Vercel)

### Step 1: Connect Repository
1. Log in to **Vercel** and click **New Project**.
2. Import your GitHub repository.

### Step 2: Configure Project
1. Framework Preset: **Vite**.
2. Root Directory: `client`.
3. Output Directory: `dist`.

### Step 3: Configure Environment Variables
Add the following keys from your `client/.env.example`:
- `VITE_API_URL` (Your Render/Railway backend URL)
- `VITE_CLERK_PUBLISHABLE_KEY`
- `VITE_IMAGEKIT_PUBLIC_KEY`
- `VITE_IMAGEKIT_URL_ENDPOINT`

### Step 4: Deploy
Click **Deploy**. Once finished, copy the provided `.vercel.app` URL and update the `CORS_ORIGIN` in your backend settings.

---

## 3. Domain & SSL

### Custom Domain
1. In Vercel, go to **Settings > Domains**.
2. Add `visitvagad.com`.
3. Configure your DNS provider (e.g., Godaddy/Namecheap) with the provided `A` or `CNAME` records.

### HTTPS
Vercel and Render automatically provide SSL certificates for your domains.

---

## 4. Final Launch Checklist

- [ ] Run `npm run seed` on the production database to populate heritage data.
- [ ] Verify Clerk Production environment keys are used.
- [ ] Test image uploads in the Admin Panel.
- [ ] Check `sitemap.xml` and `robots.txt` are accessible.
- [ ] Test mobile responsiveness on a real device.
- [ ] Verify social sharing (WhatsApp/Copy Link) works as expected.
