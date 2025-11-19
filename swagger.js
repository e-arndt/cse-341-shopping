// swagger.js
require('dotenv').config();
const path = require('path');
const swaggerAutogen = require('swagger-autogen')();

const outputFile = path.join(__dirname, 'swagger.json');
const endpointsFiles = [path.join(__dirname, 'server.js')];

const doc = {
  swagger: '2.0',

  info: {
    title: 'Shopping API',
    description: 'Docs for /auth, /users and /products',
    version: '1.0.0'
  },

  // Automatically use the right host (Render or local)
  host: process.env.SWAGGER_HOST || 'localhost:8080',

  basePath: '/',

  // Automatically use https on Render, http locally
  schemes: process.env.SWAGGER_SCHEMES
    ? process.env.SWAGGER_SCHEMES.split(',')
    : ['http'],

  consumes: ['application/json'],
  produces: ['application/json'],

  tags: [
    { name: 'Auth',    description: 'OAuth login and callback endpoints' },
    { name: 'System',  description: 'API status and root endpoints' },
    { name: 'Users',   description: 'User / customer account endpoints (protected)' },
    { name: 'Products',description: 'Product catalog endpoints' }
  ],

  // JWT Bearer Authorization definition
  securityDefinitions: {
    BearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter: Bearer <JWT token>'
    }
  },

  // ----- SCHEMA DEFINITIONS -----
  definitions: {
    // ---------- USERS ----------
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

    // ---------- PRODUCTS ----------
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

    // Generic error
    ErrorResponse: {
      message: 'Something went wrong'
    }
  }
};

swaggerAutogen(outputFile, endpointsFiles, doc);
