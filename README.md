# 📊 Rate Limiting Algorithms in Node.js Using Typescript

This project demonstrates how to implement popular **rate limiting algorithms** in Nodejs & Express. It's based on the concepts explained in this excellent [GeeksForGeeks article](https://www.geeksforgeeks.org/system-design/rate-limiting-algorithms-system-design/).

## 📌 Purpose

Rate limiting is essential in distributed systems and APIs to:

- Prevent abuse or DoS attacks
- Enforce fair usage policies
- Control traffic spikes
- Maintain backend stability

This project offers clean and yet simple implementations of each algorithm to help developers understand how they work under the hood and integrate them into their own systems.

## 🧠 Algorithms Covered

The project includes implementations of the following rate limiting techniques:

### 1. Token Bucket

- Allows short bursts while maintaining a steady average rate.
- Suitable when occasional spikes in traffic are acceptable.

### 2. Leaky Bucket

- Processes requests at a constant rate.
- Smooths out bursts and prevents overload.

### 3. Fixed Window Counter

- Simple and efficient for limiting requests in discrete time windows (e.g., 100 requests per minute).

### 4. Sliding Window Log

- More accurate than fixed windows by using a rolling log of timestamps.
- Ensures consistent rate limiting across time boundaries.

## NOTE

The MemoryStore can be replaced with a redis database.

## HOW TO RUN

1. Clone this repo:

   ```bash
   git clone https://github.com/EArnold1/rate-limiter-algorithms.git
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Try It Out

   You can test each rate limiting algorithm by visiting the following routes. Each route is limited to **5 requests per minute**:

   - `/token-bucket` – Implements the Token Bucket algorithm
   - `/leaky-bucket` – Implements the Leaky Bucket algorithm
   - `/fixed-window` – Implements the Fixed Window algorithm
   - `/sliding-window` – Implements the Sliding Window algorithm

   Start your server, then open your browser or use a tool like `curl`, Postman, or any HTTP client to hit each endpoint and observe the rate limiter in action.
