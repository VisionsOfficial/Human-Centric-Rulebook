# REST

## Endpoints

The blockchain API is language independent software as a service with a RESTful API endpoint built for developers. Currently we only use the `test` environment which uses Ethereum Rinkeby network.

* **Test**: https://fdodmap3zh.execute-api.eu-central-1.amazonaws.com/test/

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

### Global errors

| Code | Message
|-|-

// TODO!!!!!

## Authentication

Most of the API routes restrict public access and require authentication. Authenticated requests must include a HTTP header `Authorization` holding a JWT token.

## Routes

### Contracts

#### [public] GET /contracts

> Gets a paginated list of contracts.

##### Path parameters

// TODO

##### Possible errors

// TODO

#### [private] POST /contracts/:contractId/sign/client

> Uploads client's signature.

##### Body fields

| Name | Description
|-|-
| hash | [required] A `string` representing a message to be signed.
| signature | [required] A `string` representing a signature of the signed message.

#### [private] POST /contracts/:contractId/sign/provider

> Uploads provider's signature.

##### Body fields

| Name | Description
|-|-
| hash | [required] A `string` representing a message to be signed.
| signature | [required] A `string` representing a signature of the signed message.
