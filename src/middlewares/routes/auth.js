import { check } from 'express-validator'
import expressValidation from '../expressValidation.js'

const middleware = {
    show: [
        expressValidation,
        check('email').notEmpty(),
        check('password').notEmpty(),
    ]
}

export {
    middleware
}
export default middleware;