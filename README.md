# Ecommerce
## Description
### A web site for online shopping, for all kind of products
### Admin User
The administrators of the web site can add any category of products they want, under wich they can add the products, remove them, or modify them.
### Guest User
A guest user can take a look on the web site, check the products, their prices and remaining quatities, but can not buy them until registration
### Client User
A client user can add products to their cart, they can also use their token (generated after registration) to make API request to the backend directly without passing throu the front-end.

## Prerequisites
- Docker
- MongoDB docker container running on port 27017, tag 6.0.7
  ```bash
   docker pull mongo:6.0.7
   ```
- minio docker container running on 9000 and 9090, login and create a user called 'adminUser' with a password 'PassKey2001', then create a bucket called 'products'.
  ```bash
   docker pull minio/minio:RELEASE.2023-07-11T21-29-34Z
    ```
- Node.js v20.18.0
- React 18.2.0

## Install Dependencies
The same command should be run for both the front-end and the back-end:
```bash
npm install
 ```

## Run the app
Run the following command to start the front-end:
```bash
npm start
```
Run the following command to start the back-end:
```bash
node server.js
```
## Clone
```bash
git clone https://github.com/MajedHL/Ecommerce.git
