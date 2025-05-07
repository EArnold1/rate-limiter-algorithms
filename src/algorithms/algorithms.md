# RATE LIMITING ALGORITHMS

### Token Bucket

#### How It Works

A **token bucket** is maintained for each IP address that makes requests to the system. Tokens represent the number of requests a client is allowed to make. Each request consumes one token from the bucket. Tokens are refilled over time at a fixed rate, up to a maximum limit.

### Key Components

- **Store**: The store keeps track of:

  - The number of tokens available for each IP.
  - The timestamp of the last request made by that IP.

- **Request Handler Function**: This function is called on each request and does the following:
  1. **Token Refill**: Calculates how much time has passed since the last request and refills tokens accordingly.
  2. **Token Check and Deduction**: If there are available tokens, it deducts one and allows the request. If not, the request is denied or throttled.

### Example Scenario

- Suppose the bucket holds up to 10 tokens and refills at a rate of 1 token per minute.
- If a user makes 10 quick requests, the bucket will be empty.
- Further requests will be denied until enough time has passed for tokens to refill.
