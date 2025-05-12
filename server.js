const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Berhasil Terhubung');
    app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
  })
  .catch(err => console.error(err));
