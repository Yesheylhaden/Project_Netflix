#  Netflix Clone Backend

This is the backend server for a Netflix Clone application, developed using **Node.js**, **Express.js**, and **MongoDB**. It provides RESTful API endpoints for user authentication and movie resource management. The backend is part of a full-stack project for the WEB102 Server Application Fundamentals course.

---

##  Tech Stack

- **Backend Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JSON Web Tokens (JWT)
- **Password Security:** bcryptjs
- **Environment Management:** dotenv
- **Development Tooling:** nodemon

---

##  Folder Structure

![Folder Structure](../netflix-backend/Structure.jpg)

---

##  Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-team/netflix-backend.git
cd netflix-backend
```

### 2. Install dependencies
npm install

### 3. Create a .env file
```bash
PORT=5000
JWT_SECRET=your_jwt_secret_here
MONGO_URI=mongodb://localhost:27017/netflixclone
Make sure MongoDB is running locally, or replace with your cloud URI.
```

### 4. Start the server
```bash
nodemon server.js
```

## Authentication Endpoints
### POST /api/v1/auth/register
Registers a new user.
```json
Request Body:
{
  "username": "john",
  "email": "john@example.com",
  "password": "123456"
}
```
Response:
```json
{
  "message": "User registered successfully"
}
```

### POST /api/v1/auth/login
Logs in a user and returns a JWT token.
```json
Request Body:
{
  "email": "john@example.com",
  "password": "123456"
}
```
Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Use this token for protected routes:
```makefile
Authorization: Bearer <your_token>
```

## Movie Endpoints
All movie routes are prefixed with /api/v1/movies.

### POST /api/v1/movies
Create a new movie entry.
Request Body:
```json
{
  "title": "Inception",
  "description": "A mind-bending thriller",
  "genre": "Sci-Fi",
  "releaseYear": 2010
}
```
Response:
```json
{
  "message": "Movie created",
  "movie": { ...movieData }
}
```

### GET /api/v1/movies
Get all movies.

Response:
```json
[
  {
    "_id": "movieId",
    "title": "Inception",
    "genre": "Sci-Fi",
    ...
  }
]
```
### GET /api/v1/movies/:id
Get a single movie by ID.
Response:
```json
{
  "_id": "movieId",
  "title": "Inception",
  ...
}
```

## Error Handling
All error responses follow this structure:
```json
{
  "message": "Server error",
  "error": "Detailed error message here"
}
```

## Future Improvements
Input validation using Joi or express-validator

Protected movie creation endpoints (JWT auth middleware)

Pagination and filtering for movies

Profile and watchlist features