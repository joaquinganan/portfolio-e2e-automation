
 ==============================
 Node.js & npm Setup / Checks
 ==============================

 Create missing packages
 npm init

 Install the latest version of npm globally
 npm install -g npm

 Check the installed Node.js version
 node -v

 Check the installed npm version
 npm -v


 =====================================
 Windows PowerShell Execution Settings
 =====================================

 Allow locally created scripts to run in PowerShell (required for some npm tools)
 Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned


 ==============================
 Project Setup & Installation
 ==============================

 Clone the practice project repository from GitHub
 git clone https://github.com/bondar-artem/pw-practice-app.git

 Install project dependencies (force resolves dependency conflicts)
 npm install --force

 Start the application
 npm start


 ==============================
 Running Node Scripts
 ==============================

 Execute a custom Node.js script
 node lessons.js


 ==============================
 Playwright Initialization
 ==============================

 Initialize Playwright in the project (installs browsers & config)
 npm init playwright@latest


 ==============================
 Running Playwright Tests
 ==============================

 Run all Playwright tests
 npx playwright test

 Run tests only in Chromium
 npx playwright test --project=chromium

 Run Chromium tests with browser UI visible
 npx playwright test --project=chromium --headed

 Run a specific test file in Chromium with UI
 npx playwright test example.spec.js --project=chromium --headed

 Run tests matching a specific test name or description
 npx playwright test -g "has title" --project=chromium --headed

 Alternative way to target tests containing a specific string
 npx playwright test "has title" --project=chromium --headed

 Run all Chromium tests with UI enabled
 npx playwright test --project=chromium --headed

 Open Playwright’s interactive test UI
 npx playwright test --ui

 Run tests with trace recording enabled (useful for debugging)
 npx playwright test --project=chromium --trace on

 Test Data Generator (also save it into the dependencies)
 npm i @faker-js/faker --save-dev --force 


 ==============================
 Playwright Test Reports
 ==============================

 Open the last generated Playwright HTML report
 npx playwright show-report


 ==============================
 File System Navigation
 ==============================

 Move up one directory (PowerShell / Windows)
 cd ..\


 ==============================
 PowerShell Command History
 ==============================

 Show recent PowerShell command history
 Get-History

 Display the file path where PowerShell command history is saved
 cat (Get-PSReadlineOption).HistorySavePath