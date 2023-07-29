# AngSQL

## It is application for manage MySQL databases and connections with Angular Cient and NodeJS server

## Requirements

* ### Angular CLI

```bash
npm i -g @angular/cli
```
#### Or

#### Move to folder proyect and run
```bash
npm i @angular/cli -D
```

* ### NodeJS and NPM (PNPM or Yarn) [NodeJS](https://nodejs.org/en)

## Installation

### Server Dependencies
```bash
cd server && npm i
```

### Client Dependencies
```bash
cd client && npm i
```

## Configuration

### If you are interested in changing the execution port of Node JS, you can do so by changing the port value in [server.json](./src/config/server.json). Although you will have to change the value of [consts.ts](../client/src/consts.ts) on the client.

### For example:
```json
// server/src/config/server.json
{
    "port": // YOUR PORT
    // Default port: 7777
}
```
```ts
// client/src/consts.ts
export const SERVER_HOST = 'http://localhost:'; // <-- SERVER.JSON port
// Default port: 7777
```

### If you want to change Angular's port, it's as simple as changing the port option of the client's [package.json](./client/package.json) start script:
```json
{
    "scripts": {
        // scripts...
        "start": "ng serve --port " // YOUR PORT
        // Default port 7778
    }
}
```

## Scripts

### Before execute start or development script, build server and client
```bash
npm run build
```

### Start
```bash
npm run start
```

### Development
#### The same as the start script but the server initializes with nodemon
```bash
npm run devel
```

### Lint
```bash
npm run lint
```
```bash
npm run lint:fix
```

## License
### This project is licensed under the MIT License
#### [LICENSE](./LICENSE)