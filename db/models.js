const db = require('./connect');

const clinician = {
  getById(id) {
    return db.one('SELECT * FROM clinicians WHERE id = ${id}', { id });
  },
  getAll() {
    return db.any('SELECT * FROM clinicians');
  };
}

module.exports = {
  clinician,
};
