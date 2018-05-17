require('dotenv').config();
const express = require('express');
const app = express();

const models = require('./../db/models');

app.get('/clinicians', (req, res) => {
  models.clinicians.getAll()
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.send(err);
  });
});

app.get('/clinicians/:id', (req, res) => {
  models.clinicians.getById(req.params.id)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.send(err);
  });
});

app.get('/clinicians/:id/appointments', (req, res) => {
  models.appointments.getByClinician(req.params.id)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.send(err);
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
