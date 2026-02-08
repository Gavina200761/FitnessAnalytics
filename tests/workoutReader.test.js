const workoutCalculator = require('../workoutReader');
const path = require('path');

describe('workoutCalculator', () => {
  // Test 1: Successfully reads and processes a valid CSV file
  test('should read a valid CSV file and return the correct data structure', async () => {
    const filePath = path.join(__dirname, '../data/workouts.csv');
    const result = await workoutCalculator(filePath);

    // Verify the returned object has the expected structure
    expect(result).toHaveProperty('totalWorkouts');
    expect(result).toHaveProperty('totalMinutes');
    expect(typeof result.totalWorkouts).toBe('number');
    expect(typeof result.totalMinutes).toBe('number');
    expect(result.totalWorkouts).toBeGreaterThan(0);
    expect(result.totalMinutes).toBeGreaterThan(0);
  });

  // Test 2: Error handling when file is missing
  test('should handle missing files gracefully', async () => {
    const filePath = path.join(__dirname, '../data/nonexistent.csv');
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const result = await workoutCalculator(filePath);

    // Should log an error message or return undefined
    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error'));

    consoleSpy.mockRestore();
  });

  // Test 3: Data structure validation
  test('should return correct data structure with totalWorkouts and totalMinutes as numbers', async () => {
    const filePath = path.join(__dirname, '../data/workouts.csv');
    const result = await workoutCalculator(filePath);

    expect(Number.isInteger(result.totalWorkouts)).toBe(true);
    expect(Number.isInteger(result.totalMinutes)).toBe(true);
    expect(result.totalWorkouts).toBeGreaterThanOrEqual(0);
    expect(result.totalMinutes).toBeGreaterThanOrEqual(0);
  });
});