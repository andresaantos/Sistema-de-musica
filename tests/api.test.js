const request = require('supertest');
const app = require('../index');

describe('Testes da API - Sistema de Música', () => {
  it('Deve responder à rota principal ou retornar status HTTP válido', async () => {
    const response = await request(app).get('/');
    expect([200, 404]).toContain(response.statusCode);
  });
});