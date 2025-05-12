const Book = require('../models/Book');

// Create Book
exports.createBook = async (req, res) => {
  try {
    const { title, description, author } = req.body;
    const newBook = new Book({ title, description, author });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: 'Gagal membuat buku', details: err.message });
  }
};

// Get All Books with Pagination and Author Info
exports.getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const books = await Book.find()
      .populate('author')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data buku' });
  }
};

// Get Single Book
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('author');
    if (!book) return res.status(404).json({ error: 'Buku tidak ditemukan' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil buku' });
  }
};

// Update Book
exports.updateBook = async (req, res) => {
  try {
    const { title, description, author } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, description, author },
      { new: true }
    );
    if (!book) return res.status(404).json({ error: 'Buku tidak ditemukan' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Gagal memperbarui buku' });
  }
};

// Delete Book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: 'Buku tidak ditemukan' });
    res.json({ message: 'Buku berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: 'Gagal menghapus buku' });
  }
};
