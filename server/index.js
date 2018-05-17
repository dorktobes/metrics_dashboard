require('dotenv').config();
const express = require('express');
const app = express();

const models = require('./../db/models');
app.use((req, res, next) => {
  console.log(`serving ${req.method} request at ${req.url}`);
  next();
})

app.use(express.static(__dirname + '/../client/dist'));

app.get('/clinicians', (req, res) => {
  models.clinicians.getAll()
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.send([]);
  });
});

app.get('/clinicians/:id', (req, res) => {
  models.clinicians.getById(req.params.id)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.send([]);
  });
});

app.get('/clinicians/:id/appointments', (req, res) => {
  models.appointments.getByClinician(req.params.id)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.send([]);
  });
});

app.get('/patients', (req, res) => {
  models.patients.getAll()
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.send([]);
  });
});

app.get('/patients/:id', (req, res) => {
  models.patients.getById(req.params.id)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.send([]);
  });
});

app.get('/patients/:id/appointments', (req, res) => {
  models.appointments.getByPatient(req.params.id)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.send([]);
  });
});

app.get('/appointments', (req, res) => {
  models.appointments.getAll()
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.send([]);
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
