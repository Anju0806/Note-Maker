const fs = require('fs');
const router = require('express').Router();
const express = require('express');
const { v4: uuidv4 } = require('uuid');


// GET Route for homepage
router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(JSON.parse(data));
            //console.log(data);
        }
    });
});

router.post('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Failed to save the note.' });
      }
  
      const db = JSON.parse(data); // Parse the data to get the initial notes
  
      const { title, text } = req.body;
      const id = uuidv4();
      const newNote = {
        id,
        title,
        text,
      };
  
      db.push(newNote); // Add the new note to the notes array
  
      fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to save the note.' });
        }
        res.json(newNote);
      });
    });
  });
  

router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to delete the note.' });
        }
        try {
            const notes = JSON.parse(data);
            // Find the index of the note with the given ID
            const index = notes.findIndex((note) => note.id === id);

            if (index === -1) {
                // If the note with the given ID is not found, return a 404 response
                return res.status(404).json({ error: 'Note not found.' });
            }
            notes.splice(index, 1);
            fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
                if (err) {
                    // Handle the error if writing to the file fails
                    console.error(err);
                    return res.status(500).json({ error: 'Failed to delete the note.' });
                }
                res.status(204).send();
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to delete the note.' });
        }
    });
});

module.exports = router;