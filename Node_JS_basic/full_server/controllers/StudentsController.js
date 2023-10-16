import readDatabase from '../utils';

const fs = require('fs');

const db = process.argv[2];

class StudentsController {
  static getAllStudents(req, res) {
    if (fs.existsSync(db)) {
      const log = [];
      readDatabase(db)
        .then((data) => {
          log.push('This is the list of our students');
          for (const field in data) {
            if (field) {
              log.push(`Number of students in ${field}: ${data[field].length}. List: ${data[field].join(', ')}`);
            }
          }
          res.status(200);
          res.setHeader('Content-Type', 'text/plain');
          res.end(log.join('\n'));
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
          res.status(200);
          res.setHeader('Content-Type', 'text/plain');
          res.end(`List: ${data[major].join(', ')}`);
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
