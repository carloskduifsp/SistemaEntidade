const fs = require('fs');
const { execSync } = require('child_process');

// Read the current version from the version.json file
const versionFile = fs.readFileSync('./src/version.json');
const versionData = JSON.parse(versionFile);
const currentVersion = versionData.version;

// Increment the version number
const newVersion = currentVersion + 1;
versionData.version = newVersion;

// Write the new version back to the version.json file
fs.writeFileSync('./src/version.json', JSON.stringify(versionData, null, 2));

// Deploy the site using the Firebase CLI
//execSync('./dev_front_deploy.sh', { stdio: 'inherit' });

console.log(`Deployed version ${newVersion} of the site.`);