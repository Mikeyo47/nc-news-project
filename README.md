# Northcoders News API

[Link to Hosted Version](https://nc-news-project-cyk6.onrender.com/api)

## Summary

This project is an API designed to serve as the backend for a social news aggregation and discussion website with content rating ability, similar to Reddit. It provides various endpoints for users to interact with and manage content on the platform.

## Dependencies

Before running the project, you need to ensure the following software is installed on your system:

- Node.js v16 or later. Download Node[https://nodejs.org/]
- PostgreSQL 14 or later Download PSQL[https://www.postgresql.org/download/]

## Cloning and Installation

Follow these steps to set up the project locally:

1. Clone the repository:
    ```shell
    git clone <https://github.com/Mikeyo47/nc-news-project>
    ```

2. Change into the project directory:
    ```shell
    cd <project-directory>
    ```

3. Install NPM packages:
    ```shell
    npm install
    ```

4. Set up the test and development databases:
    ```shell
    npm run setup-dbs
    ```

5. Create two `.env` files in the root of the project: 
    a. `.env.development` and add PGDATABASE=nc_news into it.
    b. `.env.test` and add PGDATABASE=nc_news_test into it.

    Ensure that these .env files are gitignored so that sensitive information is not exposed in your repository. 
    An example .env-example file has been included as a reference.

6. Seed the development database:
    ```shell
    npm run seed
    ```

7. Run all tests for the project:
    ```shell
    npm test
    ```

## Background

This project has been created as part of the Northcoders bootcamp using Node.js, Express.js, and PostgreSQL, following the MVC design patterns and TDD.

Please make sure to follow the installation instructions and have the necessary dependencies before running the project locally. If you encounter any issues or have questions, feel free to reach out or send a pull request.