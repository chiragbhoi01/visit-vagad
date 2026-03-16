# Visit Vagad 🏔️

**A Tourist Website & Travel Planner for discovering hidden gems in Vagad, Rajasthan**

---

## 🛠 Tech Stack

- **Frontend**: React + TypeScript + Vite (Coming Soon)
- **Backend**: Node.js v24 + Express + TypeScript
- **Database**: MongoDB Atlas
- **Authentication**: JWT + bcryptjs
- **Security**: Helmet, CORS
- **Package Manager**: npm

---

## 📁 Project Structure

```
visit-vagad/
├── client/                 # React frontend (coming soon)
├── server/                 # Express backend
│   ├── src/
│   │   ├── index.ts       # Server entry point
│   │   ├── config/
│   │   │   └── config.ts  # Environment configuration
│   │   ├── models/
│   │   │   ├── user.models.ts      # User schema with password hashing
│   │   │   └── place.models.ts     # Place/Tourist spot schema
│   │   ├── controllers/   # Route handlers (coming soon)
│   │   ├── routes/        # API endpoints (coming soon)
│   │   ├── middlewares/   # Custom middleware (coming soon)
│   │   ├── db/
│   │   │   └── connectDatabase.ts  # MongoDB connection
│   │   └── types/
│   │       └── index.ts   # TypeScript interfaces
│   ├── package.json
│   └── tsconfig.json      # TypeScript configuration
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started (Server Setup)

### Prerequisites
- **Node.js**: v24 or higher
- **npm**: v10 or higher
- **MongoDB**: Atlas account (free tier available)
- **Git**: For version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chiragbhoi01/VISIT-VAGAD.git
   cd VISIT-VAGAD/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** in the `server/` directory
   ```bash
   cp .env.example .env  # if available, or create manually
   ```

4. **Configure environment variables** (see section below)

5. **Start development server**
   ```bash
   npm run dev
   ```

   The server will start at: `http://localhost:5000`
   
   Health check endpoint: `http://localhost:5000/health`

### Running in Production

```bash
# Build TypeScript to JavaScript
npm run build

# Start production server
npm start
```

---

## 📝 Environment Variables (.env)

Create a `.env` file in the `server/` directory with the following variables:

```env
# Server Port
PORT=5000

# MongoDB Connection
MONGO_URI=mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER>.mongodb.net/<DATABASE>?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_min_32_chars_recommended
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000

# Environment
NODE_ENV=development
```

### How to get MongoDB URI:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Click "Connect" → "Connect your application"
5. Copy connection string and replace `<USERNAME>`, `<PASSWORD>`, `<CLUSTER>`, `<DATABASE>`

**⚠️ Security Note**: Never commit `.env` file to Git. It's already in `.gitignore`

---

## 📊 Current Status

### ✅ Week 1 - Models Complete
- [x] User Model (with password hashing via bcryptjs)
- [x] Place Model (Tourism spots with coordinates)
- [x] TypeScript Interfaces
- [x] MongoDB Connection
- [x] Environment configuration

### 🔄 Upcoming
- [ ] Authentication Controllers (Register, Login)
- [ ] Place Controllers (CRUD operations)
- [ ] Routes setup
- [ ] Input validation middleware
- [ ] React frontend
- [ ] API documentation

---

## 🔐 Security Features Implemented

✅ Password hashing with bcryptjs (10 salt rounds)
✅ JWT-based authentication ready
✅ Helmet.js for HTTP security headers
✅ CORS enabled for frontend communication
✅ Environment variables for sensitive data
✅ Email validation
✅ Mongoose schema validation
✅ `.env` in `.gitignore`

---

## 📦 Available Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Compile TypeScript to JavaScript
npm start        # Run production build
npm test         # Run tests (to be configured)
```

---

## 🗄️ Database Models

### User Model
```typescript
{
  name: String (required),
  email: String (unique, required, validated),
  password: String (hashed with bcryptjs),
  role: "user" | "admin" (default: "user"),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Place Model
```typescript
{
  name: String (unique per district, required),
  district: "Banswara" | "Dungarpur" (required),
  category: "temple" | "nature" | "tribal" | "waterfall" | "historical" | "spiritual" (required),
  images: [String],
  bestSeason: "Summer" | "Monsoon" | "Winter",
  coordinates: {
    latitude: Number (-90 to 90),
    longitude: Number (-180 to 180)
  },
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## 🖥️ API Endpoints (To be implemented)

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Places
- `GET /api/places` - Get all places
- `GET /api/places/:id` - Get place details
- `GET /api/places/district/:district` - Get places by district
- `POST /api/places` - Create new place (Admin only)
- `PUT /api/places/:id` - Update place (Admin only)
- `DELETE /api/places/:id` - Delete place (Admin only)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: ENOTFOUND mongodb+srv://...
```
**Solution**: Check your MongoDB URI and ensure your IP is whitelisted in MongoDB Atlas

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution**: Change PORT in `.env` or kill process using the port

### TypeScript Compilation Errors
```bash
npm run build  # Check for type errors
```

---

## 📄 License

ISC License - See LICENSE file for details

---

## 👨‍💻 Author

**Chirag Bhoi**
- GitHub: [@chiragbhoi01](https://github.com/chiragbhoi01)
- Repository: [VISIT-VAGAD](https://github.com/chiragbhoi01/VISIT-VAGAD)

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Last Updated**: March 2025
