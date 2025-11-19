# CSE 341 – Project 2 (Weeks 03–04) – Shopping API

Node.js + Express + MongoDB (Mongoose) API for a simple shopping system.

The project includes:

- `users` collection (Google OAuth-backed users)
- `products` collection (catalog items)
- Full CRUD for both users and products
- Google OAuth 2.0 login
- JWT-based protection on selected routes
- Auto-generated Swagger documentation with live “Try it out” testing

---

## 🔗 Deployed URLs

**Render base URL**

```text
https://cse-341-shopping.onrender.com
Swagger UI (API Docs)

text
Copy code
https://cse-341-shopping.onrender.com/api-docs
Local development

text
Copy code
Base:   http://localhost:8080
Docs:   http://localhost:8080/api-docs
📦 Endpoints Overview
Auth (OAuth)
Method	Endpoint	Description
GET	/auth/google	Start Google OAuth login
GET	/auth/google/callback	Google OAuth callback (returns JWT)
GET	/auth/failure	OAuth failure helper route

System
Method	Endpoint	Description
GET	/	Simple API root / health check

Users (Protected – requires Bearer JWT)
Method	Endpoint	Description
GET	/users	Get all users
GET	/users/{id}	Get one user by ID
POST	/users	Create a new user
PUT	/users/{id}	Update a user by ID
DELETE	/users/{id}	Delete a user by ID

All user routes require a valid Authorization: Bearer <token> header.

Products
Method	Endpoint	Description	Auth
GET	/products	Get all products	❌ Public
GET	/products/{id}	Get a product by ID	❌ Public
POST	/products	Create a new product	✅ Protected
PUT	/products/{id}	Update a product by ID	✅ Protected
DELETE	/products/{id}	Delete a product by ID	✅ Protected

🔐 Using OAuth & Swagger (How to Log In)
Because Google OAuth requires full-page redirects, Swagger’s “Try it out” button cannot directly start the login flow. Use this process instead:

1. Start Google Login
Open Swagger UI:

Local: http://localhost:8080/api-docs

Render: https://cse-341-shopping.onrender.com/api-docs

Find the Auth section, endpoint:

text
Copy code
GET /auth/google – Start Google OAuth login
Click the small clipboard icon at the end of that row to copy the URL.

Paste the URL into the browser’s address bar and navigate to it.

This will redirect you to the Google sign-in screen.

2. Get the JWT Token
After logging in with Google, you will be redirected to:

text
Copy code
/auth/google/callback
The API responds with JSON similar to:

json
Copy code
{
  "message": "Login successful",
  "token": "eyJhbGc...<long JWT>...",
  "user": {
    "_id": "690d7...",
    "email": "example@gmail.com",
    "firstName": "Eric"
  }
}
Copy the entire token value (without the quotes).

3. Authorize in Swagger
Go back to the Swagger UI page.

Click the green Authorize button (top right).

Under BearerAuth, paste the token with the Bearer prefix, like this:

text
Copy code
Bearer eyJhbGc...<entire token>...
Click Authorize, then Close.

Now all protected endpoints (Users + protected Products routes) can be called using Try it out → Execute without getting 401 Unauthorized.

If you see Invalid or expired token, repeat the login flow to get a fresh token.

🧪 Sample requests.rest (VS Code REST Client)
For local testing with the REST Client extension:

http
Copy code
############################
# LOCALHOST TESTS - SHOPPING
############################

### Local - Root route
GET http://localhost:8080/

############################
# USERS (protected)
############################

# Add header: Authorization: Bearer <your JWT here>

### Local - All users
GET http://localhost:8080/users
Authorization: Bearer PUT_JWT_HERE

### Local - One user
GET http://localhost:8080/users/PUT_REAL_USER_ID_HERE
Authorization: Bearer PUT_JWT_HERE

### Local - Create new user
POST http://localhost:8080/users
Authorization: Bearer PUT_JWT_HERE
Content-Type: application/json

{
  "email": "alice@example.com",
  "firstName": "Alice",
  "lastName": "Anderson"
}

### Local - Update user
PUT http://localhost:8080/users/PUT_REAL_USER_ID_HERE
Authorization: Bearer PUT_JWT_HERE
Content-Type: application/json

{
  "email": "alice.updated@example.com",
  "firstName": "AliceUpdated",
  "lastName": "AndersonUpdated"
}

### Local - Delete user
DELETE http://localhost:8080/users/PUT_REAL_USER_ID_HERE
Authorization: Bearer PUT_JWT_HERE


############################
# PRODUCTS
############################

### Local - All products (public)
GET http://localhost:8080/products

### Local - One product (public)
GET http://localhost:8080/products/PUT_REAL_PRODUCT_ID_HERE

### Local - Create new product (protected)
POST http://localhost:8080/products
Authorization: Bearer PUT_JWT_HERE
Content-Type: application/json

{
  "name": "Sample Widget",
  "sku": "WID-1001",
  "description": "A very fine sample widget.",
  "category": "Widgets",
  "brand": "WidgetCo",
  "price": 19.99,
  "quantityInStock": 25,
  "countryOfOrigin": "USA",
  "color": "Blue",
  "weight": 1.2,
  "size": "Medium"
}

### Local - Update product (protected)
PUT http://localhost:8080/products/PUT_REAL_PRODUCT_ID_HERE
Authorization: Bearer PUT_JWT_HERE
Content-Type: application/json

{
  "name": "Sample Widget - Updated",
  "sku": "WID-1001",
  "description": "Updated description for the sample widget.",
  "category": "Widgets",
  "brand": "WidgetCo",
  "price": 24.99,
  "quantityInStock": 40,
  "countryOfOrigin": "USA",
  "color": "Red",
  "weight": 1.3,
  "size": "Large"
}

### Local - Delete product (protected)
DELETE http://localhost:8080/products/PUT_REAL_PRODUCT_ID_HERE
Authorization: Bearer PUT_JWT_HERE
⚙️ Environment Variables
These are read from .env locally and configured in Render’s Environment section in the dashboard.

Key	Description
MONGODB_URI	MongoDB connection string (Atlas)
DB_NAME	Database name (e.g., shopping)
PORT	Port to run the server (defaults to 8080)
JWT_SECRET	Secret key for signing/verifying JWTs
GOOGLE_CLIENT_ID	Google OAuth 2.0 Client ID
GOOGLE_CLIENT_SECRET	Google OAuth 2.0 Client Secret
GOOGLE_CALLBACK_URL	OAuth callback URL (local or Render)
SWAGGER_HOST	e.g. localhost:8080 or Render host
SWAGGER_SCHEMES	e.g. http (local) or https (Render)

Example local .env (do not commit this):

env
Copy code
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster01.mongodb.net/shopping
DB_NAME=shopping
PORT=8080

JWT_SECRET=put-a-long-random-string-here

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:8080/auth/google/callback

SWAGGER_HOST=localhost:8080
SWAGGER_SCHEMES=http
On Render, GOOGLE_CALLBACK_URL should use the Render base URL instead, e.g.:

env
Copy code
GOOGLE_CALLBACK_URL=https://cse-341-shopping.onrender.com/auth/google/callback
SWAGGER_HOST=cse-341-shopping.onrender.com
SWAGGER_SCHEMES=https
🏃 Running the Project Locally
bash
Copy code
# install dependencies
npm install

# generate swagger.json (if using swagger.js as a prestep)
node swagger.js

# start the server
npm start
The server will listen on http://localhost:8080 by default.