const Minio = require('minio');

const minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'adminUser',
    secretKey: 'Passkey2001',
  });



  module.exports={minioClient}