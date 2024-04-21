import {
    describe,
    it
} from 'node:test'
import assert from 'node:assert'
import request from "supertest"
import app from "../../src/server.js"
import { faker } from '@faker-js/faker';
import getAuthorization from "./utils/getAuthorization.js"



describe('Teste de integração para rota /users', () => {


    it('index', async () => {

        const authorization = await getAuthorization();

        const response = await request(app)
            .get('/users')
            .set('Authorization', authorization);

        assert.strictEqual(response.status, 200)

    });


    it('show', async () => {

        const authorization = await getAuthorization();

        const users = await request(app)
        .get('/users')
        .set('Authorization', authorization);
 
        const response = await request(app)
            .get(`/user/${users.body[0].id}`)
            .set('Authorization', authorization);

        assert.strictEqual(response.status, 200)

    });

    it('post', async () => {

        const authorization = await getAuthorization();

        const response = await request(app)
            .post('/user')
            .send({
                name: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            })
            .set('Authorization', authorization);

        assert.strictEqual(response.status, 200)

    });

    it('put', async () => {

        const authorization = await getAuthorization();

        const create = await request(app)
            .post('/user')
            .send({
                name: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            })
            .set('Authorization', authorization);

        const response = await request(app)
            .put(`/user/${create.body[0].id}`)
            .send({
                name: faker.internet.userName(),
            })
            .set('Authorization', authorization);

        assert.strictEqual(response.status, 200)

    });


    it('delete', async () => {

        const authorization = await getAuthorization();

        const create = await request(app)
            .post('/user')
            .send({
                name: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            })
            .set('Authorization', authorization);

        const response = await request(app)
            .delete(`/user/${create.body[0].id}`)
            .set('Authorization', authorization);


        assert.strictEqual(response.status, 200)

    });



});
