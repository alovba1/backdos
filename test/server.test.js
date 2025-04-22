const request = require('supertest');
const app = require('../server');

let server;

// Aumentar el tiempo máximo de Jest en todo el archivo
jest.setTimeout(20000);

beforeAll(async () => {
    server = app.listen(3000, () => {
        console.log('Servidor corriendo en http://localhost:3000');
    });

    // Esperar unos segundos para asegurar que el servidor esté completamente listo
    await new Promise(resolve => setTimeout(resolve, 10000));
});

afterAll(async () => {
    if (server) {
        await new Promise(resolve => server.close(resolve)); // Cierra correctamente el servidor
        console.log('🚀 Servidor cerrado después de las pruebas.');
    }
});

describe('GET /api/message', () => {
    it('Debería devolver un mensaje', async () => {
        const res = await request(app).get('/api/message');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Hola desde el backend!');
    });
});
