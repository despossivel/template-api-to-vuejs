import {
    describe,
    it
} from 'node:test'
import assert from 'node:assert'
import request from "supertest"
import app from "../../src/server.js"
import { faker } from '@faker-js/faker';
import { getAuthorization, genCpf } from "./utils/getAuthorization.js"

describe('Teste de integração para rota /students', () => {

    it('index', async () => {

        const authorization = await getAuthorization();

        const response = await request(app)
            .get('/students')
            .set('Authorization', authorization);

        assert.strictEqual(response.status, 200)

    });


    it('show', async () => {

        const authorization = await getAuthorization();

        const getUsers = await request(app)
            .get('/students')
            .set('Authorization', authorization);

        const response = await request(app)
            .get(`/student/${getUsers.body[0].id}`)
            .set('Authorization', authorization);

        assert.strictEqual(response.status, 200)

    });

    it('post', async () => {

        const authorization = await getAuthorization();


        const response = await request(app)
            .post('/student')
            .send({
                name: faker.internet.userName(),
                ra: String(faker.number.int()),
                cpf: genCpf(),
                email: faker.internet.email(),
            })
            .set('Authorization', authorization);

        assert.strictEqual(response.status, 200)

    });

    it('put', async () => {

        const authorization = await getAuthorization();

        const create = await request(app)
            .post('/student')
            .send({
                name: faker.internet.userName(),
                ra: String(faker.number.int()),
                cpf: genCpf(),
                email: faker.internet.email(),
            })
            .set('Authorization', authorization);

        const response = await request(app)
            .put(`/student/${create.body[0].id}`)
            .send({
                name: faker.internet.userName(),
            })
            .set('Authorization', authorization);

        assert.strictEqual(response.status, 200)

    });


    it('delete', async () => {

        const authorization = await getAuthorization();

        const create = await request(app)
            .post('/student')
            .send({
                name: faker.internet.userName(),
                ra: String(faker.number.int()),
                cpf: genCpf(),
                email: faker.internet.email(),
            })
            .set('Authorization', authorization);

        const response = await request(app)
            .delete(`/student/${create.body[0].id}`)
            .set('Authorization', authorization);


        assert.strictEqual(response.status, 200)

    });



});
