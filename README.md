# Movie Library Backend

## Overview
This is the backend for the Movie Library web application. It provides user authentication, movie list management, and integrates with the frontend for adding movies to lists.

## Features
- User authentication (Sign Up, Sign In)
- Movie list management (create, read, update, delete lists)
- Add movies to lists
- Public and private lists

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- dotenv for environment variables

## Getting Started

### Prerequisites
- Node.js and npm
- MongoDB

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/movie-library-backend.git
   cd movie-library-backend

2. Install Dependencies:
   ```sh
   Yarn install
3. Create a .env file in the root directory and add the following environment variables:
   ```env
   PORT = 5000
   MONGO_URI = your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
4. Start the server:
   ```sh
   yarn run dev

# API Endpoints

## 1. Authentication

*  POST /api/auth/signup: Sign up a new user
    * Request body:
       ```json
       {
         "username": "example",
         "email": "example@example.com",
         "password": "password123"
       }
    * Response:
      ```json
      {
        "token": "jwt_token"
      }
*  POST /api/auth/signin: Sign in an existing user
   * Request body:
       ```json
       {
         "email": "example@example.com",
         "password": "password123"
       }
   * Response:
      ```json
      {
        "token": "jwt_token"
      }
## 2. Movie Lists

* POST /api/lists: Create a new movie list
    * Request headers:
      ```json
      {
        "Authorization": "Bearer jwt_token"
      }
    * Request body:
      ```json
      {
        "name": "Favorite Movies",
        "movies": ["Movie1", "Movie2"],
        "isPublic": true
      }
    * Response:
      ```json
      {
        "list": {
                  "name": "Favorite Movies",
                  "movies": ["Movie1", "Movie2"],
                  "isPublic": true, "user": "user_id"
                }
      }
* GET /api/lists: Get all lists of the authenticated user

    * Request headers:
      ```json
      {
        "Authorization": "Bearer jwt_token"
      }
    * Response:
      ```json
      [ {
        "name": "Favorite Movies",
        "movies": ["Movie1", "Movie2"],
        "isPublic": true, "user": "user_id"
      } ]

* GET /api/lists/:id: Get a public list by ID

    * Response:
      ```json
      {
        "name": "Favorite Movies",
        "movies": ["Movie1", "Movie2"],
        "isPublic": true,
        "user": "user_id"
      }

* POST /api/lists/:id/add-movie: Add a movie to a list

    * Request headers:
      ```json
      {
        "Authorization": "Bearer jwt_token"
      }
    * Request body:
      ```json
      {
        "title": "Movie Title",
        "year": "Year",
        "imdbID": "IMDB ID",
        "poster": "Poster URL"
      }
    * Response:
      ```json
      {
      "list": {
          "name": "Favorite Movies",
          "movies": [
              "Movie1",
              "Movie2",
              {
                  "title": "Movie Title",
                  "year": "Year",
                  "imdbID": "IMDB ID",
                  "poster": "Poster URL"
              }
          ],
          "isPublic": true,
          "user": "user_id"
              }
      }
* DELETE /api/lists/:id: Delete a list

    * Request headers:
      ```json
      {
        "Authorization": "Bearer jwt_token"
      }
    * Response:
      ```json
      {
        "msg": "List removed"
      }

# Frontend Integration
The frontend can handle movie searches using the OMDB API directly. Ensure the frontend includes an input for the OMDB API key and performs the search requests client-side.

# Conclusion
This backend provides the necessary authentication and movie list management features for the movie library application. The frontend will handle movie searches using the OMDB API, and the backend will manage user data and lists securely.
