import express from 'express';
import expressAsyncHandler from 'express-async-handler';

const userRouter = express.Router();

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById({email: req.body.email})
    if(user){
        i
    }

  })
);
