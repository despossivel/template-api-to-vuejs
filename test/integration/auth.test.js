import {
    describe,
    it
} from 'node:test'
import assert from 'node:assert'
import request from "supertest"
import app from "../../src/server.js"

describe('Teste de integração para rota /auth', () => {
    it('Deve retornar um token de autenticação válido', async () => {

        const requestBody = {
            email: 'matheus@gmail.com',
            password: 'qazx123.'
        };

        const response = await request(app)
            .post('/auth')
            .send(requestBody)
            .set('Content-Type', 'application/json');

        assert.strictEqual(response.status, 200)
 
    });
});
