import { Router } from "express";
import { addToFavourite, fetchAllBlogs, getDescription, recentBlogs,removeFavourite } from "../controllers/blog.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const blogRouter = Router()

blogRouter.route('/allBlogs').get(fetchAllBlogs)
blogRouter.route('/recentBlogs').get(recentBlogs)
blogRouter.route('/getDescription/:id').get(getDescription)
blogRouter.route('/addFavourite/:id').put(authMiddleware.verifyToken,authMiddleware.authorizedRole('user'),addToFavourite)
blogRouter.route('/removeFavourite/:id').put(authMiddleware.verifyToken,authMiddleware.authorizedRole('user'),removeFavourite)

export default blogRouter
