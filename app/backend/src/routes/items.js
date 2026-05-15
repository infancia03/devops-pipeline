const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all items
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM items ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// GET single item
router.get('/:id', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM items WHERE id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch item' });
  }
});

// POST create item
router.post('/', async (req, res) => {
  const { title, description, user_id } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  try {
    const result = await db.query(
      'INSERT INTO items (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, description, user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create item' });
  }
});

// DELETE item
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM items WHERE id = $1', [req.params.id]);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

module.exports = router;