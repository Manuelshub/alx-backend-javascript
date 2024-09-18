const fs = require('fs');

function countStudents(path) {
  try {
    // Read file synchronously
    const data = fs.readFileSync(path, 'utf8');

    // Split by new lines and filter out empty lines
    const lines = data.trim().split('\n').filter((line) => line.length > 0);

    // Check if there are enough lines to process (header + students)
    if (lines.length <= 1) {
      console.log('Number of students: 0');
      return;
    }

    // Remove the header (first line)
    const headers = lines[0].split(',');

    // Prepare a structure to hold students by field
    const studentsByField = {};

    // Loop through each line (skipping the header)
    for (let i = 1; i < lines.length; i += 1) {
      const studentData = lines[i].split(',');

      // Ensure that we have the correct number of columns
      if (studentData.length === headers.length) {
        const firstName = studentData[0];
        const field = studentData[3]; // Assuming the field is in the 4th column (index 3)

        // Add student to the correct field category
        if (!studentsByField[field]) {
          studentsByField[field] = [];
        }
        studentsByField[field].push(firstName);
      }
    }

    // Log total number of students
    const totalStudents = Object.values(studentsByField)
      .reduce((sum, students) => sum + students.length, 0);
    console.log(`Number of students: ${totalStudents}`);

    // Log number of students per field and their names
    for (const [field, students] of Object.entries(studentsByField)) {
      console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
    }
  } catch (err) {
    // Handle any errors (file not found, etc.)
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
