# User Endpoints Documentation

## POST `/user/register`

Registers a new user.

### Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
```

- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email.
- `password` (string, required): Minimum 6 characters.

### Responses

- **201 Created**: `{ "token": "<jwt_token>", "user": { ... } }`
- **400 Bad Request**: `{ "error": [ ...validation errors... ] }`
- **500 Internal Server Error**: Standard error response.

---

## POST `/user/login`

Authenticates a user and returns a JWT token.

### Request Body

```json
{
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
```

- `email` (string, required): Must be a valid email.
- `password` (string, required): Minimum 6 characters.

### Responses

- **200 OK**:  
  ```json
  {
    "token": "<jwt_token>",
    "user": {
      "_id": "<user_id>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "johndoe@example.com",
      "socketId": null
    }
  }
  ```
- **400 Bad Request**:  
  ```json
  {
    "error": [ ...validation errors... ]
  }
  ```
- **401 Unauthorized**:  
  ```json
  {
    "error": "invalid email or password"
  }
  ```
- **500 Internal Server Error**: Standard error response.

---

### Example Login Request

```bash
curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "securepass"
  }'
```

---

## User Routes

### GET `/user/profile`

**Description:**  
Returns the authenticated user's profile information.

**Authentication:**  
Requires a valid JWT token (sent via cookie or `Authorization` header).

**Response:**
- `200 OK`: Returns user profile data.
- `401 Unauthorized`: If token is missing or invalid.

**Example Request:**
```http
GET /user/profile
Authorization: Bearer <token>
```

**Example Response:**
```json
{
  "_id": "user_id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com"
}
```

---

### GET `/user/logout`

**Description:**  
Logs out the authenticated user by blacklisting their token and clearing the authentication cookie.

**Authentication:**  
Requires a valid JWT token (sent via cookie or `Authorization` header).

**Response:**
- `200 OK`: Returns a success message.
- `401 Unauthorized`: If token is missing or invalid.

**Example Request:**
```http
GET /user/logout
Authorization: Bearer <token>
```

**Example Response:**
```json
{
  "message": "Logged out successfully"
}
```

---

## Captain Routes

### POST `/captains/register`

**Description:**  
Registers a new captain.

**Authentication:**  
No authentication required.

**Request Body:**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```
- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email.
- `password` (string, required): Minimum 6 characters.
- `vehicle.color` (string, required): Minimum 3 characters.
- `vehicle.plate` (string, required): Minimum 3 characters.
- `vehicle.capacity` (integer, required): Minimum value 1.
- `vehicle.vehicleType` (string, required): Must be one of `"car"`, `"motorcycle"`, `"auto"`.

**Responses:**
- **201 Created**:  
  ```json
  {
    "token": "<jwt_token>",
    "captain": {
      "_id": "<captain_id>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "status": "inactive",
      "location": {
        "lat": null,
        "lng": null
      }
    }
  }
  ```
- **400 Bad Request**:  
  ```json
  {
    "error": [ ...validation errors... ]
  }
  ```
- **500 Internal Server Error**: Standard error response.

**Example Request:**
```bash
curl -X POST http://localhost:3000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securePassword123",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

---

### Notes

- All fields are required except `fullname.lastname`.
- Passwords are securely hashed and never returned in responses.
- The returned JWT token should be used for authenticated requests (if implemented).