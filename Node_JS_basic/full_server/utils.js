const fs = require('fs');

function readDatabase(path) {
  if (fs.existsSync(path)) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf-8', (err, data) => {
        if (err) reject(Error());
        const nameOfStudents = {};
        let lines = data.split('\n').map((line) => line.split(',').map((field) => field.trim().replace('\r', '')));
        lines = lines.slice(1, lines.length - 1);
        const getField = {};
        lines.forEach((line) => {
          getField[line[line.length - 1]] = getField[line[line.length - 1]] + 1 || 1;
        });

        for (const field in getField) {
          if (field) {
            const names = lines.filter((line) => line[line.length - 1] === field)
              .map((name) => name[0]);
            nameOfStudents[field] = names;
          }
        }
        resolve(nameOfStudents);
      });
    });
  }
  throw new Error('Cannot load the database');
}

module.exports = readDatabase;
