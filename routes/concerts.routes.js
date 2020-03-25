const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
    res.json(db.concerts.filter((obj) => obj.id == req.params.id));
});

router.route('/concerts/random').get((req, res) => {
    res.json(db.concerts[Math.floor(Math.random() * db.concerts.length)]);
});

router.route('/concerts').post((req, res) => {
    const { author, text } = req.body;
    const randomId = (arr) => { Math.floor(Math.random() * arr.length) + arr.length };
    const arrayElement = {
        id: randomId(db.concerts),
        author: author,
        text: text,
    };
    db.concerts.push(arrayElement);
    res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
    const { author, text } = req.body;

    db.concerts.map((obj) => {
        if (obj.id === req.params.id) {
            return {
                id: obj,
                author: author,
                text: text,
            }
        } else {
            return obj
        }
    });
    res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
    db.concerts.filter((obj) => {
        obj.id !== req.params.id
    });
    res.json({ message: 'OK' })
});

module.exports = router;