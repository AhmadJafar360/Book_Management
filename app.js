const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const authorRoutes = require('./routes/authorRoutes');
const bookRoutes = require('./routes/bookRoutes');

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);

module.exports = app;
