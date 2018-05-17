const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const db = require('./connect')
.connect()
.then(async(db) => {
  try {
    await db.query(`CREATE TABLE IF NOT EXISTS clinicians (
      id INTEGER PRIMARY KEY, 
      first_name VARCHAR (50) NOT NULL,
      last_name VARCHAR (50) NOT NULL,
      clinic INTEGER NOT NULL,
      target_patients_per_day DECIMAL NOT NULL,
      days_working DECIMAL NOT NULL,
      specialty_2 VARCHAR (50),
      specialty_1 VARCHAR (50),
      specialty_3 VARCHAR (50)
    )`);

    await db.query(`COPY clinicians FROM '${process.cwd()}/seed_data/clinicians.csv' WITH (FORMAT csv);`);

    await db.query(`CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY,
      first_name VARCHAR (50) NOT NULL,
      last_name VARCHAR (50) NOT NULL,
      address VARCHAR (255) NOT NULL,
      email VARCHAR (255) NOT NULL,
      referral_channel VARCHAR (50),
      diagnosis VARCHAR (50),
      primary_clinician INTEGER REFERENCES clinicians(id)
    )`);

    await db.query(`COPY patients FROM '${process.cwd()}/seed_data/patients.csv' WITH (FORMAT csv);`);

    await db.query(`CREATE TABLE IF NOT EXISTS appointments (
      clinic INTEGER NOT NULL,
      patient_id INTEGER REFERENCES patients(id),
      clinician_id INTEGER REFERENCES clinicians(id),
      date_scheduled DATE NOT NULL,
      date_of_service DATE NOT NULL,
      canceled BOOLEAN,
      no_show BOOLEAN  
    )`);

    const appointments1 = await new Promise((resolve, reject) => {
      fs.readFile('./seed_data/appointments_1.csv', 'utf8', (err, data) => {
        if(err) {
          reject(err);
          return;
        }
        let appointments = parse(data)
        .map((e) => {
          e.unshift('1');
          return e;
        });
        resolve(appointments.slice(1));
      })
    });

    await db.tx(t => {
      const queries = appointments1.map(row => {
        return t.none('INSERT INTO appointments(clinic, patient_id, clinician_id, date_scheduled, date_of_service, canceled, no_show) VALUES($1, $2, $3, $4, $5, $6, $7)', row);
      });
      return t.batch(queries);
    });

    const appointments2 = await new Promise((resolve, reject) => {
      fs.readFile('./seed_data/appointments_2.csv', 'utf8', (err, data) => {
        if(err) {
          reject(err);
          return;
        }
        let appointments = parse(data)
        .map((e) => {
          e.unshift('2');
          return e;
        });
        resolve(appointments.slice(1));
      })
    });

    await db.tx(t => {
      const queries = appointments2.map(row => {
        return t.none('INSERT INTO appointments(clinic, patient_id, clinician_id, date_scheduled, date_of_service, canceled, no_show) VALUES($1, $2, $3, $4, $5, $6, $7)', row);
      });
      return t.batch(queries);
    });

    db.done();
    
  } catch(err) {
    console.error(err);
  }

});
