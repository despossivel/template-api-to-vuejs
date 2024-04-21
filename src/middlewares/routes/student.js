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
        check('ra').notEmpty().custom(async (value) => {
            const user = await prisma.student.count({
                where: {
                    ra: String(value),
                },
            });

            if(user) return Promise.reject('R.A. is already in use!')
          
        }),
        check('email').notEmpty().isEmail().custom(async (value) => {
            const user = await prisma.student.count({
                where: {
                    email: String(value),
                },
            });

            if(user) return Promise.reject('Email is already in use!')
          
        }),
        check('cpf').notEmpty().isLength({ min: 14, max: 14 }).notEmpty().custom(async (value) => {
            const user = await prisma.student.count({
                where: {
                    cpf: String(value),
                },
            });

            if(user) return Promise.reject('CPF. is already in use!')
          
        }).withMessage('Your CPF must be at least 14 characters long'),
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