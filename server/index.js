require('dotenv').config();
const express = require('express');
const path = require('path');
const expressGraphQL = require('express-graphql');

const models = require('./../db/models');
const schema = require('./schema/');

const app = express();

app.use((req, res, next) => {
  console.log(`serving ${req.method} request at ${req.url}`);
  next();
});

app.use(express.static(path.join(__dirname, '/../client/dist')));

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true,
  context: {
    models,
  },
}));

app.get('/clinicians', (req, res) => {
  models.clinicians.getAll()
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.send([]);
    });
});

app.get('/clinicians/:id', (req, res) => {
  models.clinicians.getById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.send([]);
    });
});

app.get('/clinicians/:id/appointments', (req, res) => {
  models.appointments.getByClinician(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.send([]);
    });
});

app.get('/patients', (req, res) => {
  models.patients.getAll()
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.send([]);
    });
});

app.get('/patients/:id', (req, res) => {
  models.patients.getById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.send([]);
    });
});

app.get('/patients/:id/appointments', (req, res) => {
  models.appointments.getByPatient(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.send([]);
    });
});

app.get('/appointments', (req, res) => {
  models.appointments.getAll()
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.send([]);
    });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
