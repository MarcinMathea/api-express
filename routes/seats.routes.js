const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
    res.json(db.seats.filter((obj) => obj.id == req.params.id));
});

router.route('/seats/random').get((req, res) => {
    res.json(db.seats[Math.floor(Math.random() * db.seats.length)]);
});

router.route('/seats').post((req, res) => {
    const { author, text } = req.body;
    const randomId = (arr) => { Math.floor(Math.random() * arr.length) + arr.length };
    const arrayElement = {
        id: randomId(db.seats),
        author: author,
        text: text,
    };
    db.seats.push(arrayElement);
    res.json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {
    const { author, text } = req.body;

    db.seats.map((obj) => {
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

router.route('/seats/:id').delete((req, res) => {
    db.seats.filter((obj) => {
        obj.id !== req.params.id
    });
    res.json({ message: 'OK' })
});

module.exports = router;