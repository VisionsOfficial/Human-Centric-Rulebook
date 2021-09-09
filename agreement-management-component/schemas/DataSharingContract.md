# DataSharingContract

A contract created upon validation of a data exchange from one Service to another.

Property | Expected Type | Description
---------|---------------|------------
`serviceImport` | Service | The service acting as Data User, importing the data
`serviceExport` | Service | The service acting as Data Provider, exporting the data
`ConstitutiveAgreement` | ConstitutiveAgreement | The Constitutive Agreement under which this contract applies
`AccessionAgreement` | Service | The Accession Agreement
`dataSharing` | Object[] | What the contract agrees upon
`dataSharing.purpose` | Purpose | The Purpose for which the data should be used in this contract
`dataSharing.datatypes` | DataType[] | The list of DataTypes involved in the contract
`dataSharing.processor` | Service | If the Service uses a processor for the data in the contract, the Service acting as Processor.
`dataSharing.termsOfUse` | TermsOfUse[] | The list of Terms Of Use for the usage of data involved in the contract