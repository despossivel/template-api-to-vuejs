import request from "supertest"
import app from "../../../src/server.js"
import { faker } from '@faker-js/faker';
 
const getAuthorization = async () => {
    const user = {
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    }
 
    const auth = await request(app)
        .post('/auth')
        .send({
            "email": "demo@demo.com",
            "password": "demo"
        })
        .set('Content-Type', 'application/json');
 
    return auth.body.token

}


const genCpf = () => `${faker.number.int({ min: 100, max: 999 })}.${faker.number.int({ min: 100, max: 999 })}.${faker.number.int({ min: 100, max: 999 })}-${faker.number.int({ min: 10, max: 99 })}`

export default getAuthorization
export {
    getAuthorization,
    genCpf
}