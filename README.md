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

### Build and Run with Docker

```bash
# 1. Clone the repository
git clone https://github.com/samisrouji/frontend.git
cd frontend

# 2. Build the Docker image
docker build -t emarket-frontend .

# 3. Run the container
docker run -d -p 8080:80 --name emarket-frontend-container emarket-frontend
```

The app will be available at `http://localhost:8080`.

### Docker Commands

- **Stop the container:** `docker stop emarket-frontend-container`
- **Remove the container:** `docker rm emarket-frontend-container`
- **View logs:** `docker logs emarket-frontend-container`

## Docker Compose

For a simpler setup using Docker Compose, follow these steps:

```bash
# 1. Clone the repository
git clone https://github.com/samisrouji/frontend.git
cd frontend

# 2. Build and run with docker-compose
docker-compose up --build
```

The app will be available at `http://localhost:8080`.

### Docker Compose Commands

- **Start the container:** `docker-compose up`
- **Start in background:** `docker-compose up -d`
- **Stop the container:** `docker-compose down`
- **View logs:** `docker-compose logs -f`