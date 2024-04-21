import { Router } from 'express'
import middleware from '../middlewares/routes/user.js'
import User from '../controllers/User.js'

const route = new Router()
 
route.get('/users',middleware.index, User.index)
route.get('/user/:id',middleware.show, User.show)
route.post('/user', middleware.store, User.store)
route.put('/user/:id', middleware.update, User.update)
route.delete('/user/:id', middleware.destroy, User.destroy)

export default route;