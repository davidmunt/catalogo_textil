module.exports = (app) => {
  const lastSeenController = require("../controllers/lastseen.controller");

  // Guardar producto visto por un usuario
  app.post("/lastseen/productseen", lastSeenController.productSeen);

  // Obtener los últimos 10 productos vistos por un usuario
  app.get("/lastseen/:userId", lastSeenController.getLastSeenProducts);
};

// 1️⃣ Guardar producto visto (POST /lastseen/productseen)

// URL:

// POST http://localhost:3001/lastseen/productseen

// Body (JSON, raw):

// {
//   "userId": "64f5e8b1a2d3c1234567890a",
//   "productId": "PROD12345"
// }

// Esto guardará que el usuario con userId vio el producto PROD12345.

// Se generará automáticamente createdAt.

// 2️⃣ Obtener últimos 10 productos vistos (GET /lastseen/:userId)

// URL:

// GET http://localhost:3001/lastseen/64f5e8b1a2d3c1234567890a

// Esto devolverá un array con los últimos 10 productos vistos por el usuario.

// Ejemplo de respuesta:

// {
//   "lastSeen": [
//     {
//       "id": "6543abcd1234",
//       "userId": "64f5e8b1a2d3c1234567890a",
//       "productId": "PROD12345",
//       "createdAt": "2025-10-26T12:34:56.789Z"
//     },
//     {
//       "id": "6543abcd1235",
//       "userId": "64f5e8b1a2d3c1234567890a",
//       "productId": "PROD67890",
//       "createdAt": "2025-10-26T12:33:00.123Z"
//     }
//   ]
// }
