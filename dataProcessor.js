require('dotenv').config();
const workoutCalculator = require('./workoutReader');
const healthMetricsCounter = require('./healthReader');

async function processFiles() {
  try {
    // Get environment variables
    const userName = process.env.USER_NAME;
    const weeklyGoal = parseInt(process.env.WEEKLY_GOAL, 10);

    console.log(`Processing data for: ${userName}`);
    console.log('📁 Reading workout data...');

    // Call the workout reader function
    const workoutData = await workoutCalculator('./data/workouts.csv');
    
    console.log('📁 Reading health data...');

    // Call the health reader function
    const healthEntries = await healthMetricsCounter('./data/health-metrics.json');

    // Display the summary
    console.log('\n=== SUMMARY ===');
    console.log(`Workouts found: ${workoutData.totalWorkouts}`);
    console.log(`Total workout minutes: ${workoutData.totalMinutes}`);
    console.log(`Health entries found: ${healthEntries}`);
    console.log(`Weekly goal: ${weeklyGoal} minutes`);

    // Check if weekly goal is met
    if (workoutData.totalMinutes >= weeklyGoal) {
      console.log(`🎉 Congratulations ${userName}! You have exceeded your weekly goal!`);
    } else {
      const remaining = weeklyGoal - workoutData.totalMinutes;
      console.log(`⏱️ You need ${remaining} more minutes to reach your weekly goal of ${weeklyGoal} minutes.`);
    }
  } catch (error) {
    console.error(`Error processing files: ${error.message}`);
    console.error('Please ensure all required files are present and properly formatted.');
  }
}

// Execute the main function
processFiles();
