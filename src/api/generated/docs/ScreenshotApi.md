# ScreenshotApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**screenshotControllerGetScreenshots**](#screenshotcontrollergetscreenshots) | **GET** /screenshot/get-screenshots | Get all screenshots for a project and build|

# **screenshotControllerGetScreenshots**
> screenshotControllerGetScreenshots()


### Example

```typescript
import {
    ScreenshotApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ScreenshotApi(configuration);

const { status, data } = await apiInstance.screenshotControllerGetScreenshots();
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

