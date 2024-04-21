import prisma from '../config/connection.js'
import blowfish from "../utils/blowfish.js"
import { response } from '../utils/index.js'

class User {

    async index(req, res) {
        const users = await prisma.user.findMany()
        response(res, users, { errors: [{ "msg": "No users found!" }] });
    }

    async show(req, res) {
        try {
            const { id } = req.params;

            const user = await prisma.user.findUnique({
                where: {
                    id: Number(id),
                },
            });

            if (!user) return response(res, [], { errors: [{ msg: "user not found!" }] });

            return response(res, [user]);
        } catch (error) {
            console.error("Error while fetching user:", error);
            return response(res, [], { errors: [{ msg: "Internal server error" }] }, 422);
        }
    }


    async store(req, res) {
        try {
            const doc = req.body
            const passwordEncrypt = blowfish.encrypt(doc?.password);

            doc.password = passwordEncrypt
             
            const user = await prisma.user.create({
                data: doc,
            })

            return response(res, [user]);
        } catch (error) {
            console.error("Error while creating user:", error);
            return response(res, [], { errors: [{ msg: "Failed to create user" }] }, 422);
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;

            const { ra, cpf, email, ...rest } = req.body;
            const doc = rest;

            const updateduser = await prisma.user.update({
                where: {
                    id: Number(id),
                },
                data: doc,
            });

            return response(res, [updateduser]);
        } catch (error) {
            console.error("Error while updating user:", error);
            return response(res, [], { errors: [{ msg: "Failed to update user" }] }, 422);
        }
    }




    async destroy(req, res) {
        try {
            const { id } = req.params;

            const checkExist = await prisma.user.count({
                where: {
                    id: Number(id),
                },
            });

            if (checkExist) {
                const deleteduser = await prisma.user.delete({
                    where: {
                        id: Number(id),
                    },
                });

                return response(res, [deleteduser]);
            } else {
                return response(res, [], { errors: [{ msg: "user not found!" }] });
            }
        } catch (error) {
            console.error("Error while deleting user:", error);
            return response(res, [], { errors: [{ msg: "Failed to delete user" }] }, 422);
        }
    }


}

export default new User();