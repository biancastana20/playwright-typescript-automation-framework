# Playwright Hybrid Automation Framework (UI & API)

The automation framework built with **Playwright** and **TypeScript**. It demonstrates a scalable architecture for end-to-end testing of both UI layers (SauceDemo) and API layers (ReqRes), incorporating industry-standard patterns like **Page Object Model (POM)** and **Dynamic Environment Management**.

## 🚀 Key Features
* **Multi-Environment Support:** Seamlessly switch between `TEST`, and `UAT` environments.
* **Page Object Model (POM):** Clean separation of test logic from UI locators.
* **Hybrid Testing:** Integrated suite for both Frontend (UI) and Backend (API) validation.
* **CI/CD Ready:** Fully integrated with **GitHub Actions** for automated regression.
* **Secure Config:** Protected handling of credentials using `dotenv` and **GitHub Secrets**.

## 🛠️ Tech Stack
* **Playwright:** Core engine for browser and API automation.
* **TypeScript:** Ensures code reliability through strong typing.
* **Dotenv:** Manages environment-specific configurations.
* **GitHub Actions:** Continuous Integration runner.
* **Cross-env:** Ensures environment variables work across Windows, Mac, and Linux.

## 📂 Project Structure
```text
├── .github/workflows/    # CI/CD Pipeline (GitHub Actions)
├── pages/                # Page Object Model classes
├── tests/
│   ├── api/              # Backend/API test suite
│   └── ui/               # Frontend/UI test suite
├── .env                  # Environment variables (Local only, ignored by Git)
├── .gitignore            # Excludes node_modules, .env, and auth states
├── playwright.config.ts  # Centralized framework configuration
└── package.json          # Scripts and dependencies