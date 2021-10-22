# API SPECIFICATION

URL:

- Staging: ``
- Production: -

---

## Authentication

All API should use this authentication

Request:

- Header:
  - x-api-key: "your api key"

---

## Error

Response:

```json
{
  "success": "boolean",
  "message": "string",
  "detail": "object",
  "type": "string"
}
```

## Login 

Request:

- Method: POST
- Endpoint: `/login?access=<string>`
- Query:
  - access: mahasiswa | ormawa 
- Header:
  - Content-Type: "application/json"
  - Accept: "application/json"
- Body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

```json
{
  "success": "boolean",
  "accessToken": "string"
}
```
## Login Admin

Request:

- Method: POST
- Endpoint: `/login-admin`
- Query:
  - access: admin 
- Header:
  - Content-Type: "application/json"
  - Accept: "application/json"
- Body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

```json
{
  "success": "boolean",
  "accessToken": "string"
}
```


## Register Mahasiswa

Request:

- Method: POST
- Endpoint: `register/mahasiswa`
- Header:
  - Content-Type: "application/json"
  - Accept: "application/json"
- Body:

```json
{
  "email": "string",
  "fullName": "string",
  "phoneNumber": "string",
  "password": "string",
  "confirmPassword": "string"
}
```

Response:

```json
{
  "success": "boolean",
  "message": "string"
}
```

## Verification Email Mahasiswa

Request:

- Method: PUT
- Endpoint: `verification/:token`
- Header:
  - Accept: "application/json"

Response:

```json
{
  "success": "boolean",
  "message": "string"
}
```

## Resend Verification Email

Request:

- Method: POST
- Endpoint: `/verification`
- Header:
  - Content-Type: "application/json"
  - Accept: "application/json"
- Body:

```json
{
  "email": "string"
}
```

Response:

```json
{
  "success": "boolean",
  "message": "string"
}
```

## Forget Password Lecturer

Request:

- Method: POST
- Endpoint: `/forget-password/mahasiswa`
- Header:
  - Content-Type: "application/json"
  - Accept: "application/json"
- Body:

```json
{
  "email": "string"
}
```

Response:

```json
{
  "success": "boolean",
  "message": "string"
}
```

## Reset Password

Request:

- Method: PUT
- Endpoint: `/reset-password/:auth`
- Header:
  - Content-Type: "application/json"
  - Accept: "application/json"
- Body:

```json
{
  "password": "string",
  "confirmPassword": "string"
}
```

Response:

```json
{
  "success": "boolean",
  "message": "string"
}
```

## Logout

Request:

- Method: DELETE
- Endpoint: `/logout`
- Header:
  - Accept: "application/json"
  - Authorization: "bearer token"
- Body:

Response:

```json
{
  "success": "boolean",
  "message": "string"
}
```

## Register Ormawa

Request:

- Method: POST
- Endpoint: `-`
- Header:
  - Content-Type: "application/json"
  - Accept: "application/json"
- Body:

```json
{
  "email": "string",
  "password": "string",
  "name": "string",
  "role": "string"
}
```

Response:

```json
{
  "success": "boolean",
  "message": "string"
}
```
