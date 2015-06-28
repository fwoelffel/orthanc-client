<a name="Client"></a>
## Client
**Kind**: global class  

* [Client](#Client)
  * [new Client(param)](#new_Client_new)
  * [.url](#Client+url) : <code>String</code>
  * [.auth](#Client+auth) : <code>Object</code>
  * [.instances](#Client+instances)
    * [.getAll()](#Client+instances.getAll) ⇒ <code>Promise</code>
    * [.get(id)](#Client+instances.get) ⇒ <code>Promise</code>
    * [.add(buffer)](#Client+instances.add) ⇒ <code>Promise</code>
    * [.getContent(id, [group], [element], [index])](#Client+instances.getContent) ⇒ <code>Promise</code>
    * [.export(id)](#Client+instances.export) ⇒ <code>Promise</code>
    * [.getFile(id)](#Client+instances.getFile) ⇒ <code>Promise</code>
    * [.getAllFrames(id)](#Client+instances.getAllFrames) ⇒ <code>Promise</code>
    * [.getFrame(id, frameNumber, [frameFormat])](#Client+instances.getFrame)
    * [.getImage(id, [imageFormat])](#Client+instances.getImage)
    * [.getModule(id, [simplify])](#Client+instances.getModule) ⇒ <code>Promise</code>
    * [.getPatient(id)](#Client+instances.getPatient) ⇒ <code>Promise</code>
    * [.getSeries(id)](#Client+instances.getSeries) ⇒ <code>Promise</code>
    * [.getTags(id, [simplify])](#Client+instances.getTags) ⇒ <code>Promise</code>
    * [.getStatistics(id)](#Client+instances.getStatistics) ⇒ <code>Promise</code>
    * [.getStudy(id)](#Client+instances.getStudy) ⇒ <code>Promise</code>
  * [.series](#Client+series)
    * [.getAll()](#Client+series.getAll) ⇒ <code>Promise</code>
    * [.get(id)](#Client+series.get) ⇒ <code>Promise</code>
    * [.getArchive(id)](#Client+series.getArchive) ⇒ <code>Promise</code>
    * [.getInstances(id)](#Client+series.getInstances) ⇒ <code>Promise</code>
    * [.getMedia(id)](#Client+series.getMedia) ⇒ <code>Promise</code>
    * [.getModule(id, [simplify])](#Client+series.getModule) ⇒ <code>Promise</code>
    * [.getPatient(id)](#Client+series.getPatient) ⇒ <code>Promise</code>
    * [.getSharedTags(id, [simplify])](#Client+series.getSharedTags) ⇒ <code>Promise</code>
    * [.getStatistics(id)](#Client+series.getStatistics) ⇒ <code>Promise</code>
    * [.getStudy(id)](#Client+series.getStudy) ⇒ <code>Promise</code>
  * [.studies](#Client+studies)
    * [.getAll()](#Client+studies.getAll) ⇒ <code>Promise</code>
    * [.get(id)](#Client+studies.get) ⇒ <code>Promise</code>
    * [.getArchive(id)](#Client+studies.getArchive) ⇒ <code>Promise</code>
    * [.getInstances(id)](#Client+studies.getInstances) ⇒ <code>Promise</code>
    * [.getMedia(id)](#Client+studies.getMedia) ⇒ <code>Promise</code>
    * [.getModule(id, [simplify])](#Client+studies.getModule) ⇒ <code>Promise</code>
    * [.getModulePatient(id, [simplify])](#Client+studies.getModulePatient) ⇒ <code>Promise</code>
    * [.getPatient(id)](#Client+studies.getPatient) ⇒ <code>Promise</code>
    * [.getSeries(id)](#Client+studies.getSeries) ⇒ <code>Promise</code>
    * [.getSharedTags(id, [simplify])](#Client+studies.getSharedTags) ⇒ <code>Promise</code>
    * [.getStatistics(id)](#Client+studies.getStatistics) ⇒ <code>Promise</code>
  * [.patients](#Client+patients)
    * [.getAll()](#Client+patients.getAll) ⇒ <code>Promise</code>
    * [.get(id)](#Client+patients.get) ⇒ <code>Promise</code>
    * [.getArchive(id)](#Client+patients.getArchive) ⇒ <code>Promise</code>
    * [.getInstances(id)](#Client+patients.getInstances) ⇒ <code>Promise</code>
    * [.getMedia(id)](#Client+patients.getMedia) ⇒ <code>Promise</code>
    * [.getModule(id, [simplify])](#Client+patients.getModule) ⇒ <code>Promise</code>
    * [.getProtected(id)](#Client+patients.getProtected) ⇒ <code>Promise</code>
    * [.setProtected(id, protect)](#Client+patients.setProtected) ⇒ <code>Promise</code>
    * [.getSeries(id)](#Client+patients.getSeries) ⇒ <code>Promise</code>
    * [.getSharedTags(id, [simplify])](#Client+patients.getSharedTags) ⇒ <code>Promise</code>
    * [.getStatistics(id)](#Client+patients.getStatistics) ⇒ <code>Promise</code>
    * [.getStudies(id)](#Client+patients.getStudies) ⇒ <code>Promise</code>
  * [.tools](#Client+tools)
    * [.now()](#Client+tools.now) ⇒ <code>Promise</code>
    * [.reset()](#Client+tools.reset) ⇒ <code>Promise</code>
    * [.lookup(uuid)](#Client+tools.lookup) ⇒ <code>Promise</code>
    * [.dicomConformance()](#Client+tools.dicomConformance) ⇒ <code>Promise</code>
    * [.generateUid(level)](#Client+tools.generateUid) ⇒ <code>Promise</code>
  * [.system](#Client+system)
    * [.system()](#Client+system.system) ⇒ <code>Promise</code>
  * [.changes](#Client+changes)
    * [.getChanges([params])](#Client+changes.getChanges) ⇒ <code>Promise</code>
    * [.deleteChanges()](#Client+changes.deleteChanges) ⇒ <code>Promise</code>
  * [.exports](#Client+exports)
    * [.getExports([params])](#Client+exports.getExports) ⇒ <code>Promise</code>
    * [.deleteExports()](#Client+exports.deleteExports) ⇒ <code>Promise</code>

<a name="new_Client_new"></a>
### new Client(param)
Creates a new Client


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| param | <code>Object</code> |  |  |
| [param.url] | <code>String</code> | <code>http://localhost:8042</code> | Orthanc REST API's URL |
| [param.auth] | <code>Object</code> |  |  |
| [param.auth.user] | <code>String</code> |  | Valid Orthanc Server username |
| [param.auth.pass] | <code>String</code> |  | Valid Orthanc Server password |

<a name="Client+url"></a>
### client.url : <code>String</code>
Orthanc REST API's url

**Kind**: instance property of <code>[Client](#Client)</code>  
<a name="Client+auth"></a>
### client.auth : <code>Object</code>
Orthanc REST API's user credentials

**Kind**: instance property of <code>[Client](#Client)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| username | <code>String</code> | Username which will be used by the client to authenticate against Orthanc server |
| password | <code>String</code> | Password which will be used by the client to authenticate against Orthanc server |

<a name="Client+instances"></a>
### client.instances
Operations over instances

**Kind**: instance property of <code>[Client](#Client)</code>  

* [.instances](#Client+instances)
  * [.getAll()](#Client+instances.getAll) ⇒ <code>Promise</code>
  * [.get(id)](#Client+instances.get) ⇒ <code>Promise</code>
  * [.add(buffer)](#Client+instances.add) ⇒ <code>Promise</code>
  * [.getContent(id, [group], [element], [index])](#Client+instances.getContent) ⇒ <code>Promise</code>
  * [.export(id)](#Client+instances.export) ⇒ <code>Promise</code>
  * [.getFile(id)](#Client+instances.getFile) ⇒ <code>Promise</code>
  * [.getAllFrames(id)](#Client+instances.getAllFrames) ⇒ <code>Promise</code>
  * [.getFrame(id, frameNumber, [frameFormat])](#Client+instances.getFrame)
  * [.getImage(id, [imageFormat])](#Client+instances.getImage)
  * [.getModule(id, [simplify])](#Client+instances.getModule) ⇒ <code>Promise</code>
  * [.getPatient(id)](#Client+instances.getPatient) ⇒ <code>Promise</code>
  * [.getSeries(id)](#Client+instances.getSeries) ⇒ <code>Promise</code>
  * [.getTags(id, [simplify])](#Client+instances.getTags) ⇒ <code>Promise</code>
  * [.getStatistics(id)](#Client+instances.getStatistics) ⇒ <code>Promise</code>
  * [.getStudy(id)](#Client+instances.getStudy) ⇒ <code>Promise</code>

<a name="Client+instances.getAll"></a>
#### instances.getAll() ⇒ <code>Promise</code>
Get all instances

**Kind**: static method of <code>[instances](#Client+instances)</code>  
**Returns**: <code>Promise</code> - The expected response is an array containing Strings  
<a name="Client+instances.get"></a>
#### instances.get(id) ⇒ <code>Promise</code>
Get the instance with the given id

**Kind**: static method of <code>[instances](#Client+instances)</code>  
**Returns**: <code>Promise</code> - The expected result is a JSON object  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted instance |

<a name="Client+instances.add"></a>
#### instances.add(buffer) ⇒ <code>Promise</code>
Add the new DICOM file given as a Buffer

**Kind**: static method of <code>[instances](#Client+instances)</code>  
**Returns**: <code>Promise</code> - The expected result is a JSON object  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Buffer</code> | The DICOM file which will be uploaded |

<a name="Client+instances.getContent"></a>
#### instances.getContent(id, [group], [element], [index]) ⇒ <code>Promise</code>
Get raw access to DICOM tags. If both group and element are provided, get raw access to the value of the targeted DICOM tag. If index is also provided, get raw access to the targeted DICOM sequence value.

**Kind**: static method of <code>[instances](#Client+instances)</code>  
**Returns**: <code>Promise</code> - The expected value is either an array containing Strings, either a String (if group and element are both provided)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted instance |
| [group] | <code>String</code> | Group number of the targeted element |
| [element] | <code>String</code> | Element number of the targeted value |
| [index] | <code>Integer</code> | Index number of the targeted sequence value |

<a name="Client+instances.export"></a>
#### instances.export(id) ⇒ <code>Promise</code>
Write the DICOM file in the filesystem where Orthanc is running

**Kind**: static method of <code>[instances](#Client+instances)</code>  
**Returns**: <code>Promise</code> - The expected response is an empty JSON object  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted instance |

<a name="Client+instances.getFile"></a>
#### instances.getFile(id) ⇒ <code>Promise</code>
Get the .dcm file of the instance with the given id

**Kind**: static method of <code>[instances](#Client+instances)</code>  
**Returns**: <code>Promise</code> - The expected response is a Buffer  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted instance |

<a name="Client+instances.getAllFrames"></a>
#### instances.getAllFrames(id) ⇒ <code>Promise</code>
Get an array containing all the frames index of the instance with the given id

**Kind**: static method of <code>[instances](#Client+instances)</code>  
**Returns**: <code>Promise</code> - The expected response is an array containing Integers  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted instance |

<a name="Client+instances.getFrame"></a>
#### instances.getFrame(id, frameNumber, [frameFormat])
Get the frameNumber'th frame of the instance with the given id

**Kind**: static method of <code>[instances](#Client+instances)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>String</code> |  | Id of the targeted instance |
| frameNumber | <code>Integer</code> |  | Index of the targeted frame |
| [frameFormat] | <code>String</code> | <code>preview</code> | Wanted format for the targeted frame. Must be image-int16, image-uint16, image-uint8, matlab or preview |

<a name="Client+instances.getImage"></a>
#### instances.getImage(id, [imageFormat])
Get the image of the instance with the given id

**Kind**: static method of <code>[instances](#Client+instances)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>String</code> |  | Id of the targeted instance |
| [imageFormat] | <code>String</code> | <code>preview</code> | Wanted format for the targeted frame. Must be image-int16, image-uint16, image-uint8, matlab or preview |

<a name="Client+instances.getModule"></a>
#### instances.getModule(id, [simplify]) ⇒ <code>Promise</code>
**Kind**: static method of <code>[instances](#Client+instances)</code>  
**Returns**: <code>Promise</code> - The expected response is a JSON object  
**Todo**

- [ ] Improve the documentation of this function


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>String</code> |  | Id of the targeted instance |
| [simplify] | <code>Boolean</code> | <code>false</code> | Specify whether or not the output should be simplified |

<a name="Client+instances.getPatient"></a>
#### instances.getPatient(id) ⇒ <code>Promise</code>
Get the parent Patient of the instance with the given id

**Kind**: static method of <code>[instances](#Client+instances)</code>  
**Returns**: <code>Promise</code> - The expected result is a JSON objects  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted instance |

<a name="Client+instances.getSeries"></a>
#### instances.getSeries(id) ⇒ <code>Promise</code>
Get the parent Series of the instance with the given id

**Kind**: static method of <code>[instances](#Client+instances)</code>  
**Returns**: <code>Promise</code> - The expected result is a JSON objects  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted instance |

<a name="Client+instances.getTags"></a>
#### instances.getTags(id, [simplify]) ⇒ <code>Promise</code>
Get the tags of the instance with the given id

**Kind**: static method of <code>[instances](#Client+instances)</code>  
**Returns**: <code>Promise</code> - The expected response is a JSON object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>String</code> |  | Id of the targeted instance |
| [simplify] | <code>Boolean</code> | <code>false</code> | Specify whether or not the output should be simplified |

<a name="Client+instances.getStatistics"></a>
#### instances.getStatistics(id) ⇒ <code>Promise</code>
Get some general informations about the instance with the given id

**Kind**: static method of <code>[instances](#Client+instances)</code>  
**Returns**: <code>Promise</code> - The expected response is a JSON object  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted instance |

<a name="Client+instances.getStudy"></a>
#### instances.getStudy(id) ⇒ <code>Promise</code>
Get the parent Study of the instance with the given id

**Kind**: static method of <code>[instances](#Client+instances)</code>  
**Returns**: <code>Promise</code> - The expected result is a JSON objects  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted instance |

<a name="Client+series"></a>
### client.series
Operations over series

**Kind**: instance property of <code>[Client](#Client)</code>  

* [.series](#Client+series)
  * [.getAll()](#Client+series.getAll) ⇒ <code>Promise</code>
  * [.get(id)](#Client+series.get) ⇒ <code>Promise</code>
  * [.getArchive(id)](#Client+series.getArchive) ⇒ <code>Promise</code>
  * [.getInstances(id)](#Client+series.getInstances) ⇒ <code>Promise</code>
  * [.getMedia(id)](#Client+series.getMedia) ⇒ <code>Promise</code>
  * [.getModule(id, [simplify])](#Client+series.getModule) ⇒ <code>Promise</code>
  * [.getPatient(id)](#Client+series.getPatient) ⇒ <code>Promise</code>
  * [.getSharedTags(id, [simplify])](#Client+series.getSharedTags) ⇒ <code>Promise</code>
  * [.getStatistics(id)](#Client+series.getStatistics) ⇒ <code>Promise</code>
  * [.getStudy(id)](#Client+series.getStudy) ⇒ <code>Promise</code>

<a name="Client+series.getAll"></a>
#### series.getAll() ⇒ <code>Promise</code>
Get all series

**Kind**: static method of <code>[series](#Client+series)</code>  
**Returns**: <code>Promise</code> - The expected result is an array containing Strings  
<a name="Client+series.get"></a>
#### series.get(id) ⇒ <code>Promise</code>
Get the series with the given id

**Kind**: static method of <code>[series](#Client+series)</code>  
**Returns**: <code>Promise</code> - The expected result is a JSON object  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted series |

<a name="Client+series.getArchive"></a>
#### series.getArchive(id) ⇒ <code>Promise</code>
Get a zipped archive containing the series with the given id

**Kind**: static method of <code>[series](#Client+series)</code>  
**Returns**: <code>Promise</code> - The expected response is a Buffer  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted series |

<a name="Client+series.getInstances"></a>
#### series.getInstances(id) ⇒ <code>Promise</code>
Get all the instances of the series with the given id

**Kind**: static method of <code>[series](#Client+series)</code>  
**Returns**: <code>Promise</code> - The expected response is an array of JSON objects  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted series |

<a name="Client+series.getMedia"></a>
#### series.getMedia(id) ⇒ <code>Promise</code>
Get a zipped archive containing the series with the given id for media storage with DICOMDIR

**Kind**: static method of <code>[series](#Client+series)</code>  
**Returns**: <code>Promise</code> - The expected response is a Buffer  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted series |

<a name="Client+series.getModule"></a>
#### series.getModule(id, [simplify]) ⇒ <code>Promise</code>
**Kind**: static method of <code>[series](#Client+series)</code>  
**Returns**: <code>Promise</code> - The expected response is a JSON object  
**Todo**

- [ ] Improve the documentation of this function


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>String</code> |  | Id of the targeted series |
| [simplify] | <code>Boolean</code> | <code>false</code> | Specify whether or not the output should be simplified |

<a name="Client+series.getPatient"></a>
#### series.getPatient(id) ⇒ <code>Promise</code>
Get the parent Patient of the series with the given id

**Kind**: static method of <code>[series](#Client+series)</code>  
**Returns**: <code>Promise</code> - The expected result is an array of JSON objects  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted series |

<a name="Client+series.getSharedTags"></a>
#### series.getSharedTags(id, [simplify]) ⇒ <code>Promise</code>
Get the shared tags of the series with the given id

**Kind**: static method of <code>[series](#Client+series)</code>  
**Returns**: <code>Promise</code> - The expected response is a JSON object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>String</code> |  | Id of the targeted series |
| [simplify] | <code>Boolean</code> | <code>false</code> | Specify whether or not the output should be simplified |

<a name="Client+series.getStatistics"></a>
#### series.getStatistics(id) ⇒ <code>Promise</code>
Get some general informations about the series with the given id

**Kind**: static method of <code>[series](#Client+series)</code>  
**Returns**: <code>Promise</code> - The expected response is a JSON object  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted series |

<a name="Client+series.getStudy"></a>
#### series.getStudy(id) ⇒ <code>Promise</code>
Get the parent Study of the series with the given id

**Kind**: static method of <code>[series](#Client+series)</code>  
**Returns**: <code>Promise</code> - The expected result is an array of JSON objects  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted series |

<a name="Client+studies"></a>
### client.studies
Operations over studies

**Kind**: instance property of <code>[Client](#Client)</code>  

* [.studies](#Client+studies)
  * [.getAll()](#Client+studies.getAll) ⇒ <code>Promise</code>
  * [.get(id)](#Client+studies.get) ⇒ <code>Promise</code>
  * [.getArchive(id)](#Client+studies.getArchive) ⇒ <code>Promise</code>
  * [.getInstances(id)](#Client+studies.getInstances) ⇒ <code>Promise</code>
  * [.getMedia(id)](#Client+studies.getMedia) ⇒ <code>Promise</code>
  * [.getModule(id, [simplify])](#Client+studies.getModule) ⇒ <code>Promise</code>
  * [.getModulePatient(id, [simplify])](#Client+studies.getModulePatient) ⇒ <code>Promise</code>
  * [.getPatient(id)](#Client+studies.getPatient) ⇒ <code>Promise</code>
  * [.getSeries(id)](#Client+studies.getSeries) ⇒ <code>Promise</code>
  * [.getSharedTags(id, [simplify])](#Client+studies.getSharedTags) ⇒ <code>Promise</code>
  * [.getStatistics(id)](#Client+studies.getStatistics) ⇒ <code>Promise</code>

<a name="Client+studies.getAll"></a>
#### studies.getAll() ⇒ <code>Promise</code>
Get all studies

**Kind**: static method of <code>[studies](#Client+studies)</code>  
**Returns**: <code>Promise</code> - The expected result is an array containing Strings  
<a name="Client+studies.get"></a>
#### studies.get(id) ⇒ <code>Promise</code>
Get the study with the given id

**Kind**: static method of <code>[studies](#Client+studies)</code>  
**Returns**: <code>Promise</code> - The expected result is a JSON object  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted study |

<a name="Client+studies.getArchive"></a>
#### studies.getArchive(id) ⇒ <code>Promise</code>
Get a zipped archive containing the study with the given id

**Kind**: static method of <code>[studies](#Client+studies)</code>  
**Returns**: <code>Promise</code> - The expected response is a Buffer  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted study |

<a name="Client+studies.getInstances"></a>
#### studies.getInstances(id) ⇒ <code>Promise</code>
Get all the instances of the study with the given id

**Kind**: static method of <code>[studies](#Client+studies)</code>  
**Returns**: <code>Promise</code> - The expected response is an array of JSON objects  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted study |

<a name="Client+studies.getMedia"></a>
#### studies.getMedia(id) ⇒ <code>Promise</code>
Get a zipped archive containing the study with the given id for media storage with DICOMDIR

**Kind**: static method of <code>[studies](#Client+studies)</code>  
**Returns**: <code>Promise</code> - The expected response is a Buffer  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted study |

<a name="Client+studies.getModule"></a>
#### studies.getModule(id, [simplify]) ⇒ <code>Promise</code>
**Kind**: static method of <code>[studies](#Client+studies)</code>  
**Returns**: <code>Promise</code> - The expected response is a JSON object  
**Todo**

- [ ] Improve the documentation of this function


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>String</code> |  | Id of the targeted study |
| [simplify] | <code>Boolean</code> | <code>false</code> | Specify whether or not the output should be simplified |

<a name="Client+studies.getModulePatient"></a>
#### studies.getModulePatient(id, [simplify]) ⇒ <code>Promise</code>
**Kind**: static method of <code>[studies](#Client+studies)</code>  
**Returns**: <code>Promise</code> - The expected response is a JSON object  
**Todo**

- [ ] Improve the documentation of this function


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>String</code> |  | Id of the targeted study |
| [simplify] | <code>Boolean</code> | <code>false</code> | Specify whether or not the output should be simplified |

<a name="Client+studies.getPatient"></a>
#### studies.getPatient(id) ⇒ <code>Promise</code>
Get the parent Patient of the study with the given id

**Kind**: static method of <code>[studies](#Client+studies)</code>  
**Returns**: <code>Promise</code> - The expected result is an array of JSON objects  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted study |

<a name="Client+studies.getSeries"></a>
#### studies.getSeries(id) ⇒ <code>Promise</code>
Get all the series of the study with the given id

**Kind**: static method of <code>[studies](#Client+studies)</code>  
**Returns**: <code>Promise</code> - The expected result is an array of JSON objects  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted study |

<a name="Client+studies.getSharedTags"></a>
#### studies.getSharedTags(id, [simplify]) ⇒ <code>Promise</code>
Get the shared tags of the study with the given id

**Kind**: static method of <code>[studies](#Client+studies)</code>  
**Returns**: <code>Promise</code> - The expected response is a JSON object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>String</code> |  | Id of the targeted study |
| [simplify] | <code>Boolean</code> | <code>false</code> | Specify whether or not the output should be simplified |

<a name="Client+studies.getStatistics"></a>
#### studies.getStatistics(id) ⇒ <code>Promise</code>
Get some general informations about the study with the given id

**Kind**: static method of <code>[studies](#Client+studies)</code>  
**Returns**: <code>Promise</code> - The expected response is a JSON object  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted study |

<a name="Client+patients"></a>
### client.patients
Operations over patients

**Kind**: instance property of <code>[Client](#Client)</code>  

* [.patients](#Client+patients)
  * [.getAll()](#Client+patients.getAll) ⇒ <code>Promise</code>
  * [.get(id)](#Client+patients.get) ⇒ <code>Promise</code>
  * [.getArchive(id)](#Client+patients.getArchive) ⇒ <code>Promise</code>
  * [.getInstances(id)](#Client+patients.getInstances) ⇒ <code>Promise</code>
  * [.getMedia(id)](#Client+patients.getMedia) ⇒ <code>Promise</code>
  * [.getModule(id, [simplify])](#Client+patients.getModule) ⇒ <code>Promise</code>
  * [.getProtected(id)](#Client+patients.getProtected) ⇒ <code>Promise</code>
  * [.setProtected(id, protect)](#Client+patients.setProtected) ⇒ <code>Promise</code>
  * [.getSeries(id)](#Client+patients.getSeries) ⇒ <code>Promise</code>
  * [.getSharedTags(id, [simplify])](#Client+patients.getSharedTags) ⇒ <code>Promise</code>
  * [.getStatistics(id)](#Client+patients.getStatistics) ⇒ <code>Promise</code>
  * [.getStudies(id)](#Client+patients.getStudies) ⇒ <code>Promise</code>

<a name="Client+patients.getAll"></a>
#### patients.getAll() ⇒ <code>Promise</code>
Get all patients

**Kind**: static method of <code>[patients](#Client+patients)</code>  
**Returns**: <code>Promise</code> - The expected result is an array containing Strings  
<a name="Client+patients.get"></a>
#### patients.get(id) ⇒ <code>Promise</code>
Get the patient with the given id

**Kind**: static method of <code>[patients](#Client+patients)</code>  
**Returns**: <code>Promise</code> - The expected result is a JSON object  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted patient |

<a name="Client+patients.getArchive"></a>
#### patients.getArchive(id) ⇒ <code>Promise</code>
Get a zipped archive containing the patient with the given id

**Kind**: static method of <code>[patients](#Client+patients)</code>  
**Returns**: <code>Promise</code> - The expected response is a Buffer  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted patient |

<a name="Client+patients.getInstances"></a>
#### patients.getInstances(id) ⇒ <code>Promise</code>
Get all the instances of the patient with the given id

**Kind**: static method of <code>[patients](#Client+patients)</code>  
**Returns**: <code>Promise</code> - The expected response is an array of JSON objects  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted patient |

<a name="Client+patients.getMedia"></a>
#### patients.getMedia(id) ⇒ <code>Promise</code>
Get a zipped archive containing the patient with the given id for media storage with DICOMDIR

**Kind**: static method of <code>[patients](#Client+patients)</code>  
**Returns**: <code>Promise</code> - The expected response is a Buffer  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted patient |

<a name="Client+patients.getModule"></a>
#### patients.getModule(id, [simplify]) ⇒ <code>Promise</code>
**Kind**: static method of <code>[patients](#Client+patients)</code>  
**Returns**: <code>Promise</code> - The expected response is a JSON object  
**Todo**

- [ ] Improve the documentation of this function


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>String</code> |  | Id of the targeted patient |
| [simplify] | <code>Boolean</code> | <code>false</code> |  |

<a name="Client+patients.getProtected"></a>
#### patients.getProtected(id) ⇒ <code>Promise</code>
Get the protection against recycling status

**Kind**: static method of <code>[patients](#Client+patients)</code>  
**Returns**: <code>Promise</code> - The expected result is a Boolean  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted patient |

<a name="Client+patients.setProtected"></a>
#### patients.setProtected(id, protect) ⇒ <code>Promise</code>
Set the protection against recycling status

**Kind**: static method of <code>[patients](#Client+patients)</code>  
**Returns**: <code>Promise</code> - The expected response is empty  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted patient |
| protect | <code>Boolean</code> | Specify whether or not the patient should be protected against recycling |

<a name="Client+patients.getSeries"></a>
#### patients.getSeries(id) ⇒ <code>Promise</code>
Get all the series of the patient with the given id

**Kind**: static method of <code>[patients](#Client+patients)</code>  
**Returns**: <code>Promise</code> - The expected result is an array of JSON objects  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted patient |

<a name="Client+patients.getSharedTags"></a>
#### patients.getSharedTags(id, [simplify]) ⇒ <code>Promise</code>
Get the shared tags of the patient with the given id

**Kind**: static method of <code>[patients](#Client+patients)</code>  
**Returns**: <code>Promise</code> - The expected response is a JSON object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>String</code> |  | Id of the targeted patient |
| [simplify] | <code>Boolean</code> | <code>false</code> |  |

<a name="Client+patients.getStatistics"></a>
#### patients.getStatistics(id) ⇒ <code>Promise</code>
Get some general informations about the patient with the given id

**Kind**: static method of <code>[patients](#Client+patients)</code>  
**Returns**: <code>Promise</code> - The expected response is a JSON object  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted patient |

<a name="Client+patients.getStudies"></a>
#### patients.getStudies(id) ⇒ <code>Promise</code>
Get all the studies of the patient with the given id

**Kind**: static method of <code>[patients](#Client+patients)</code>  
**Returns**: <code>Promise</code> - The expected response is an array of JSON objects  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of the targeted patient |

<a name="Client+tools"></a>
### client.tools
Tools operations

**Kind**: instance property of <code>[Client](#Client)</code>  

* [.tools](#Client+tools)
  * [.now()](#Client+tools.now) ⇒ <code>Promise</code>
  * [.reset()](#Client+tools.reset) ⇒ <code>Promise</code>
  * [.lookup(uuid)](#Client+tools.lookup) ⇒ <code>Promise</code>
  * [.dicomConformance()](#Client+tools.dicomConformance) ⇒ <code>Promise</code>
  * [.generateUid(level)](#Client+tools.generateUid) ⇒ <code>Promise</code>

<a name="Client+tools.now"></a>
#### tools.now() ⇒ <code>Promise</code>
Returns the current datetime in the ISO 8601 format

**Kind**: static method of <code>[tools](#Client+tools)</code>  
**Returns**: <code>Promise</code> - The expected response is a String  
<a name="Client+tools.reset"></a>
#### tools.reset() ⇒ <code>Promise</code>
Hot restart of Orthanc, the configuration file will be read again

**Kind**: static method of <code>[tools](#Client+tools)</code>  
**Returns**: <code>Promise</code> - The expected response is an empty JSON object  
<a name="Client+tools.lookup"></a>
#### tools.lookup(uuid) ⇒ <code>Promise</code>
Map DICOM UIDs to Orthanc identifiers

**Kind**: static method of <code>[tools](#Client+tools)</code>  
**Returns**: <code>Promise</code> - The expected result is an array containing a JSON object  

| Param | Type | Description |
| --- | --- | --- |
| uuid | <code>UUID</code> | UUID which will be used to perform the lookup |

<a name="Client+tools.dicomConformance"></a>
#### tools.dicomConformance() ⇒ <code>Promise</code>
DICOM conformance statement of this version of Orthanc

**Kind**: static method of <code>[tools](#Client+tools)</code>  
**Returns**: <code>Promise</code> - The expected result is a String  
<a name="Client+tools.generateUid"></a>
#### tools.generateUid(level) ⇒ <code>Promise</code>
Generates an UUID

**Kind**: static method of <code>[tools](#Client+tools)</code>  
**Returns**: <code>Promise</code> - The expected result is a String  

| Param | Type | Description |
| --- | --- | --- |
| level | <code>String</code> | argument among "patient", "study", "series" and "instance" |

<a name="Client+system"></a>
### client.system
System operations

**Kind**: instance property of <code>[Client](#Client)</code>  
<a name="Client+system.system"></a>
#### system.system() ⇒ <code>Promise</code>
Get some information about the Orthanc Server

**Kind**: static method of <code>[system](#Client+system)</code>  
**Returns**: <code>Promise</code> - The expected response is a JSON object  
<a name="Client+changes"></a>
### client.changes
Operations over changes logs

**Kind**: instance property of <code>[Client](#Client)</code>  

* [.changes](#Client+changes)
  * [.getChanges([params])](#Client+changes.getChanges) ⇒ <code>Promise</code>
  * [.deleteChanges()](#Client+changes.deleteChanges) ⇒ <code>Promise</code>

<a name="Client+changes.getChanges"></a>
#### changes.getChanges([params]) ⇒ <code>Promise</code>
Get changes logs

**Kind**: static method of <code>[changes](#Client+changes)</code>  
**Returns**: <code>Promise</code> - The expected response is a JSON object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [params] | <code>Object</code> |  | last, "limit" and "since" arguments |
| [params.last] | <code>Boolean</code> | <code>false</code> | Specify whether or not only the last change should be returned |
| [params.since] | <code>Integer</code> | <code>0</code> | Set the sequence number since which changes should be returned |
| [params.limit] | <code>Integer</code> | <code>100</code> | Set the returned changes limit. Default and maximum values are the same : 100 |

<a name="Client+changes.deleteChanges"></a>
#### changes.deleteChanges() ⇒ <code>Promise</code>
Delete changes logs

**Kind**: static method of <code>[changes](#Client+changes)</code>  
**Returns**: <code>Promise</code> - The expected response is empty  
<a name="Client+exports"></a>
### client.exports
Operations over exports logs

**Kind**: instance property of <code>[Client](#Client)</code>  

* [.exports](#Client+exports)
  * [.getExports([params])](#Client+exports.getExports) ⇒ <code>Promise</code>
  * [.deleteExports()](#Client+exports.deleteExports) ⇒ <code>Promise</code>

<a name="Client+exports.getExports"></a>
#### exports.getExports([params]) ⇒ <code>Promise</code>
Get exports logs. For medical traceability, Orthanc stores a log of all the resources that have been exported to remote modalities.

**Kind**: static method of <code>[exports](#Client+exports)</code>  
**Returns**: <code>Promise</code> - The expected response is a JSON object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [params] | <code>Object</code> |  | last, "limit" and "since" arguments |
| [params.last] | <code>Boolean</code> | <code>false</code> | Specify whether or not only the last export should be returned |
| [params.since] | <code>Integer</code> | <code>0</code> | Set the sequence number since which exports should be returned |
| [params.limit] | <code>Integer</code> | <code>100</code> | Set the returned exports limit. Default and maximum values are the same : 100 |

<a name="Client+exports.deleteExports"></a>
#### exports.deleteExports() ⇒ <code>Promise</code>
Delete exports logs

**Kind**: static method of <code>[exports](#Client+exports)</code>  
**Returns**: <code>Promise</code> - The expected response is empty  
