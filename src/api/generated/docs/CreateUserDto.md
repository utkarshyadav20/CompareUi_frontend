# CreateUserDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**username** | **string** | Username of the user | [default to undefined]
**email** | **string** | Email of the user | [default to undefined]
**password** | **string** | Password of the user | [default to undefined]
**role** | **string** | Role of the user | [optional] [default to undefined]
**otp** | **string** | OTP for verification | [optional] [default to undefined]
**otpExpiry** | **string** | OTP expiry date | [optional] [default to undefined]

## Example

```typescript
import { CreateUserDto } from './api';

const instance: CreateUserDto = {
    username,
    email,
    password,
    role,
    otp,
    otpExpiry,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
