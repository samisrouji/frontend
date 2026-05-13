# Frontend App

This is a **React + TypeScript** frontend application. It displays products and interacts with a backend API.

> ⚠️ **Important:** The backend must be running before starting this frontend, otherwise the default data (products) will not be visible.

## Local Development

To run this app, make sure you have [Node.js](https://nodejs.org/) (v16 or higher recommended) and [npm](https://www.npmjs.com/) installed. Then follow these steps:

```bash
# 1. Clone the repository
git clone https://github.com/samisrouji/frontend.git
cd frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Example on my machine:
The app will be available at `http://localhost:5173`.

## Docker

This project is containerized using Docker. Make sure you have [Docker](https://www.docker.com/) installed and running.

## Docker Compose

For a simple setup using Docker Compose, follow these steps:

```bash
# 1. Clone the repository
git clone https://github.com/samisrouji/frontend.git
cd frontend

# 2. Build and run with docker-compose
docker-compose up --build
```

The app will be available at `http://localhost:8080`.