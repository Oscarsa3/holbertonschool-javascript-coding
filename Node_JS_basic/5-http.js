const http = require('http');
const countStudents = require('./3-read_file_async');

const hostname = '127.0.0.1';
const port = 1245;

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.write('This is the list of our students\n');
    countStudents(process.argv[2])
      .then((data) => {
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
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
