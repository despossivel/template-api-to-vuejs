import { check } from 'express-validator'
import expressValidation from '../expressValidation.js'
import Jwt from '../Jwt.js'
import prisma from '../../config/connection.js'

const middleware = {
    index: [
        Jwt.verify,
        expressValidation
    ],
    show: [
        Jwt.verify,
        check("id").notEmpty(),
        expressValidation
    ],
    store: [
        Jwt.verify,
        check('name').notEmpty(),
        check('email').notEmpty().isEmail().custom(async (value) => {
            const user = await prisma.user.count({
                where: {
                    email: value,
                },
            });

            if(user) return Promise.reject('Email is already in use!')
          
        }),
        check('password').notEmpty().isLength({ min: 7 }).withMessage('Your password must be at least 5 characters long'),
        expressValidation
    ],
    update: [
        Jwt.verify,
        check('id').notEmpty(),
        expressValidation
    ],
    destroy: [
        Jwt.verify,
        check('id').notEmpty(),
        expressValidation
    ]
}

export {
    middleware
}
export default middleware;