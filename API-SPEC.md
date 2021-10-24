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

## Forget Password Mahasiswa

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
  - Cookies: "token"
- Body:

Response:

```json
{
  "success": "boolean",
  "message": "string"
}
```
## Homepage

Request:

- Method: GET
- Endpoint: `/`
- Header:
  - Accept: "application/json"
  - Cookies: "token"
- Body:

Response:

```json
{
  "success": "boolean",
  "message": "string",
  "data":{
    "id_event":"number",
    "nama_event":"string",
    "tanggal_event":"datetime"
  }
  
}
```
## Detail Event

Request:

- Method: GET
- Endpoint: `/detail/:id_event`
- Header:
  - Accept: "application/json"
  - Cookies: "token"
- Body:

Response:

```json
{
  "success": "boolean",
  "message": "string",
  "data":{
    "event":{
      "id_event":"number",
      "nama_event":"string",
      "tanggal_event":"datetime",
      "detail_eo":"string",
      "poster_event":"string",
      "kategori":"string",
      "deskripsi_event":"string",
      "benefits":"string",
      "registered_people":"number"
    }
  }
  
}
```

## Get Profile Mahasiswa

Request:

- Method: GET
- Endpoint: `/profile`
- Header:
  - Accept: "application/json"
  - Cookies: "token"

Response:

```json
{
  "success": "boolean",
  "data": {
    "user": {
      "photo": "string",
      "email": "string",
      "nama_lengkap": "string",
      "password": "string",
      "nim": "string",
      "no_hp": "string",
      "fakultas": "string",
      "prodi":"string",
      "angkatan": "string",
      "Jenis_Kelamin": "string",
      "tanggal_lahir":"datetime"
    }
  }
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
