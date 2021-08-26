# DataType

The metadata concerning a type of data that a Service is able to share in the network.

Property | Expected Type | Description
---------|---------------|------------
`name` | String | The public name of the DataType
`description` | String | The description of the DataType
`provenance` | Service | What Service the DataType belongs to.
`conservation.type` | String | Information on the type of conservation of this DataType
`conservation.unit` | String | Information on the Unit for the conservation of this DataType
`conservation.length` | String | Information on the length of conservation of the DataType (MONTH\|YEAR\|DATE\|INF)
`conservation.description` | String | Description of the conservation of the DataType
`frequency.unit` | String | Information on the Unit for the frequency of use for the DataType
`frequency.value` | String | The value associated to the unit of the frequency of use for the DataType
`frequency.repeats` | Boolean | If the frequency repeats after the defined frequency value