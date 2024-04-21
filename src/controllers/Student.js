import prisma from '../config/connection.js'
import { response } from '../utils/index.js'
 
class Student {

    async index(req, res) {
        const students = await prisma.student.findMany()
        response(res, students, { errors: [{ "msg": "No students found!" }] });
    }

    async show(req, res) {
        try {
            const { id } = req.params;

            const student = await prisma.student.findUnique({
                where: {
                    id: Number(id),
                },
            });

            if (!student) return response(res, [], { errors: [{ msg: "Student not found!" }] });

            return response(res, [student]);
        } catch (error) {
            console.error("Error while fetching student:", error);
            return response(res, [], { errors: [{ msg: "Internal server error" }] }, 422);
        }
    }
 
    async store(req, res) {
        try {
            const doc = req.body
            const student = await prisma.student.create({
                data: doc,
            })

            return response(res, [student]);
        } catch (error) {
            console.error("Error while creating student:", error);
            return response(res, [], { errors: [{ msg: "Failed to create student" }] }, 422);
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;

            const { ra, cpf, email, ...rest } = req.body;
            const doc = rest;

            const updatedStudent = await prisma.student.update({
                where: {
                    id: Number(id),
                },
                data: doc,
            });

            return response(res, [updatedStudent]);
        } catch (error) {
            console.error("Error while updating student:", error);
            return response(res, [], { errors: [{ msg: "Failed to update student" }] }, 422);
        }
    }
 
    async destroy(req, res) {
        try {
            const { id } = req.params;

            const checkExist = await prisma.student.count({
                where: {
                    id: Number(id),
                },
            });

            if (checkExist) {
                const deletedStudent = await prisma.student.delete({
                    where: {
                        id: Number(id),
                    },
                });

                return response(res, [deletedStudent]);
            } else {
                return response(res, [], { errors: [{ msg: "Student not found!" }] });
            }
        } catch (error) {
            console.error("Error while deleting student:", error);
            return response(res, [], { errors: [{ msg: "Failed to delete student" }] }, 422);
        }
    }
 
}

export default new Student();