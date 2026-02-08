const healthMetricsCounter = require('../healthReader');
const path = require('path');

describe('healthMetricsCounter', () => {
  // Test 1: Successfully reads and processes a valid JSON file
  test('should read a valid JSON file and return the correct data type', async () => {
    const filePath = path.join(__dirname, '../data/health-metrics.json');
    const result = await healthMetricsCounter(filePath);

    // Verify the returned value is a number
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThan(0);
  });

  // Test 2: Error handling when file is missing
  test('should handle missing files gracefully', async () => {
    const filePath = path.join(__dirname, '../data/nonexistent.json');
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const result = await healthMetricsCounter(filePath);

    // Should log an error message and return undefined
    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error'));

    consoleSpy.mockRestore();
  });

  // Test 3: Data structure validation
  test('should return a non-negative integer representing total health entries', async () => {
    const filePath = path.join(__dirname, '../data/health-metrics.json');
    const result = await healthMetricsCounter(filePath);

    expect(Number.isInteger(result)).toBe(true);
    expect(result).toBeGreaterThanOrEqual(0);
  });
});
