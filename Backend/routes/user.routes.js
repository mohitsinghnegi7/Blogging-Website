import {Router } from 'express'
import { registerUser,loginUser,checkCookie, logoutUser, getProfileData, changePassword,favouriteBlogsUser  } from '../controllers/user.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'


const userRouter = Router()

userRouter.route("/signup").post(registerUser)
userRouter.route("/login").post(loginUser)
userRouter.route('/check-cookie').get(checkCookie)
userRouter.route('/logout').post(logoutUser)
userRouter.route('/getProfileData').get(authMiddleware.verifyToken,authMiddleware.authorizedRole('user'),getProfileData)
userRouter.route('/changePassword').patch(authMiddleware.verifyToken,authMiddleware.authorizedRole('user'),changePassword)
userRouter.route('/getFavouriteBlogs').get(authMiddleware.verifyToken,authMiddleware.authorizedRole('user'),favouriteBlogsUser)

export default userRouter