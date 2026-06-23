## About This Project

This is a professional end-to-end automation test suite targeting a real e-commerce web application. It was built to demonstrate practical QA automation skills using two of the most in-demand frameworks in the industry — Playwright and Cypress — side by side in the same repository.

The project follows the Page Object Model (POM) design pattern, which separates page interaction logic from test logic. This makes the tests easier to read, maintain, and scale — the same way automation is structured on real engineering teams.

## What's Covered

- **Authentication** — valid login, locked accounts, invalid credentials, empty field validation, logout
- **Products** — verifying product count, sorting by name and price in all four directions
- **Shopping Cart** — adding and removing items, verifying product names and prices, cart persistence across navigation
- **Checkout** — full happy path order completion, form validation for all required fields, order confirmation, subtotal accuracy across multiple items

## Why Two Frameworks?

Playwright and Cypress solve similar problems but are used differently across teams. Playwright is written in TypeScript here and runs tests across Chromium, Firefox, and WebKit simultaneously. Cypress is written in JavaScript and excels at real-time debugging with its interactive test runner. Having both in one project shows adaptability — a common expectation for QA roles in 2025 and beyond.

## CI/CD

A GitHub Actions pipeline runs both test suites automatically on every push and pull request, and on a daily schedule. Failed runs upload screenshots and videos as artifacts so failures can be investigated without re-running locally.