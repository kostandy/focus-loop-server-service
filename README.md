# Focus Loop Server

## Project Overview

Focus Loop Server is the backend service for the Focus Loop application, a new generation task-tracking dApp. This service is responsible for handling API requests, managing the database, and providing the necessary backend logic for the application.

## Technology Stack

- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB**
- **Docker**
- **Docker Compose**

## Setup

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v22 or higher)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/kostandy/focus-loop-server-service.git
    cd focus-loop-server
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

### Environment Variables

Create a [.env](http://_vscodecontentref_/1) file in the root directory and add the following environment variables:

```env
NODE_ENV=development
SERVER_PORT=3000
MONGODB_INITDB_ROOT_USERNAME=your_mongo_username
MONGODB_INITDB_ROOT_PASSWORD=your_mongo_password
MONGO_URI=mongodb://${MONGODB_INITDB_ROOT_USERNAME}:${MONGODB_INITDB_ROOT_PASSWORD}@mongo/
```

## Running the Project

### Development

To start the development server:

```npm run dev```

The server will start on <http://localhost:3000>.

### Production

To build and start the server in production mode:

```bash
npm run build
npm start
```

### Docker

To run the server using Docker:

1. Build and start the Docker containers:

    ```bash
    docker compose up -d --build
    ```

2. To stop the containers:

    ```bash
    docker compose down
    ```

## FAQ

### How do I change the server port?

You can change the server port by modifying the `SERVER_PORT` variable in the .env file.

### How do I connect to a different MongoDB instance?

Update the `MONGO_URI` variable in the .env file with the connection string of your MongoDB instance.

### How do I rebuild the Docker containers?

To rebuild the Docker containers without using the cache:

```bash
docker compose build --no-cache
```

### How do I view the logs?

To view the logs of all services in real-time:

```bash
docker compose logs -f
```

### How do I stop the Docker containers without removing them?

To stop the Docker containers without removing them:

```bash
docker compose stop
```

### How do I run tests?

To run the tests, use the following command:

```bash
npm test
```

### How do I update dependencies?

To update the dependencies, run:

```bash
npm update
```

### How do I check for outdated dependencies?

To check for outdated dependencies, run:

```bash
npm outdated
```

### How do I format the code?

To format the code, run:

```bash
npm run format
```

### How do I lint the code?

To lint the code, run:

```bash
npm run lint
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.
