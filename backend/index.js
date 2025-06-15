import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';

// files:
import connectDB from './config/db.js';
dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('API is running....');
});

// Serve static files from the React app
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/dist')));

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'))
//   );
// } else {
//   app.get('/', (req, res) => {
//     res.send('API is running....');
//   });
// }

// routes
import userRoutes from './routes/user.routes.js';
import genreRoute from './routes/genre.routes.js';
import movieRoutes from './routes/movie.routes.js';
import uploadRoutes from './routes/upload.routes.js';
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/genre', genreRoute);
app.use('/api/v1/movie', movieRoutes);

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});


