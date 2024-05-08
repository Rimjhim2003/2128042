# Average Calculator HTTP Microservice

This microservice calculates the average of numbers fetched from a test server based on specified qualifiers (prime, Fibonacci, even, random) within a window size. It exposes a REST API endpoint to retrieve these numbers along with the window's previous and current state, and the calculated average.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Rimjhim2003/2128042.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

## Usage

1. Start the server:

    ```bash
    npm start
    ```

2. Make HTTP requests to the following endpoint:

    ```
    GET /numbers/:qualifier
    ```

    Replace `:qualifier` with one of the following:
    - `p` for prime numbers
    - `f` for Fibonacci numbers
    - `e` for even numbers
    - `r` for random numbers



