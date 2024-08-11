const { exec } = require('child_process');
const path = require('path');

function runPythonScript(scriptName) {
  return new Promise((resolve, reject) => {
    exec(`python ${path.join(__dirname, scriptName)}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error running ${scriptName}: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`Stderr from ${scriptName}: ${stderr}`);
      }
      console.log(`Stdout from ${scriptName}: ${stdout}`);
      resolve();
    });
  });
}

async function runAllScrapers() {
  try {
    await runPythonScript('purdue_events_scrape.py');
    await runPythonScript('purdue_events_clean.py');
    await runPythonScript('boilerlink_scrape.py');
    await runPythonScript('boilerlink_clean.py');
    console.log('All scraping and cleaning tasks completed successfully.');
  } catch (error) {
    console.error('An error occurred during scraping or cleaning:', error);
  }
}

runAllScrapers();