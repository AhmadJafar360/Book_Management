const Author = require('../models/Author');

// Create Author
exports.createAuthor = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const newAuthor = new Author({ name, bio });
    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (err) {
    res.status(500).json({ error: 'Gagal membuat author', details: err.message });
  }
};

// Get All Authors
exports.getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data author' });
  }
};
