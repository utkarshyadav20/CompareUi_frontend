# ResultApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**resultControllerGetDetailedResult**](#resultcontrollergetdetailedresult) | **GET** /result/details | |
|[**resultControllerGetResults**](#resultcontrollergetresults) | **GET** /result/get-results | |

# **resultControllerGetDetailedResult**
> resultControllerGetDetailedResult()


### Example

```typescript
import {
    ResultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ResultApi(configuration);

let projectId: string; // (default to undefined)
let buildId: string; // (default to undefined)
let screenName: string; // (default to undefined)
let projectType: string; // (default to undefined)

const { status, data } = await apiInstance.resultControllerGetDetailedResult(
    projectId,
    buildId,
    screenName,
    projectType
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectId** | [**string**] |  | defaults to undefined|
| **buildId** | [**string**] |  | defaults to undefined|
| **screenName** | [**string**] |  | defaults to undefined|
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

# **resultControllerGetResults**
> resultControllerGetResults()


### Example

```typescript
import {
    ResultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ResultApi(configuration);

let projectId: string; // (default to undefined)
let buildId: string; // (default to undefined)

const { status, data } = await apiInstance.resultControllerGetResults(
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

