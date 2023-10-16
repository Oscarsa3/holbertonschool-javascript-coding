import readDatabase from '../utils';

const fs = require('fs');

const db = process.argv[2];

class StudentsController {
  static getAllStudents(req, res) {
    res.status(200);
    if (fs.existsSync(db)) {
      readDatabase(db)
        .then((data) => {
          res.write('This is the list of our students\n');

          for (const field in data) {
            if (field) {
              res.write(`Number of students in ${field}: ${data[field].length}. List: ${data[field].join(', ')}\n`);
            }
          }
          res.end();
        })
        .catch((err) => {
          res.end(err.message);
        });
    } else {
      res.status(500);
      res.write('Cannot load the database');
    }
  }

  static getAllStudentsByMajor(req, res) {
    res.status(200);

    if (fs.existsSync(db)) {
      readDatabase(db)
        .then((data) => {
          const { major } = req.params;
          if (data[major]) {
            res.status(200);
            res.write(`List: ${data[major].join(', ')}`);
          } else {
            res.status(500);
            res.setHeader('Content-Type', 'text/plain');
            res.end('Major parameter must be CS or SWE');
          }
          res.end();
        })
        .catch((err) => {
          res.status(500);
          res.end(err.message);
        });
    } else {
      res.status(500);
      res.setHeader('Content-Type', 'text/plain');
      res.write('Cannot load the database');
    }
  }
}

module.exports = StudentsController;
