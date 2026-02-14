# AutomationApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**automationControllerCreate**](#automationcontrollercreate) | **POST** /automation/save | |
|[**automationControllerFindOne**](#automationcontrollerfindone) | **GET** /automation/fetch | |

# **automationControllerCreate**
> automationControllerCreate(body)


### Example

```typescript
import {
    AutomationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AutomationApi(configuration);

let body: object; //

const { status, data } = await apiInstance.automationControllerCreate(
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

# **automationControllerFindOne**
> automationControllerFindOne()


### Example

```typescript
import {
    AutomationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AutomationApi(configuration);

let projectId: string; // (default to undefined)
let buildId: string; // (default to undefined)

const { status, data } = await apiInstance.automationControllerFindOne(
    projectId,
    buildId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectId** | [**string**] |  | defaults to undefined|
| **buildId** | [**string**] |  | defaults to undefined|


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

