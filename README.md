# Backend Installation Guide

This project is a backend API built with **AdonisJS**, **PostgreSQL**, and **Docker**.

---

## Technologies Used

- **AdonisJS** – Node.js framework
- **PostgreSQL** – Database
- **Docker & Docker Compose** – Containerization

---

## Installation

### 1. Clone the repository

```bash
git clone git@github.com:Cece-111/projet_final_clean_code.git
cd projet_final_clean_code
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run Docker (PostgreSQL)
Make sure Docker is running on your machine, then start the containers:
```bash
docker-compose up
```

### 4. Environment configuration

Create a .env file at the root of the project and add the following content:
```.env
TZ=UTC
PORT=8080
HOST=localhost
LOG_LEVEL=info
APP_KEY=JOIJIJDSIOJDIOSJDIOJSIDOJSIODJIOSJDO
NODE_ENV=development

DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=cleancode
DB_PASSWORD=projetcleancode
DB_DATABASE=clean_code_db
```
### 5. Run database migrations and database seeders
```bash
node ace migration:run
node ace db:seed
```

### 6. Start the application
```bash
npm run dev
```

The API will be available at:
```arduino
http://localhost:8080
```

### 7. API Documentation (Swagger)
A Swagger documentation route is available at:
```arduino
http://localhost:8080/docs
```
This endpoint allows you to explore and test the API easily.
