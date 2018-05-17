const db = require('./connect');

const clinicians = {
  getById(id) {
    return db.one('SELECT * FROM clinicians WHERE id = ${id}', { id });
  },
  getAll() {
    return db.any('SELECT * FROM clinicians');
  },
};

const patients = {
  getById(id) {
    return db.one('SELECT * FROM patients WHERE id = ${id}', { id });
  },
  getAll() {
    return db.any('SELECT * FROM clinicians');
  },
};

const appointments = {
  getByClinician(clinicianId) {
    return db.any('SELECT * FROM appointments WHERE clinician_id = ${clinicianId}', { clinicianId });
  },
  getByPatient(patientId) {
    return db.any('SELECT * FROM appointments WHERE pateint_id = ${patientId}', { patientId });
  },
  getByClinic(clinic) {
    return db.any('SELECT * FROM appointments WHERE clinic = ${clinic}', { clinic });
  },
  getAll() {
    return db.many('SELECT * FROM appointments');
  },
};

module.exports = {
  clinicians,
  patients,
  appointments,
};
