# User Registration Endpoint Documentation

## POST `/user/register`

Registers a new user in the system.

---

### Request Body

Send a JSON object with the following structure:

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

#### Field Requirements

- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

---

### Responses

#### Success

- **Status:** `201 Created`
- **Body:**
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

#### Validation Error

- **Status:** `400 Bad Request`
- **Body:**
  ```json
  {
    "error": [
      {
        "msg": "First name should be 3 character long",
        "param": "fullname.firstname",
        "location": "body"
      }
      // ...other errors
    ]
  }
  ```

#### Internal Server Error

- **Status:** `500 Internal Server Error`
- **Body:** Standard Express error response.

---

### Example Request

```bash
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "Alice", "lastname": "Smith" },
    "email": "alice@example.com",
    "password": "securepass"
  }'
```

---

### Notes

- Passwords are securely hashed before storage.
- The returned JWT token can be used for authenticated requests.
- The `password` field is never returned in API responses.