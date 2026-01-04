# ProjectApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**projectControllerCreate**](#projectcontrollercreate) | **POST** /project | |
|[**projectControllerCreateBuild**](#projectcontrollercreatebuild) | **POST** /project/build | Create a new build|
|[**projectControllerDelete**](#projectcontrollerdelete) | **DELETE** /project/{id} | |
|[**projectControllerFindAll**](#projectcontrollerfindall) | **GET** /project | |
|[**projectControllerGetBuilds**](#projectcontrollergetbuilds) | **GET** /project/builds | Get all builds for a project|

# **projectControllerCreate**
> projectControllerCreate(body)


### Example

```typescript
import {
    ProjectApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let body: object; //

const { status, data } = await apiInstance.projectControllerCreate(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **object**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **projectControllerCreateBuild**
> projectControllerCreateBuild(createBuildDto)


### Example

```typescript
import {
    ProjectApi,
    Configuration,
    CreateBuildDto
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let projectId: string; //Project ID (default to undefined)
let createBuildDto: CreateBuildDto; //

const { status, data } = await apiInstance.projectControllerCreateBuild(
    projectId,
    createBuildDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createBuildDto** | **CreateBuildDto**|  | |
| **projectId** | [**string**] | Project ID | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Build created successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **projectControllerDelete**
> projectControllerDelete()


### Example

```typescript
import {
    ProjectApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.projectControllerDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **projectControllerFindAll**
> projectControllerFindAll()


### Example

```typescript
import {
    ProjectApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

const { status, data } = await apiInstance.projectControllerFindAll();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **projectControllerGetBuilds**
> projectControllerGetBuilds()


### Example

```typescript
import {
    ProjectApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let projectId: string; //Project ID (default to undefined)

const { status, data } = await apiInstance.projectControllerGetBuilds(
    projectId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectId** | [**string**] | Project ID | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of builds |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

