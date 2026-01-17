# FigmaApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**figmaControllerCreate**](#figmacontrollercreate) | **POST** /figma/screens | |
|[**figmaControllerDeleteAllScreens**](#figmacontrollerdeleteallscreens) | **DELETE** /figma/screens | |
|[**figmaControllerDeleteScreen**](#figmacontrollerdeletescreen) | **DELETE** /figma/screen | |
|[**figmaControllerExtractImage**](#figmacontrollerextractimage) | **POST** /figma/extract-image | |
|[**figmaControllerGetProxyImage**](#figmacontrollergetproxyimage) | **GET** /figma/proxy-image | |
|[**figmaControllerGetScreen**](#figmacontrollergetscreen) | **GET** /figma/screen | |
|[**figmaControllerGetScreens**](#figmacontrollergetscreens) | **GET** /figma/screens | |
|[**figmaControllerUpdateAllScreens**](#figmacontrollerupdateallscreens) | **GET** /figma/update-all-screens | |
|[**figmaControllerUploadScreen**](#figmacontrolleruploadscreen) | **POST** /figma/upload-screen | |

# **figmaControllerCreate**
> figmaControllerCreate(body)


### Example

```typescript
import {
    FigmaApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FigmaApi(configuration);

let body: object; //

const { status, data } = await apiInstance.figmaControllerCreate(
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

# **figmaControllerDeleteAllScreens**
> figmaControllerDeleteAllScreens()


### Example

```typescript
import {
    FigmaApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FigmaApi(configuration);

let projectId: string; // (default to undefined)
let projectType: string; // (default to undefined)

const { status, data } = await apiInstance.figmaControllerDeleteAllScreens(
    projectId,
    projectType
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectId** | [**string**] |  | defaults to undefined|
| **projectType** | [**string**] |  | defaults to undefined|


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

# **figmaControllerDeleteScreen**
> figmaControllerDeleteScreen()


### Example

```typescript
import {
    FigmaApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FigmaApi(configuration);

let projectId: string; // (default to undefined)
let projectType: string; // (default to undefined)
let screenName: string; // (default to undefined)

const { status, data } = await apiInstance.figmaControllerDeleteScreen(
    projectId,
    projectType,
    screenName
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectId** | [**string**] |  | defaults to undefined|
| **projectType** | [**string**] |  | defaults to undefined|
| **screenName** | [**string**] |  | defaults to undefined|


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

# **figmaControllerExtractImage**
> figmaControllerExtractImage()


### Example

```typescript
import {
    FigmaApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FigmaApi(configuration);

const { status, data } = await apiInstance.figmaControllerExtractImage();
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
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **figmaControllerGetProxyImage**
> figmaControllerGetProxyImage()


### Example

```typescript
import {
    FigmaApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FigmaApi(configuration);

let url: string; // (default to undefined)

const { status, data } = await apiInstance.figmaControllerGetProxyImage(
    url
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **url** | [**string**] |  | defaults to undefined|


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

# **figmaControllerGetScreen**
> figmaControllerGetScreen()


### Example

```typescript
import {
    FigmaApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FigmaApi(configuration);

let projectId: string; // (default to undefined)
let projectType: string; // (default to undefined)
let screenName: string; // (default to undefined)

const { status, data } = await apiInstance.figmaControllerGetScreen(
    projectId,
    projectType,
    screenName
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectId** | [**string**] |  | defaults to undefined|
| **projectType** | [**string**] |  | defaults to undefined|
| **screenName** | [**string**] |  | defaults to undefined|


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

# **figmaControllerGetScreens**
> figmaControllerGetScreens()


### Example

```typescript
import {
    FigmaApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FigmaApi(configuration);

let projectId: string; // (default to undefined)
let projectType: string; // (default to undefined)

const { status, data } = await apiInstance.figmaControllerGetScreens(
    projectId,
    projectType
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectId** | [**string**] |  | defaults to undefined|
| **projectType** | [**string**] |  | defaults to undefined|


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

# **figmaControllerUpdateAllScreens**
> figmaControllerUpdateAllScreens()


### Example

```typescript
import {
    FigmaApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FigmaApi(configuration);

let projectId: string; // (default to undefined)
let projectType: string; // (default to undefined)

const { status, data } = await apiInstance.figmaControllerUpdateAllScreens(
    projectId,
    projectType
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectId** | [**string**] |  | defaults to undefined|
| **projectType** | [**string**] |  | defaults to undefined|


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

# **figmaControllerUploadScreen**
> figmaControllerUploadScreen()


### Example

```typescript
import {
    FigmaApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FigmaApi(configuration);

const { status, data } = await apiInstance.figmaControllerUploadScreen();
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
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

