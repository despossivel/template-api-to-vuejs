import prisma from '../config/connection.js'
import JWT from '../middlewares/Jwt.js'
import blowfish from "../utils/blowfish.js"

class Auth {

	constructor() { }

	async show(req, res, next) {
		try {
			const { email, password } = req.body;
			const passwordEncrypt = blowfish.encrypt(password);
			const user = await prisma.user.findUnique({
				where: {
					email,
					password: passwordEncrypt
				}
			});

			if (!user) return res.status(404).send({ errors: [{ msg: "User not found!" }], status: 404 });

			const token = JWT.sing(user, process.env.JWT_SECRET);

			const response = {
				...user,
				token
			};

			return res.status(200).send(response);
		} catch (error) {
			console.error("Error while authenticating user:", error);
			return res.status(500).send({ errors: [{ msg: "Internal server error" }], status: 500 });
		}
	}


}

export default new Auth();