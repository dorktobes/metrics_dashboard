const DataLoader = require('dataloader');

const db = require('./connect');

/* eslint-disable no-template-curly-in-string */
const clinicians = {
  getById(id) {
    return db.one('SELECT * FROM clinicians WHERE id = ${id}', { id });
  },
  getAll() {
    return db.any('SELECT * FROM clinicians');
  },
  cliniciansLoader: new DataLoader(keys => (
    new Promise((resolve, reject) => {
      db.tx((t) => {
        const queries = keys.map(q => (
          t.one('SELECT * FROM clinicians WHERE id = $1', [q])
        ));
        t.batch(queries)
          .then(data => resolve(data))
          .catch(err => reject(err));
      });
    })
  )),
};

const patients = {
  getById(id) {
    return db.one('SELECT * FROM patients WHERE id = ${id}', { id });
  },
  getAll() {
    return db.any('SELECT * FROM patients');
  },
  patientsLoader: new DataLoader(keys => (
    new Promise((resolve, reject) => {
      db.tx((t) => {
        const queries = keys.map(q => (
          t.one('SELECT * FROM patients WHERE id = $1', [q])
        ));
        t.batch(queries)
          .then(data => resolve(data))
          .catch(err => reject(err));
      });
    })
  )),
};

const appointments = {
  getByClinician(clinicianId) {
    return db.any('SELECT * FROM appointments WHERE clinician_id = ${clinicianId}', { clinicianId });
  },
  cliniciansLoader: new DataLoader(keys => (
    new Promise((resolve, reject) => {
      db.tx((t) => {
        const queries = keys.map(q => (
          t.any('SELECT * FROM appointments WHERE clinician_id = $1', [q])
        ));
        t.batch(queries)
          .then(data => resolve(data))
          .catch(err => reject(err));
      });
    })
  )),
  getByPatient(patientId) {
    return db.any('SELECT * FROM appointments WHERE patient_id = ${patientId}', { patientId });
  },
  patientsLoader: new DataLoader(keys => (
    new Promise((resolve, reject) => {
      db.tx((t) => {
        const queries = keys.map(q => (
          t.any('SELECT * FROM appointments WHERE patient_id = $1', [q])
        ));
        t.batch(queries)
          .then(data => resolve(data))
          .catch(err => reject(err));
      });
    })
  )),
  getByClinic(clinic) {
    return db.any('SELECT * FROM appointments WHERE clinic = ${clinic}', { clinic });
  },
  getAll() {
    return db.many('SELECT * FROM appointments');
  },
};
/* eslint-enable no-template-curly-in-string */
module.exports = {
  clinicians,
  patients,
  appointments,
};
