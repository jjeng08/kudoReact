const Note = require('../models/Note');

module.exports = function (app) {

  app.get('/api/notes', function (req, res) {
    Note.find({})
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });


  app.post('/api/notes', function (req, res) {
    Note.create(req.body)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.delete('/api/notes/:id', function (req, res) {
    Note.deleteOne({_id: req.params.id})
    .then(function () {
      res.json({ success: true });
    }).catch(function (error) {
      res.json({ error: error });
    });
  })

}