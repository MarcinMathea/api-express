const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
    res.json(db.testimonials.filter((obj) => obj.id == req.params.id));
});

router.route('/testimonials/random').get((req, res) => {
    res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

router.route('/testimonials').post((req, res) => {
    const { author, text } = req.body;
    const randomId = (arr) => { Math.floor(Math.random() * arr.length) + arr.length };
    const arrayElement = {
        id: randomId(db.testimonials),
        author: author,
        text: text,
    };
    db.testimonials.push(arrayElement);
    res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
    const { author, text } = req.body;

    db.testimonials.map((obj) => {
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

router.route('/testimonials/:id').delete((req, res) => {
    db.testimonials.filter((obj) => {
        obj.id !== req.params.id
    });
    res.json({ message: 'OK' })
});

module.exports = router;