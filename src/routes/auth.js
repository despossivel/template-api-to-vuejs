import { Router } from 'express'
import middleware from '../middlewares/routes/auth.js'
import Auth from '../controllers/Auth.js'

const authRoutes = new Router()

authRoutes.post('/auth', middleware.show, Auth.show)

export default authRoutes
export {
    authRoutes
}