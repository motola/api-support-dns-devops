const fs = require('fs');
const readline = require('readline');
const path = require('path')




// Function to read and set env variables

async function conf() {
    let primaryConfig;
    let fallbackConfig;

    // Define file paths
    if (process.platform === 'win32') {
        primaryConfig = path.join(__dirname, 'env.txt'); // Primary file for Windows
        fallbackConfig = path.join(__dirname, '/etc/php/8.3/fpm/pool.d/www.conf'); // Fallback file for Windows
    } else {
        primaryConfig = '/etc/php/8.3/fpm/pool.d/www.conf'; // Primary file for Unix-like systems
        fallbackConfig = path.join(__dirname, 'env.txt'); // Fallback file for Unix-like systems
    }

    // Check if the primary file exists
    let filePath = primaryConfig;
    if (!fs.existsSync(primaryConfig)) {
        console.warn(`Primary file not found: ${primaryConfig}. Falling back to ${fallbackConfig}`);
        filePath = fallbackConfig;
    }

    try {
        const fileStream = fs.createReadStream(filePath);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        for await (const line of rl) {
            const match = line.match(/^env\[(\w+)\]\s*=\s*"([^"]+)"$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim();
                process.env[key] = value;
                console.log(`${key}=${value}`);
            }
        }
    } catch (error) {
        console.error(`Error reading the file ${filePath}:`, error.message);
    }
}

module.exports = conf