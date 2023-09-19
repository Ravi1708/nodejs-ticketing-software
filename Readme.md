# Nodejs Ticketing Software

## Description

basic ticketing software using nodejs, express, and mariadb

## Installation

1. Clone the repo

    ```sh
    git clone https://github.com/Ravi1708/nodejs-ticketing-software.git
    ```

2. Install NPM packages

    ```sh
    npm install
    ```

3. Start project
    ```sh
    node server.js
    ```

## Usage

1. Open browser and go to localhost:5000
2. Click on the button to create a ticket
3. Fill out the form and submit

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Deploy using pm2

1. Install pm2

    ```sh
    npm install pm2 -g
    ```

2. Start project

    ```sh
    pm2 start server.js
    ```

3. Save pm2 process list

    ```sh
    pm2 save
    ```
