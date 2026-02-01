# AuthApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**authControllerGetProfile**](#authcontrollergetprofile) | **GET** /auth/admin | |
|[**authControllerLogin**](#authcontrollerlogin) | **POST** /auth/login | |
|[**authControllerResendOtp**](#authcontrollerresendotp) | **POST** /auth/resend-otp | |
|[**authControllerSignup**](#authcontrollersignup) | **POST** /auth/signup | |
|[**authControllerVerifyOtp**](#authcontrollerverifyotp) | **POST** /auth/verify-otp | |

# **authControllerGetProfile**
> authControllerGetProfile()


### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

const { status, data } = await apiInstance.authControllerGetProfile();
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

# **authControllerLogin**
> authControllerLogin()


### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

const { status, data } = await apiInstance.authControllerLogin();
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

# **authControllerResendOtp**
> authControllerResendOtp(resendOtpDto)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    ResendOtpDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let resendOtpDto: ResendOtpDto; //

const { status, data } = await apiInstance.authControllerResendOtp(
    resendOtpDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **resendOtpDto** | **ResendOtpDto**|  | |


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

# **authControllerSignup**
> authControllerSignup(createUserDto)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    CreateUserDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let createUserDto: CreateUserDto; //

const { status, data } = await apiInstance.authControllerSignup(
    createUserDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createUserDto** | **CreateUserDto**|  | |


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

# **authControllerVerifyOtp**
> authControllerVerifyOtp(verifyOtpDto)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    VerifyOtpDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let verifyOtpDto: VerifyOtpDto; //

const { status, data } = await apiInstance.authControllerVerifyOtp(
    verifyOtpDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **verifyOtpDto** | **VerifyOtpDto**|  | |


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

