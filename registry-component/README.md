# Registry Component

Below are the descriptions for the various Service/data registration related APIs. Schemas can be found in the `schemas` folder but their concrete application is held in the `app` folder of the `agreement-management-component` folder at the root of this repository.

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

## Services API

#### [public] POST /api/services/

> Registers a new Service

##### Body fields

| Name | Description |
| --- | --- |
| serviceName | [required] A `string` representing the name of your service. |
| password | [required] A `string` representing the password for your service. |

#### [private] GET /api/services/info/

> Get your Service information

## DataTypes API

#### [private] GET /api/datatypes

> Get all your DataTypes

#### [private] GET /api/datatypes/{datatypeId}

> Get info on one DataType

##### Path parameters

| Name       | Description                                               |
| ---------- | --------------------------------------------------------- |
| datatypeId | [required] A `string` representing the ID of the DataType |

#### [private] POST /api/datatypes

> Creates a DataType

##### Body fields

| Name | Description |
| --- | --- |
| name | [required] A `string` representing the name of the DataType |
| description | [required] A `string` representing the description of the DataType |

#### [private] DELETE /api/datatypes

> Deletes a DataType

##### Body fields

| Name       | Description                                               |
| ---------- | --------------------------------------------------------- |
| datatypeId | [required] A `string` representing the ID of the DataType |

#### [private] PUT /api/datatypes

> Updates a DataType

##### Body fields

| Name | Description |
| --- | --- |
| datatypeId | [required] A `string` representing the ID of the DataType |
| name | [optional] A `string` representing the name of the DataType |
| description | [optional] A `string` representing the description of the DataType |
| conservationType | [optional] A `string` representing the conservation type for the DataType |
| conservationUnit | [optional] A `string` representing the conservation unit for the DataType |
| conservationLength | [optional] A `string` representing the conservation length for the DataType |
| conservationDescription | [optional] A `string` representing the conservation description for the DataType |
| frequencyUnit | [optional] A `string` representing the frequency unit for the DataType |
| frequencyValue | [optional] A `string` representing the frequency value for the DataType |
| frequencyRepeats | [optional] A `boolean` representing the if the frequency repeats |

## Purposes API

#### [private] GET /api/purposes

> Get all your Purposes

#### [private] GET /api/purposes/{purposeId}

> Get info on one Purpose

##### Path parameters

| Name      | Description                                              |
| --------- | -------------------------------------------------------- |
| purposeId | [required] A `string` representing the ID of the Purpose |

#### [private] POST /api/purposes

> Creates a Purpose

##### Body fields

| Name | Description |
| --- | --- |
| name | [required] A `string` representing the name of the Purpose |
| description | [required] A `string` representing the description of the Purpose |

#### [private] DELETE /api/purposes

> Deletes a Purpose

##### Body fields

| Name      | Description                                              |
| --------- | -------------------------------------------------------- |
| purposeId | [required] A `string` representing the ID of the Purpose |

#### [private] PUT /api/purposes

> Updates a Purpose

##### Body fields

| Name | Description |
| --- | --- |
| purposeId | [required] A `string` representing the ID of the Purpose |
| name | [optional] A `string` representing the name of the Purpose |
| description | [optional] A `string` representing the description of the Purpose |

## Datasets API

#### [private] GET /api/datasets/

> Get all of your Service's Datasets

#### [private] GET /api/datasets/{datasetId}

> Get info on one Dataset

##### Path parameters

| Name      | Description                                              |
| --------- | -------------------------------------------------------- |
| datasetId | [required] A `string` representing the ID of the dataset |

#### [private] POST /api/datasets/

> Creates a new Dataset

##### Body fields

| Name | Description |
| --- | --- |
| datatypes | [required] An array of `string` representing the DataType IDs present in the dataset |
| description | [required] A `string` representing the description of the Dataset |
| termsOfUse | [required] A `string` representing the ID of the Terms of Use described for this Dataset |

#### [private] PUT /api/datasets/

> Updates a Dataset

##### Body fields

| Name | Description |
| --- | --- |
| datasetId | [required] A `string` representing the ID of the Dataset to update |
| datatypes | [optional] An array of `string` representing the DataType IDs present in the dataset |
| description | [optional] A `string` representing the description of the Dataset |
| termsOfUseId | [optional] A `string` representing the ID of the Terms of Use described for this Dataset |

#### [private] DELETE /api/datasets/

> Deletes a Dataset

##### Body fields

| Name | Description |
| --- | --- |
| datasetId | [required] A `string` representing the ID of the Dataset to delete |
