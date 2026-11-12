const request = require('supertest');
const app = require('../index');

describe('Testes da Aplicação - Sistema de Música', () => {
  
  it('[Backend] Deve proteger a rota de músicas exigindo autenticação JWT', async () => {
    const response = await request(app).get('/musicas');
    expect([401, 403]).toContain(response.statusCode);
  });


  it('[Frontend/API] Deve responder à rota principal com status 200 e retornar JSON', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
  });

});