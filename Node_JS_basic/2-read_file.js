const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf-8');
    let lines = data.split('\n').map((line) => line.split(',').map((field) => field.trim().replace('\r', '')));
    lines = lines.slice(1, lines.length);
    const getField = {};
    lines.forEach((line) => {
      getField[line[line.length - 1]] = getField[line[line.length - 1]] + 1 || 1;
    });
    console.log(`Number of students: ${lines.length}`);

    for (const field in getField) {
      if (field) {
        const names = lines.filter((line) => line[line.length - 1] === field)
          .map((name) => name[0]);
        console.log(`Number of students in ${field}: ${getField[field]}. List: ${names.join(', ')}`);
      }
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;