# Service

A service, platform or organisation using or providing data.

Property | Expected Type | Description
---------|---------------|------------
`name` | String | The name of the service
`logo` | String | The logo url of the service
`governance.registration` | String | Legal registration of the service
`governance.registeredOfficeAddress` | String | Legal service registered office address
`governance.legalRepresentative.name` | String | Name for the legal representative
`governance.legalRepresentative.email` | String | Email of the legal representative
`governance.legalRepresentative.profession` | String | Profession of the legal representative
`governance.dataProtectionOfficer.name` | String | Name of the data protection officer of the service
`governance.dataProtectionOfficer.email` | String | Email of the data protection officer of the service
`endpoints.consentExport` | String | Endpoint receiving a consent for data sharing and generating an access token for other services to make a data request
`endpoints.consentImport` | String | Endpoint for the processing of a consent to make a data request to another service
`endpoints.dataExport` | String | Endpoint called including a consent and access token to request data
`endpoints.dataImport` | String | Endpoint to receive send data from another service

<!-- `datasets` | Dataset[] | Published datasets of the service
 `purposes` | Purpose[] | Processings of data by the service-->
