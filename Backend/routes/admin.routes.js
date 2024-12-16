import { Router } from "express";
import { addBlog, loginAdmin } from "../controllers/admin.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const adminRouter = Router()

adminRouter.route('/login').post(loginAdmin)
adminRouter.route('/addBlog').post(authMiddleware.verifyToken,authMiddleware.authorizedRole('admin'),addBlog)


export {
    adminRouter
}
