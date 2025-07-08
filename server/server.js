import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import transactionRoutes from './routes/transactions.js';
import budgetRoutes from './routes/budget.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);

// Replace with your MongoDB Atlas URI
mongoose.connect('mongodb+srv://franklopes:vC96VnPK89CyAXwT@cluster0.mklaxkb.mongodb.net/')
  .then(() => console.log('MongoDB connected'))
  .catch(console.error);

app.listen(5000, () => console.log('Server running on port 5000'));
