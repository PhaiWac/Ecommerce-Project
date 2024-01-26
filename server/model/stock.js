const mongoose = require('mongoose') ;

const StockSchema = mongoose.Schema({
    stock_name : {type : String} ,
    stock_price : {type : Number} ,
    stock_image : {type : String} ,
    stock_count : {type :Number} ,
    stock_category : {type : String},
    stock_sale : {type : Number , default : 0} ,

})

module.exports = mongoose.model('Stock', StockSchema);