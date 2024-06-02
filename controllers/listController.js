const express = require('express');
const List = require('../models/List');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new list
router.post('/', authMiddleware, async (req, res) => {
  const { name, movies, isPublic } = req.body;

  try {
    const newList = new List({ name, movies, isPublic, user: req.user.id });
    const list = await newList.save();
    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all lists of the user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const lists = await List.find({ user: req.user.id });
    res.json(lists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get a public list by ID
router.get('/:id', async (req, res) => {
  try {
    const list = await List.findById(req.params.id); // Retrieve the list by ID
    if (!list) { // Check if the list is not found
      return res.status(404).json({ msg: 'List not found' }); // Return 404 Not Found with a message
    }
    res.json(list); // Send the list data in the response
  } catch (err) {
    console.error(err.message); // Log any errors
    res.status(500).send('Server error'); // Return 500 Internal Server Error
  }
});

// Add movie to list
router.post('/:id/add-movie', authMiddleware, async (req, res) => {
  const listId = req.params.id;
  const { title, year, imdbID, poster } = req.body;

  try {
    const list = await List.findById(listId);

    if (!list) {
      return res.status(404).json({ msg: 'List not found' });
    }

    if (list.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    list.movies.push({ title, year, imdbID, poster });
    await list.save();

    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a list
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ msg: 'List not found' });
    }
    if (list.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await list.deleteOne();
    res.json({ msg: 'List removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
