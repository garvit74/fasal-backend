const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  imdbID: { type: String, required: true },
  poster: { type: String }
});

const ListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  movies: [MovieSchema],
  isPublic: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('List', ListSchema);
