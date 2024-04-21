import { Router } from 'express'
import middleware from '../middlewares/routes/student.js'
import Student from '../controllers/Student.js'

const route = new Router()
 
route.get('/students',middleware.index, Student.index)
route.get('/student/:id',middleware.show, Student.show)
route.post('/student', middleware.store, Student.store)
route.put('/student/:id', middleware.update, Student.update)
route.delete('/student/:id', middleware.destroy, Student.destroy)

export default route;