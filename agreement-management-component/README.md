# Agreement Management Component

### Folder structure

`Schemas`

Contains the various model schemas along with descriptions used in the contractual framework provided by the Agreement Management Component.

`App`

A template app containing the api and examples of contract generation / signature.

Description for the endpoints of the various APIs are described below.

## API

The server speaks [JSON](https://en.wikipedia.org/wiki/JSON). It's recommended that every call to the server includes a `Content-Type` header set to `application/json; charset=utf-8;`.

Requests with `POST` or `PUT` method must send data as `application/json`.

```bash
$ curl -X 'POST' '{url}' \
       -H 'Authorization: Bearer {jwt}' \
       -H 'Content-Type: application/json; charset=utf-8' \
       -d $'{...}'
```

## Authentication

Most of the API routes restrict public access and require authentication. Authenticated requests read follow a Bearer Authentication method and must include a HTTP header `Authorization` holding `Bearer ` followed by the JWT token.

To retrieve a JWT token for your Service, a post request must be made to the following endpoint.

#### [public] POST /api/authenticate/token

> Generates an JWT auth token

##### Body fields

| Name | Description |
| --- | --- |
| serviceKey | [required] A `string` representing the serviceKey of your service. |
| secretKey | [required] A `string` representing the secretKey of your service. |

## Terms of Use API

#### [private] GET /api/termsofuse/

> Get all of your Service's Terms of Use

#### [private] GET /api/termsofuse/{termsofuseId}

> Get info on one Terms of Use

##### Path parameters

| Name         | Description                                                   |
| ------------ | ------------------------------------------------------------- |
| termsofuseId | [required] A `string` representing the ID of the Terms of use |

#### [private] POST /api/termsofuse/

> Creates new Terms of Use

##### Body fields

| Name | Description |
| --- | --- |
| name | [required] A `string` representing the name of the Terms of Use |
| restrictions | [required] A `string` representing the restrictions on the use of the dataset |
| audit | [required] A `string` representing the audit obligations for the dataset |
| dataSecurity | [required] A `string` representing the dataSecurity information of the dataset |
| dataSecurity | [required] A `string` representing the dataProtection information of the dataset |
| confidentialInformation | [required] A `string` representing the confidential information if applicable on datatypes in the dataset |
| intellectualPropertyRights | [required] A `string` representing the intellectual property rights on the dataset |
| otherTerms | [optional] A `string` representing any additionnal necessary terms for the dataset |

#### [private] PUT /api/termsofuse/

> Updates a Terms of Use

##### Body fields

| Name | Description |
| --- | --- |
| termsOfUseId | [required] A `string` representing the ID of the Terms of Use |
| name | [optional] A `string` representing the name of the Terms of Use |
| restrictions | [optional] A `string` representing the restrictions on the use of the dataset |
| audit | [optional] A `string` representing the audit obligations for the dataset |
| dataSecurity | [optional] A `string` representing the dataSecurity information of the dataset |
| dataSecurity | [optional] A `string` representing the dataProtection information of the dataset |
| confidentialInformation | [optional] A `string` representing the confidential information if applicable on datatypes in the dataset |
| intellectualPropertyRights | [optional] A `string` representing the intellectual property rights on the dataset |
| otherTerms | [optional] A `string` representing any additionnal necessary terms for the dataset |

#### [private] DELETE /api/termsofuse/

> Deletes Terms of Use

##### Body fields

| Name         | Description                                                   |
| ------------ | ------------------------------------------------------------- |
| termsOfUseId | [required] A `string` representing the ID of the Terms of Use |

## Contracts API

#### [private] POST /api/contracts/datasharing

> Generates a datasharing agreement

##### Body fields

| Name | Description |
| --- | --- |
| serviceImportId | [required] A `string` representing the ID of the service acting as data user. |
| serviceExportId | [required] A `string` representing the ID of the service acting as data provider. |
| purposeId | [required] A `string` representing the ID of the purpose involved in the data sharing contract |
| datatypes | [required] An array of `string` representing the DataType IDs involved in the data sharing contract for the specified purpose |

#### [private] GET /api/contracts

> Get info on all your contracts

#### [private] GET /api/contracts/{contractId}

> Get info on one Contract

##### Path parameters

| Name       | Description                                               |
| ---------- | --------------------------------------------------------- |
| contractId | [required] A `string` representing the ID of the contract |
