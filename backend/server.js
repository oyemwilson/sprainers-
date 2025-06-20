import path from 'path';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import morgan from 'morgan';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import fetch from 'node-fetch';

// Initialize dotenv to load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize the Express app
const app = express();

// Enable CORS with specific configuration
const allowedOrigins = [
  'https://sprainers-1.onrender.com',
  'http://localhost:3000', // For local development
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Logging middleware for development environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// Serve static files from the uploads directory
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// PayPal client ID endpoint
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// Serve the frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

app.get('/ping', (req, res) => {
  res.status(200).send('Server is awake!');
});

// Self-ping function
function keepAwake() {
  const url = 'https://your-app-url.herokuapp.com/ping'; // Replace with your app's URL
  setInterval(async () => {
    try {
      const response = await fetch(url);
      console.log(`Pinged server: ${response.status}`);
    } catch (error) {
      console.error('Error pinging server:', error);
    }
  }, 300000); // Ping every 5 minutes (300,000 ms)
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );

  keepAwake();
});
