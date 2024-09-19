const http = require('http');
const countStudents = require('./3-read_file_async'); // Import the countStudents function
const url = require('url');

const hostname = 'localhost';
const port = 1245;

// Create the HTTP server
const app = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/') {
    // Handle the root URL path "/"
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (parsedUrl.pathname === '/students') {
    // Handle the "/students" URL path
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is the list of our students\n');

    // Retrieve the path to the database from the command-line arguments
    const databasePath = process.argv[2];

    // Call the countStudents function and process the results
    countStudents(databasePath)
      .then(() => {
        // Success: Students are already logged by the countStudents function
        res.end(); // End the response after students have been listed
      })
      .catch((error) => {
        // If there was an error, display an appropriate message
        res.end(`${error.message}`);
      });
  } else {
    // Handle undefined routes
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Make the server listen on port 1245
app.listen(port, hostname, () => {
  console.log('Server running at http://' + hostname + ':' + port);
});

// Export the app for testing or further use
module.exports = app;
