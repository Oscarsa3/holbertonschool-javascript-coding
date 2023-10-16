import readDatabase from '../utils';

const fs = require('fs');

const db = process.argv[2];

class StudentsController {
  static getAllStudents(req, res) {
    if (fs.existsSync(db)) {
      readDatabase(db)
        .then((data) => {
          res.status(200);
          res.setHeader('Content-Type', 'text/plain');
          res.write('This is the list of our students');

          for (const field in data) {
            if (field) {
              res.write('\n');
              res.write(`Number of students in ${field}: ${data[field].length}. List: ${data[field].join(', ')}`);
            }
          }
          res.end();
        })
        .catch((err) => {
          res.status(500);
          res.setHeader('Content-Type', 'text/plain');
          res.end(err.message);
        });
    } else {
      res.status(500);
      res.setHeader('Content-Type', 'text/plain');
      res.end('Cannot load the database');
    }
  }

  static getAllStudentsByMajor(req, res) {
    if (req.params.major !== 'CS' && req.params.major !== 'SWE') {
      res.status(500);
      res.setHeader('Content-Type', 'text/plain');
      res.end('Major parameter must be CS or SWE');
    } else if (fs.existsSync(db)) {
      readDatabase(db)
        .then((data) => {
          const { major } = req.params;
          if (data[major]) {
            res.status(200);
            res.setHeader('Content-Type', 'text/plain');
            res.end(`List: ${data[major].join(', ')}`);
          }
        })
        .catch((err) => {
          res.status(500);
          res.setHeader('Content-Type', 'text/plain');
          res.end(err.message);
        });
    } else {
      res.status(500);
      res.setHeader('Content-Type', 'text/plain');
      res.end('Cannot load the database');
    }
  }
}

export default StudentsController;
