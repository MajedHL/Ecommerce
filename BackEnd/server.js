const express=require('express');
const mongoose=require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');

const {router}=require('./Routes/UsersRoute');
const { router : fruitsRouter}=require('./Routes/FruitsRoute');
const {router : cartsRouter}=require('./Routes/CartsRoute');
const {router : authRouter}=require('./Routes/AuthRoute');


 mongoose.connect('mongodb://localhost:27017/')
.catch(error => console.log('Connection Error:'+error));


const crypto = require('crypto');

const generateSessionSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

const sessionSecret = generateSessionSecret();



const app=express();


const cors=require('cors');


app.use(cookieParser());

app.use(session({
  secret: sessionSecret, // Replace with a strong secret key for session encryption
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/' }),
  cookie: {
     secure: false, // Set to true if using HTTPS
     httpOnly: false,
     maxAge: 3600000, // Session expiration time (in milliseconds)
  }
}));
// Allow http://localhost:3000 to access this server
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // Include credentials (cookies) with the request
  }));
app.use(express.json());

app.use('/users', router)
app.use('/fruits', fruitsRouter)
app.use('/carts', cartsRouter)
app.use('/auth', authRouter)


app.listen(5000,()=>{
    console.log("server listening on port 5000")
})
module.exports={app};

