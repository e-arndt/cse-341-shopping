// swagger.js
require('dotenv').config();
const path = require('path');
const swaggerAutogen = require('swagger-autogen')();

const outputFile = path.join(__dirname, 'swagger.json');

// IMPORTANT: scan ALL route files
const endpointsFiles = [
  path.join(__dirname, 'routes/users.js'),
  path.join(__dirname, 'routes/products.js')
];

const doc = {
  swagger: '2.0',

  info: {
    title: 'Shopping API',
    description: 'Docs for /auth, /users and /products',
    version: '1.0.0'
  },

  basePath: '/',

  consumes: ['application/json'],
  produces: ['application/json'],

  tags: [
    { name: 'Auth', description: 'OAuth login and callback endpoints' },
    { name: 'System', description: 'API status and root endpoints' },
    { name: 'Users', description: 'User / customer account endpoints (protected)' },
    { name: 'Products', description: 'Product catalog endpoints' }
  ],

  securityDefinitions: {
    BearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter: Bearer <JWT token>'
    }
  },

  definitions: {
    User: {
      _id: '671f2a9f3c0f9b3aa9d9b111',
      email: 'alice@example.com',
      firstName: 'Alice',
      lastName: 'Anderson',
      createdAt: '2025-11-13T01:23:45.678Z',
      updatedAt: '2025-11-13T01:23:45.678Z'
    },
    UsersArray: [{ $ref: '#/definitions/User' }],
    CreateUserRequest: {
      email: 'alice@example.com',
      firstName: 'Alice',
      lastName: 'Anderson'
    },

    Product: {
      _id: '671f2a9f3c0f9b3aa9d9b222',
      name: 'Sample Widget',
      sku: 'WID-1001',
      description: 'A very fine sample widget.',
      category: 'Widgets',
      brand: 'WidgetCo',
      price: 19.99,
      quantityInStock: 25,
      countryOfOrigin: 'USA',
      color: 'Blue',
      weight: 1.2,
      size: 'Medium'
    },
    ProductsArray: [{ $ref: '#/definitions/Product' }],
    CreateProductRequest: {
      name: 'Sample Widget',
      sku: 'WID-1001',
      description: 'A very fine sample widget.',
      category: 'Widgets',
      brand: 'WidgetCo',
      price: 19.99,
      quantityInStock: 25,
      countryOfOrigin: 'USA',
      color: 'Blue',
      weight: 1.2,
      size: 'Medium'
    },

    ErrorResponse: {
      message: 'Something went wrong'
    }
  }
};

if (process.env.SWAGGER_HOST) {
  doc.host = process.env.SWAGGER_HOST;
}
if (process.env.SWAGGER_SCHEMES) {
  doc.schemes = process.env.SWAGGER_SCHEMES.split(',');
}

swaggerAutogen(outputFile, endpointsFiles, doc);
