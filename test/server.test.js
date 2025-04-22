const request = require('supertest');
const axios = require('axios'); // Agregar axios para verificar la conexión
const app = require('../server');

let server;

// Aumentar el tiempo máximo de Jest en todo el archivo
jest.setTimeout(25000);

beforeAll(async () => {
    server = app.listen(3000, () => {
        console.log(' Servidor corriendo en http://localhost:3000');
    });

    // Intentar conectarse al backend hasta 5 veces antes de empezar los tests
    let retries = 5;
    while (retries > 0) {
        try {
            await axios.get('http://localhost:3000/api/message');
            console.log(' Servidor está listo, comenzando pruebas.');
            break; // Si la conexión es exitosa, salimos del bucle
        } catch (error) {
            console.log(` Esperando que el servidor esté listo... Intentos restantes: ${retries}`);
            await new Promise(resolve => setTimeout(resolve, 3000)); // Esperar 3 segundos antes de intentar de nuevo
        }
        retries--;
    }

    if (retries === 0) {
        throw new Error(' El servidor no se inició correctamente.');
    }
});

afterAll(async () => {
    if (server) {
        await new Promise(resolve => server.close(resolve));
        console.log('Servidor cerrado después de las pruebas.');
    }
});

describe('GET /api/message', () => {
    it('Debería devolver un mensaje', async () => {
        const res = await request(app).get('/api/message');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Hola desde el backend!');
    });
});
