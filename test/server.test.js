const request = require('supertest');
const app = require('../server');

let server;

// Inicia el servidor antes de ejecutar las pruebas
beforeAll(() => {
    server = app.listen(3000, () => {
        console.log('Servidor corriendo en http://localhost:3000');
    });
});


// Cierra el servidor después de ejecutar las pruebas
afterAll((done) => {
    server.close(done); // Esto asegura que Jest cierre el proceso correctamente
});

describe('GET /api/message', () => {
    it('Debería devolver un mensaje', async () => {
        const res = await request(app).get('/api/message');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Hola desde el backend!');
    });
});
