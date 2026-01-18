Playwright Hybrid Automation Framework (UI & API)
This project is a professional-grade automation framework built with Playwright and TypeScript. It covers end-to-end testing for both the UI layer (SauceDemo) and the API layer (ReqRes), following industry best practices like the Page Object Model (POM) and Data-Driven Testing.

🛠 Tech Stack
Engine: Playwright
Language: TypeScript
Architecture: Page Object Model (POM)
CI/CD: GitHub Actions
Data Management: JSON & Dotenv
Reporting: Playwright HTML Report & Trace Viewer

📂 Project Structure
Plaintext

├── .github/workflows/    # CI/CD Pipeline (GitHub Actions)
├── data/                 # Environment-specific data (JSON)
├── pages/                # Page Object Model classes
├── tests/
│   ├── api/              # Backend/API test suite
│   └── ui/               # Frontend/UI test suite
├── .env                  # Secret environment variables (ignored by Git)
├── playwright.config.ts  # Main framework configuration
└── package.json          # Project dependencies and scripts
⚙️ Features

Environment Agnostic: Easily switch between TEST and UAT environments using environment variables.
CI/CD Integration: Automated test execution on every push or pull request via GitHub Actions.

🚀 Getting Started
1. Prerequisites
Node.js (LTS version recommended)
npm

2. Installation
Bash:
# Clone the repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps

3. Environment Setup
Create a .env file in the root directory and add your credentials:

Plaintext
SAUCE_USERNAME=standard_user
SAUCE_PASSWORD=secret_sauce

4. Running Tests
Bash:
# Run UI tests in headed mode
npm run ui

# Run UI tests in the interactive UI Mode
npm run ui-mode

# Run API tests
npm run api

# Run tests on a specific environment (UAT)
ENV=uat npx playwright test

📊 Reporting
After running tests, generate and open the HTML report:
Bash:
npm run report
To debug failures, use the Trace Viewer included in the report to see step-by-step execution, network logs, and DOM snapshots.