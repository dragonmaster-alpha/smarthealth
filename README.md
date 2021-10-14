# smarthealth-webui-war
This code is proprietary. No part is to be shared or reused without permission of Smart Health Solutions. 
Granting of access to this code does not grant a license to use it except for the intended purposes.   

Task:
* Upgrade build environment to generate ES6.

Environment:
* nodeVersion: v8.9.4
* npmVersion: 5.7.1

Build:
* npm install
* npm run compile-locale
* npm run build

Notes:
* This code has been extracted from the full project that includes the server and other components. 
  The project is build using Maven, but use of Maven is not required.
* The subdirectories `smarthealth-javascript` and `smarthealth-rest` are copies of code that is generated elsewhere in the project.
* It may be difficult to run the application as it requires a server and an auth server. 
  If the Storybook tests work correctly that is adequate.
* `package-lock.json` refers to an internal cache server `maven.smarthealth.com.au`. 
  This should be changed as necessary.

