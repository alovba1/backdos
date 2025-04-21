const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000; // Define el puerto desde una variable de entorno o por defecto 3000

// Habilita CORS para permitir solicitudes desde http://localhost:4200
app.use(cors({
    origin: 'http://localhost:4200' // Cambia al dominio de tu frontend si es diferente
}));

// Rutas
app.get('/api/message', (req, res) => {
    console.log('Request received');
    res.json({ message: 'Hola desde el backend!' });
    console.log('Response sent');
});

// Exporta solo la aplicación, sin iniciar el servidor
module.exports = app;

// Solo inicia el servidor si este archivo se ejecuta directamente
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });
}
