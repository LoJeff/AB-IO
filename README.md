# Auto Battler IO game

## Developer commands:
 To load the node modules:
```bash
cd client
npm install // install the server node module dependencies from client/package.json
cd ../backend
npm install // install the client node module dependencies from package.json
```
To run the development server:
```bash
cd client
npm run start # start the react client on port 3000
# in a new shell
cd backend
npm start # start the server on port 8000
```
To build for client for production:
```bash
cd client
npm run build # Resulting front end code will be in clients/build/
```
To build the backend with babel:
```bash
cd backend
npm run build
```
