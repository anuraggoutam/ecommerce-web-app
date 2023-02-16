import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
import connectDB from './config.js';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRouter.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
  next();
});
app.listen(PORT, () => {
  console.log(`Server at http:localhost:${PORT}`);
});

export default productRouter;
