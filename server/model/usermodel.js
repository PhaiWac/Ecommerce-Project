const mongoose = require('mongoose') ;
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new mongoose.Schema({
    email : {type : String , unique : true } ,
    username : {type : String } ,
    password : {type : String} ,
    phone : {type : Number , default : ''} ,
    address : {type : String , default : ''} ,
    image : {type : String , default : ''} ,
    role : {type : String , default : 'user'} ,
    cost : {type : Number , default : 0} 
})

userSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('users', userSchema);