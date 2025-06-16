# Movie_MERN

A full-stack MERN (MongoDB, Express.js, React, Node.js) web application for managing and exploring movies. Features include user authentication, movie search, ratings, and reviews.

## Topics/Technologies

- MERN Stack (MongoDB, Express.js, React, Node.js)
- REST API
- Material-UI
- User Authentication
- Movie Database Management

# Movie_MERN Project

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for managing movies with user authentication and movie management features.

## Tech Stack

### Backend

- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- CORS for cross-origin resource sharing
- bcryptjs for password hashing

### Frontend

- React 19 with TypeScript
- Vite as build tool
- Redux Toolkit for state management
- React Router v7 for routing
- TailwindCSS for styling
- React Toastify for notifications
- React Icons

## Project Structure

```
Movie_MERN/
├── backend/
│   ├── config/         # Database configuration
│   ├── routes/         # API routes
│   │   ├── user.routes.js
│   │   ├── genre.routes.js
│   │   ├── movie.routes.js
│   │   └── upload.routes.js
│   └── index.js        # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── store/     # Redux store
│   └── package.json
└── package.json
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   cd frontend && npm install
   ```

3. Create a `.env` file in the root directory with:

   ```
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:
   ```bash
   npm run fullstack
   ```
   This will start both backend (port 3000) and frontend (port 5173) concurrently.

## Available Scripts

- `npm run fullstack`: Runs both frontend and backend
- `npm run backend`: Runs the backend server
- `npm run frontend`: Runs the frontend development server

## API Endpoints

- `/api/v1/user` - User authentication and management
- `/api/v1/genre` - Movie genre operations
- `/api/v1/movie` - Movie CRUD operations
- `/api/v1/upload` - File upload handling

## Features

- User authentication (login/register)
- Movie management (CRUD operations)
- Genre management
- File upload support for movie posters
- Responsive design with TailwindCSS

## Demo Video

[![Watch on YouTube](./uploads/Screenshot%202025-06-16%20114806.png)](https://youtu.be/EH4xf1SRCkQ?si=itNY0FPz0YgIiGuM)

▶️ [Watch video](https://youtu.be/EH4xf1SRCkQ?si=itNY0FPz0YgIiGuM)

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add YourFeature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Submit a pull request

## License

This project is licensed under the ISC License.
