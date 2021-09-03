# Blockchain API

This API represents a blockchain gateway and allows for storing and verifying signed documents using the Ethereum blockchain.

The main application should use this API as a dedicated micro service. The application should controll the access to this gateway and provide trusted information, where the this API simply executes all valid requests and provides blockchain related data.

```sequence
Title: Blockchain API Overview
User -> Main Application: Arbitrary user request
User --> Blockchain API: Authenticated user requests
Main Application -> Blockchain API: Authenticated request
Blockchain API -> Ethereum Blockchain : Manage blockchain transactions
Ethereum Blockchain -> Blockchain API : Raw blockchain data
Blockchain API --> Main Application : Parsed blockchain information
Blockchain API --> User : Parsed blockchain information
```

## Endpoints

The blockchain API is language independent software as a service with a RESTful API endpoint built for developers. Currently we use the `test` environment which uses Ethereum Rinkeby network.

* **Test**: https://y5u9ap15bi.execute-api.us-east-1.amazonaws.com/test/

## Requests

The server speaks [JSON](https://en.wikipedia.org/wiki/JSON). It's recommended that every call to the server includes a `Content-Type` header set to `application/json; charset=utf-8;`. 

Requests with `POST` or `PUT` method must send data as `application/json` or `multipart/form-data` when files are included in the request body.

```bash
$ curl -X 'POST' '{url}' \
       -H 'Authorization: {jwt}' \
       -H 'Content-Type: application/json; charset=utf-8' \
       -d $'{...}'
```

## Responses

Every response has a unique ID which helps identifying potential problems. It also includes a status code that can help identifying the cause of a potential problem.

Successful requests include a `data` key, which hold a valid response object, and a `meta` key, which holds additional information about the result.

```js
{
  "id": ...,
  "status": ...,
  "data": { ... },
  "meta": { ... },
}
```

In case of failure, the server responds with `errors` key, which holds a list of error objects.

```js
{
  "id": ...,
  "status": ...,
  "errors": [ ... ]
}
```

Query requests through `GET` method can return status codes `200`, `400`, `401`, `403` or `500`. Mutations through `POST`, `PUT` and `DELETE` can return also codes `201` and `422`. Invalid routes return status code `404`.

* **200**: Success.
* **201**: Successfully created.
* **400**: Invalid resource or resource not found.
* **401**: Unauthenticated access.
* **403**: Unauthorized access.
* **404**: Path not found.
* **422**: Data validation failed.
* **500**: System error.

## Error Handling

Errors include a unique code number and an error message. The code number helps identifying potential problems and points to the exact position in the system.

```js
{
  ...
  "errors": [
    {
      "code": 422000,
      "message": "Invalid path."
    }
  ]
}
```

Below is a complete list of global handled errors.

## Authentication

Most of the API routes restrict public access and require authentication. Authenticated requests must include an HTTP header `Authorization` holding an authentication token (JWT). Since the JWT is used as a secure way of exchanging data, each route has its own rules.

The authentication JWT should be created by the main application which shares the same application secret. On each request to this API, the main application will generate a JWT according to route's requirements and add it as a request header.

```sequence
Title: Authentication
User -> Main Application : Request authentication token
Main Application -> User : New authentication token
User --> Blockchain API : Perform arbitrary request
Main Application --> Blockchain API : Perform arbitrary request
```

## Routes

### Contracts

#### [public] GET /contracts

> Gets a paginated list of contracts.

##### Path parameters

| Name | Description
|-|-
| skip | An `integer` defining how many documents should be skipped in the result.
| limit | An `integer` defining a maximum number of returned documents.

#### [private] POST /contracts/:contractId/sign/:party

> Uploads client's signature. This route requires a JWT token containing the `id` of a contract and a wallet `address` of a user that signed the document.

##### Path parameters

| Name | Description
|-|-
| contractId | An `integer` representing a contract id.
| party | A `string` defining a signer type (`client` or `provider`).

##### Body fields

| Name | Description
|-|-
| hash | [required] A `SHA3(string)` representing a message that was signed.
| signature | [required] A `string` representing a signature of the message.

#### [private] POST /contracts/:contractId/revoke

> Revokes an existing contract in the database.

#### [private] GET /contracts/:contractId/verify

> Verifies the authenticity of a contract.
