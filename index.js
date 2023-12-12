const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session');
const redis = require('redis');
let RedisStore = require('connect-redis')(session);
const cors = require('cors')

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT ,SESSION_SECRET } = require("./config/config");

let redisClient = redis.createClient({
  host : REDIS_URL ,
  port : REDIS_PORT
})

const postRouter = require('./routes/post')
const userRouter = require('./routes/user')

const app = express();

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
const connectWithRetry = ()=>{
  mongoose.connect(mongoUrl)
  .then(()=> console.log('successfuly connected to DB!'))
  .catch((e)=>{console.log(e)
  setTimeout(connectWithRetry , 5000)
})
}
connectWithRetry();

app.enable("trust proxy")
app.use(cors({}))

app.use(session({
  store : new RedisStore({client : redisClient}) ,
  secret : SESSION_SECRET,
  cookie: {
    secure : false ,
    resave : false ,
    saveUninitialized : false ,
    httpOnly : true ,
    maxAge : 60000
  }

}))

app.use(express.json())

app.get("/api", (req, res) => {
  res.send("<h2> Hi there !!<h2>");
  console.log('yeah it ran')
});

//www.google.com -> www.yahoo.com

//localhost:3000/posts
app.use('/api/posts' , postRouter)
app.use('/api/users' , userRouter)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`backend server is running on ${port}`));
