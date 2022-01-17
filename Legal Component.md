This document is set in the context of the [Rulebook project](https://dapsi.ngi.eu/hall-of-fame/rulebook/), led by Visions with 1001lakes and Knowledge Innovation Centre. The Rulebook project is financed by the European Commission through NGI DAPSI and aims to build open source legal components to enable decentralized and human-centric data sharing.

This document describes the Data Contract Service  for human-centric data sharing. It aims to describe the 2nd layer of [OASC MIM4](https://oasc.atlassian.net/wiki/spaces/OASCMIM/pages/30179329/MIM%2B4%2BPersonal%2BData%2BManagement) about data sharing agreements. It also allows implementation of data policies as described in the [IDSA RAM](https://internationaldataspaces.org/ids-ram-3-0/).

This Data Contract Service allows the members participants of a data network (data providerssources, service providersdata using services, end users, infrastructure operatorsdata intermediary, and individualsperson) to be sure that each data transfer and access respects legal and governance rules and ties each data transfer to a data sharing agreement.

_As a data source (DS), I want to be able to set data policies to be sure data is accessed only by organisations and for processings that respect my conditions._

_As a data using service (DUS), I want to be able to access the data policies of relevant data sources so I know what I need to respect to access data._

_As a data source or data using service, I want to have clear data sharing agreements to ensure compliance of each data transfer in the network._

_As a data intermediary (DI), I want to be able to access proof of the data sharing agreements a data source has in order to enable or not the data exchange._

_As a person (P), I want to be able to access all data sharing agreements and data policies that concern the sharing of my data._

**Functionalities and flow:**

The legal component is characterized by different functionalities, these functionalities can be ensured by the data intermediary or the data source through its connector.

**Functionalities:**

- **Define and publish data policies (DP):** for each data set the data source can specify conditions, obligations, restrictions, prices, certifications, data security, rights, data protection, liability ; these provisions to access a data set define the data policy, are made machine readable using appropriate standards and are made available (published) to the members of the data network.
- **Generate and manage data sharing agreements (DSA):** when a data using service agrees and complies with the data policy, a data sharing agreement (DSA) is generated between the DUS and DS and the DI taking into account the data policy&#39;s provisions. The DSA is generated in human and machine readable format, using appropriate standards, and its meta data (parties, data set, provisions, time) are made available to the parties of the data sharing agreement.
- **Proving data sharing agreements:** a member of a data network can check the existence of a data sharing agreement, get relevant metadata about the agreement and a token proving the validity of the agreement that can be used to enable data exchanges.

**Components:**

- **Registries:** in order to enable the spread of a common language regarding DPs and DSAs and in order for data networks to be easily build thanks to easily built DPs, the Legal Component builds and makes available registries of:
  - _ **Services** _**: information about the parties of a data network (VAT, address, representatives, endpoints, etc)**
  - **Authorities/Reference store**
    - _Codes of Conduct_: links and descriptions of relevant codes of conduct regarding data use and sharing
    - _Certifications_: links and descriptions of relevant certifications regarding data use and sharing
    - _Obligations_: list of relevant obligations regarding data use and sharing
    - _Restrictions_: list of relevant restrictions regarding data use and sharing
    - _Security_: list of relevant data security requirements regarding data use and sharing
    - _Protection_: list of relevant data protection requirements regarding data use and sharing
    - _Data types_: list of data types, descriptions and links to Codes of conduct, certifications, obligations, restrictions, security and protection requirements, regarding the use and sharing of the data type
    - _Clauses_: list of clauses and contract templates that can be used to generate data sharing agreements.
  - These registries and its contents will be available for all to use and its contents will be published on an open git repository. This will allow data networks to be able to use the work done by previous data networks. For instance, one data network did the work of listing the relevant data security requirements for skills data sharing: the next one can reuse that knowledge to build their data policies.
- **Open APIs:** in order to easily integrate and use the legal component, open APIs and their source code are available.
  - Registry API: API to interact (NTFS) with the registries.
  - Contract API: API to generate a data sharing agreement based on a contract template or clauses from the registries.
  - DSA API: API to store and check the existence and validity of a DSA.
- **Source of trust/DSA database:** this component can be mutualized inside a data network or across data networks or can also be specific to each data source or data using service ; in any case it needs to publish how the validity of a DSA can be checked and generate a valid token for valid DSAs.

**Obligations:**

- Data sources need to publish metadata about their DPs in a human and machine readable format as well as endpoint(s) and documentation to query said metadata.
  - This query happens through the DI or the Connector.
  - The documentation and endpoint(s) need to be available through the service registry.
  - Needs to be published at least for all members of the data network.
- DUS need to publish metadata about their profiles (i.e. respect of provisions to access data - security, certifications, etc) in a human and machine readable format as well as endpoint(s) and documentation to query said metadata.
  - This can happen through the DI or the Connector.
  - The documentation and endpoint(s) need to be available through the service registry.
  - Needs to be published at least for all members of the data network.
- For each DS and DUS, how to check the validity of a DSA (see source of trust component) needs to be published (endpoints/documentation).
  - This can happen through the DI or the Connector.
  - The documentation and endpoint(s) need to be available through the service registry.
  - Needs to be published at least for all members of the data network.

  1.

**Implementation through DAPSI**

# UCX: As the Contracts API, I wish to operate a contracts registry

| **Description** ||
| --- | --- |
| **Actors** |-|
| **Pre-Conditions** |-|
| **Flow** |1.|
| **Post-State** ||
| **Notes/Requirements** | |
#


# UC1: As a Data Source, I wish to publish information about a dataset

| **Description** | As a data source (DS), I wish to publish the availability of a dataset, together with policies I require from **data using services (DUS)** to access the data. |
| --- | --- |
| **Actors** | - Data Source
| **Pre-Conditions** | - Data Source has a dataset the wish to publish, which is queryable via an API
| **Flow** | 1. The user (as Data Source) describes data, endpoints and checklist policies. <br> 2. The Data Source generates a **data policy (DP)** using XXX according to the specified schema. <br>3. Data Source authenticates with the services registry.<br> 4. Data Policy is deposited to the services registry via API Call |
| **Post-State** | Data policy is stored as JSON. |
| **Notes/Requirements** | How do we generate data policy? Do we provide a builder or assume that the data source will prepare it in appropriate format? <br> How do we manage authentication for the services registry? What business policies apply? <br> How is Data Policy stored? Relational or non relational database? RDF? |

# UC2: As a Data Using Service, I wish to find a dataset

| **Actors** | - Data using Service (DUS)<br>- Data Intermediary(DI) |
| --- | --- |
| **Pre-Conditions** | - Data Intermediary (DI) operates a services registry
| **Flow** | 1. The Data using Service sends a **search** query with **modifiers** to the services search API.
| **Post-State** | API returns a list of dataset with its Data Policies (DP). |
| **Notes/Requirements** | No authentication required for the search query |

# UC3: As a Data Using Service, I wish to prepare a data-sharing agreement

| **Actors** | - Data using Service (DUS)<br>- Data Intermediary (DI)<br>- Data Source (DS)|
| --- | --- |
| **Pre-Conditions** | - Data Intermediary operates a services Registry
| **Flow** | 1. Data Using Service authenticates with a **Data intermediary.** <br>2. Data Using Service fills form specifying data they want to use and conditions. This generates an unsigned DSA which is generated via the Contracts API <br>3. DSA Generator uses a **signature API** to send signature requests to data source and data using service.
| **Post-State Success** | Data Using Service receives a signature request.<br>Data Usage Request API returns a Success message. |
| **Post-State Failure** | Data Usage Request API returns a Failure message |
| **Notes/Requirements** | Do we create our own signature API?<br>Do we use a third party signature API? e.g. [Introducing: digitally signing XML (connective.eu)](https://connective.eu/introducing-xml-signing/) |

# UC4: As a party to a DSA, I wish to sign a DSA

| **Actors** | - Data using Service (DUS)<br>- Data Intermediary (DI))<br>- Data Source (DS)|
| --- | --- |
| **Pre-Conditions** | - Signing API has created a signature request composed of a PDF and associated XML file.|
| **Flow** |1. Data Using Service authenticates themselves with the signature service and identifies themselves with public key.<br>2. Party enters the private key.<br>3. Signature service signs the document with the private key of Data using Service.<br>4. Signature service sends a signing request to the Data Source.<br>5. Data Source authenticates themselves with the Signature service and identifies themselves with public key.<br>6. Party enters the private key.<br>7. Signature service signs the document with private key of Data using Service<br>8. Signature service sends the completed signed document to the DSA store API.<br>9. **The DSA registry validates the signed document** and registers the hash on a blockchain.<br>10. The contract record is updated with the blockchain transaction ID.|
| **Post-State Success** | Signing parties receive a notification (e-mail) confirming the registration of the contract on the blockchain.State of the DSA is marked as ACTIVE. |
| **Post-State Failure** | Signing parties receive a notification with the error data |
| **Notes/Requirements** ||

# UC4: As a party to a DSA, I wish to revoke a DSA

| **Actors** | - party to a DSA|
| --- | --- |
| **Pre-Conditions** | - Signing API has created a signature request composed of a PDF and associated XML file.|
| **Flow** | 1. As a party to a DSA I prepare a DSA revocation request, indicating the DSA to be revoked.<br>2. I authenticate and sign the DSA with my private key.<br>3. Signature service sends the completed signed document to the DSA store API.<br>4. The DSA registry validates the signed document, including my authorisation to revoke, and registers the hash on a blockchain.<br>5. The original DSA record is updated with the hash of the revocation record.|
| **Post-State Success** | Signing parties receive a notification (e-mail) confirming the revocation of the contract on the blockchain.State of the DSA is marked as REVOKED. |
| **Post-State Failure** | Signing parties receive a notification with the error data.State of the DSA is marked as ACTIVE |
| **Notes/Requirements** ||

# UC5: As a DUS, I wish to request data from a dataset

| **Actors** | - DUS<br>- DI<br>- DS|
| --- | --- |
| **Pre-Conditions** | - |
| **Flow** |<br>1. The DUS sends a data request (DS, data set, purpose) to the DI<br>2. The DI checks through the DSA API if a DSA exists between those parties for this data set AND if the agreement is valid. <br> - If not, it proposes to the DUS the launch the DSA generation mechanism (see above UC4)<br>3. The DSA API sends to the DI a token proving the DSA and DSA metadata<br>4. The DI sends the DUS the DSA token and metadata, as well as the DS&#39;s data sharing endpoints (available through the service registry); this is incorporated into the request ticket as described in MIM4<br>5. The DUS queries the DS&#39;s data sharing endpoint with the DSA token and metadata<br>6. The DS checks validity of the token directly with the DSA API<br> - The DS, in its usage and access control mechanisms, can implement specific checks matching specific data sets with DSA metadata before validating the data access<br>7. The DS sends the data to the DUS.<br> - When needed the DS can check with the DI if the person has given their consent for the data sharing (out of scope of this present document).|
| **Post-State Success** | The DUS receives a notification and the access to the requested data is granted |
| **Post-State Failure** | Both parties receive an error notification with its description. |
| **Notes/Requirements** | |

**Signing API Requirements**

