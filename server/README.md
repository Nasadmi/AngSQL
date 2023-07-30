# AngSQL - Server

## Information about server
###  The server handles the API that is responsible for connecting MySQL and Angular securely.

### It has multiple routes and has a [crypt.ts](./src/lib/crypt.ts) file that is responsible for encrypting the passwords and if in the future you have to connect, the server decrypts it to re-encrypt it, all connection data is saved in [connections.ts](./src/config/connections.ts) after building,connections.js.

### As long as the [connections.ts](./src/config/connections.ts) file is not modified manually, there will be no problem decrypting it, do not manipulate this file if you don't want to recreate connections.

## License
### This project is licensed under the MIT License
### [LICENSE](../LICENSE)
