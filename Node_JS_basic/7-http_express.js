const express = require('express');
const fs = require('fs');
const countStudents = require('./3-read_file_async');

const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  if (fs.existsSync(process.argv[2])) {
    countStudents(process.argv[2])
      .then((data) => {
        res.write('This is the list of our students\n');
        const lines = data;
        const getField = {};
        lines.forEach((line) => {
          getField[line[line.length - 1]] = getField[line[line.length - 1]] + 1 || 1;
        });
        res.write(`Number of students: ${lines.length}\n`);

        for (const field in getField) {
          if (field) {
            const names = lines.filter((line) => line[line.length - 1] === field)
              .map((name) => name[0]);
            res.write(`Number of students in ${field}: ${getField[field]}. List: ${names.join(', ')}\n`);
          }
        }
        res.end();
      })
      .catch((error) => {
        res.end(error.message);
      });
  } else {
    res.send('This is the list of our students\nCannot load the database');
  }
});

app.listen(port, () => {
  console.log(`My app is listening on port ${port}`);
});

module.exports = app;
