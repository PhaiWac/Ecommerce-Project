const CryptoJS = require('crypto-js');

const Encode = (data,key) => {
    return CryptoJS.AES.encrypt(data, key).toString();
}

const Decode = (encode,key) => {
    var bytes  = CryptoJS.AES.decrypt(encode, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports =  {
    Encode ,
    Decode 
}