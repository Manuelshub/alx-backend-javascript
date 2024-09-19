const http = require('http');
const fs = require('fs');

// Function to count students (from the async version)
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

// Create the HTTP server
const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is the list of our students\n');

    // Get the database file path from the command-line arguments
    const databasePath = process.argv[2];

    // Call the countStudents function and handle its result
    countStudents(databasePath)
      .then((result) => {
        res.write(result);
        res.end(); // End the response when the data is fully written
      })
      .catch((error) => {
        res.write(error.message);
        res.end(); // End the response even on error
      });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Listen on port 1245
app.listen(1245, () => {
  console.log('Server is listening on port 1245');
});

module.exports = app;
