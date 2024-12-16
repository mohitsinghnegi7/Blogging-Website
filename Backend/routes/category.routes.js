import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { addCategory, getBlogByCategory, getCategory } from "../controllers/category.controller.js";

const categoryRouter = Router()

categoryRouter.route('/addCategory').post(authMiddleware.verifyToken,authMiddleware.authorizedRole('admin'),addCategory)
categoryRouter.route('/getCategory').get(getCategory)
categoryRouter.route('/getCategoryByBlog/:id').get(getBlogByCategory)

export default categoryRouter