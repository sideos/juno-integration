# Sample SSI Integration
Backend service sample showing SSI integration

# Environment Variables and Default Values
The environment variables are used in the interface folder index file


For te JUNO integration, SSI_SERVER and SSI_TOKEN are retrived during onboarding
In the sandbox integration SSI_SERVER is https://dev-cloud.sideos.io
In production SSI_SERVER is https://juno.sideos.io
The value of the SSI_TOKEN will be creeated inside the JUNO platform

## SSI_SERVER 
## SSI_TOKEN  


To test the integration devices needs to call the callback endpoints
THIS_SERVER should be the URL of the listening service, in this example the 
URL in which tihs server is running.
The THIS_SERVER_PORT is the port chosen to run the service

## THIS_SERVER 
## THIS_SERVER_PORT 

After all ENVIRONEMNT VARIABLES are set

## yarn install
## yarn run server

Calling THIS_SERVER/offer as a GET you will receive a JWT to offer a dataset if everything is correct. 
This JWT can be converted into a QRCode to be read by a device application.

Calling THIS_SERVER/request as a GET you will receive a JWT to request a dataset if everything is correct. 
This JWT can be converted into a QRCode to be read by a device application.
