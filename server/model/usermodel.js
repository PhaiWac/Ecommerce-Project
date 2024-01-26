const mongoose = require('mongoose') ;

const userSchema = new mongoose.Schema({
    email : {type : String , unique : true } ,
    username : {type : String } ,
    password : {type : String} ,
    phone : {type : Number , default : ''} ,
    address : {type : String , default : ''} ,
    image : {type : String , default : ''} ,
    role : {type : String , default : 'user'} ,
    cost : {type : String , default : 0} 
})

module.exports = mongoose.model('users', userSchema);