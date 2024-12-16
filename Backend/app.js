 import express from 'express'
 import cors from 'cors'
import userRouter from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import { adminRouter } from './routes/admin.routes.js';
import categoryRouter from './routes/category.routes.js';
import blogRouter from './routes/blog.routes.js';

 const app = express();

 app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
 }));
 app.use(express.json(
    {
        limit : "50mb"
    }
 ));
app.use(cookieParser())

 app.use('/api/v1/users',userRouter)
 app.use('/api/v1/admin',adminRouter)
 app.use('/api/v1/category',categoryRouter)
 app.use('/api/v1/blog',blogRouter)

 export default app