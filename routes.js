var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {

    app.delete('/notes/:id', function (req, res) {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').remove(details, function (err, item) {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send('Object with id  ' + id + ' deleted!');
            }
        });
    });

    app.put('/notes/:id', function (req, res) {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        const note = {text: req.body.body, title: req.body.title};
        db.collection('notes').update(details, note, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(note);
            }
        });
    });

    app.get('/notes/:id', function (req, res) {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').findOne(details, function (err, item) {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });

    app.post('/notes', function (req, res) {

        const note = {text: req.body.body, title: req.body.title};
        db.collection('notes').insert(note, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(result.ops[0]);
            }
        });
    });
};