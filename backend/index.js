import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import profileRoutes from './routes/profile.js';


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/profile', profileRoutes);

mongoose.connect('mongodb+srv://anshul-010:anshul@cluster0.ui9hsmm.mongodb.net/platfomatorydb').then(() => {
  app.listen(8000, () => console.log('Server running on port 8000'));
});