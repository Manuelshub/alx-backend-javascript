const express = require('express');

const fs = require('fs');

const app = express();

const hostname = 'localhost';
const port = 1245;

const databasePath = process.argv[2];

function countStudents(filePath) {
  return new Promise((resolve, reject) => {
  // Read the file asynchronously
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const content = data.trim().split('\n');
      const headers = content[0].split(',');
      const students = content.slice(1);

      if (students.length === 0) {
        resolve('No students found');
        return;
      }

      const fieldIndex = headers.indexOf('field');
      const nameIndex = headers.indexOf('firstname');

      // Organize students by field
      const fields = {};
      students.forEach((student) => {
        const studentData = student.split(',');
        const field = studentData[fieldIndex];
        const name = studentData[nameIndex];

        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(name);
      });

      let output = `Number of students: ${students.length}\n`;
      for (const field in fields) {
        if (Object.prototype.hasOwnProperty.call(fields, field)) {
          output += `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}\n`;
        }
      }

      resolve(output.trim());
    });
  });
}

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.write('This is the list of our students\n');

  countStudents(databasePath)
    .then((output) => {
      res.write(output);
      res.end();
    })
    .catch((error) => {
      res.send(error.message);
      res.end();
    });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
