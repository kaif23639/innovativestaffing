require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const adminAuth = require('./middleware/authMiddleware');
const path = require('path');
const userAuthRoutes = require('./routes/userAuth');
const adminAuthRoutes = require('./routes/adminAuth');
const categoryRoutes = require('./routes/categories');
const subpageRoutes = require('./routes/subpages');
const flipcardRoutes = require('./routes/flipcards');
const featuredSolutionsRoutes = require('./routes/featuredSolutions');
const clientsRoutes = require('./routes/clients');
const uploadRoute = require('./routes/upload');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174','https://innovative-staffing.vercel.app/'],
  credentials: true,
}));
app.use(express.json());

connectDB();

// Public routes
app.use('/api/users', userAuthRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subpages', subpageRoutes);
app.use('/api/flipcards', flipcardRoutes);
app.use('/api/featuredSolutions', featuredSolutionsRoutes);
app.use('/api/clients', clientsRoutes);

// Admin login route - public, no token required
app.use('/api/admin', adminAuthRoutes);

// Secure all other admin routes with token middleware, if any
// Example:
// app.use('/api/admin/secure-route', adminAuth, secureAdminRoutes);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/api/upload', uploadRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
