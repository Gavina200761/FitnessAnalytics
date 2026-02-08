const fs = require('fs');
const csv = require('csv-parser');

async function workoutCalculator(filePath) {
  try {
    // Check if file exists first
    if (!fs.existsSync(filePath)) {
      console.error(`Error: File not found at ${filePath}`);
      return;
    }

    const workouts = [];
    let totalMinutes = 0;

    // Read the CSV file asynchronously using csv-parser
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          try {
            workouts.push(row);
            const duration = parseInt(row.duration, 10);
            
            if (!isNaN(duration)) {
              totalMinutes += duration;
            }
          } catch (error) {
            reject(new Error(`Error processing row: ${error.message}`));
          }
        })
        .on('end', () => {
          resolve();
        })
        .on('error', (error) => {
          reject(new Error(`Error reading CSV file: ${error.message}`));
        });
    });

    // Count total workouts
    const totalWorkouts = workouts.length;

    console.log(`Total workouts: ${totalWorkouts}`);
    console.log(`Total minutes: ${totalMinutes}`);

    return { totalWorkouts, totalMinutes };
  } catch (error) {
    // Handle errors with clear error messages
    if (error.message.includes('not found')) {
      console.error(`Error: CSV file is missing at ${filePath}`);
    } else if (error.message.includes('CSV')) {
      console.error(`Error: CSV file is corrupted or invalid at ${filePath}`);
    } else {
      console.error(`Error: ${error.message}`);
    }
  }
}


