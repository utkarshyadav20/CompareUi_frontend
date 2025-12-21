# CompareApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**compareControllerRunComparison**](#comparecontrollerruncomparison) | **POST** /compare/run | Run screenshot comparison|

# **compareControllerRunComparison**
> compareControllerRunComparison(compareBodyDto)


### Example

```typescript
import {
    CompareApi,
    Configuration,
    CompareBodyDto
} from './api';

const configuration = new Configuration();
const apiInstance = new CompareApi(configuration);

let projectId: string; //Project ID (default to undefined)
let projectType: string; //Project Type (default to undefined)
let compareBodyDto: CompareBodyDto; //
let sensitivity: string; //Comparison sensitivity (e.g. 1x, 2x, 3x) (optional) (default to undefined)
let buildId: string; //Build ID (optional) - if not passed, one will be created (optional) (default to undefined)

const { status, data } = await apiInstance.compareControllerRunComparison(
    projectId,
    projectType,
    compareBodyDto,
    sensitivity,
    buildId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **compareBodyDto** | **CompareBodyDto**|  | |
| **projectId** | [**string**] | Project ID | defaults to undefined|
| **projectType** | [**string**] | Project Type | defaults to undefined|
| **sensitivity** | [**string**] | Comparison sensitivity (e.g. 1x, 2x, 3x) | (optional) defaults to undefined|
| **buildId** | [**string**] | Build ID (optional) - if not passed, one will be created | (optional) defaults to undefined|


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
|**200** | Comparison successful |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

