const fs = require('fs');

async function healthMetricsCounter(filePath) {
  try {
    // Read the JSON file asynchronously
    const data = await fs.promises.readFile(filePath, 'utf8');
    
    // Parse the JSON data
    const jsonData = JSON.parse(data);
    
    // Count the total number of health entries in the metrics array
    const totalEntries = jsonData.metrics.length;
    
    console.log(`Total health entries: ${totalEntries}`);
    return totalEntries;
  } catch (error) {
    // Handle errors: missing file or invalid JSON
    if (error.code === 'ENOENT') {
      console.error(`Error: File not found at ${filePath}`);
    } else if (error instanceof SyntaxError) {
      console.error(`Error: Invalid JSON format in ${filePath}`);
    } else {
      console.error(`Error reading file: ${error.message}`);
    }
  }
}


