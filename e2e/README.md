# Cypress E2E Testing

## Getting Started

* `npm ci` to install the packages

## Configuration

* Add `.env` with `.env.example` as template
* Change the `baseUrl` property in `cypress.json`

## Writing a test

* Write the Test using any `.js` file in the `intergration` directory

## Running tests

* `npx cypress open` to start cypress
* `npx cypress run --spec **/*.feature` to run headless

## Results

* Failing Tests will result in output in the `screenshots` and `videos` folders
