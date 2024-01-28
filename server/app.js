const express = require('express')
const session = require("express-session")
const cors = require('cors') ;
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser') ;

const app = express() ;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser()) ;

app.use(session({
    secret: 'webproject',
    resave: false,
    saveUninitialized: true,
}))

app.listen(3000 , () => {
    console.log("server start") ;
})

// Connect DB 
const mongoose = require('mongoose');

const uri = "mongodb+srv://phai:123@endproject.pmadhqg.mongodb.net/ecommerce_db";
mongoose.connect(uri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// Routers 
const router = express.Router() ;

const UserApi = require('./routers/user.api') ;

app.use('/api/user',UserApi)

const Api = require("./routers/stock.api") ;

app.use('/api/stock',Api)

const Admin = require('./routers/admin.api') ;

app.use('/api/admin',Admin)
