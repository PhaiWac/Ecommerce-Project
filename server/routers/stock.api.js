const express = require("express");
const router = express.Router()

// multer 
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '../client/public/image')
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    },
})

const upload = multer({ storage });

// Model 
const Stock = require('../model/stock');
const User = require('../model/usermodel')

// Crypto 
const CryptoJS = require('crypto-js')

const Encode = (data,key) => {
    return CryptoJS.AES.encrypt(data, key).toString();
}

const Decode = (encode,key) => {
    var bytes  = CryptoJS.AES.decrypt(encode, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}

const AuthAddShoe = async (req, res, next) => {

    const { name, price, category, count } = req.body;

    // const itemname = name ;
    console.log(name, price, category, count)

    const item = await Stock.findOne({ stock_name: name });

    if (item) {
        return res.status(200).json('already have stock');
    }


    let image;

    if (req.file) {
        image = req.file.filename;
    }

    try {
        const Insert = new Stock({
            stock_name: name,
            stock_price: price,
            stock_image: image.toString(),
            stock_count: count,
            stock_category: category
        })

        await Insert.save();

        next();

    } catch (err) {
        console.log("stock error", err)
    }



}

const Update = async (req, res, next) => {
    
    const { stock_price, stock_count, stock_name } = req.body;

    const { id } = req.params;

    const item = await Stock.findById(id) ;

    let image = null;

    if (req.file) {
        image = req.file.filename;
    }

    let data = {} ;

    if (stock_price !== 'undefined') {
        data['stock_price'] = stock_price ;

    }

    if (stock_count !== 'undefined') {
        data['stock_count'] = stock_count ;
    }

    if (stock_name !== 'undefined') {
        data['stock_name'] = stock_name ;
        console.log('name not null',stock_name)

        const check = await Stock.findOne({stock_name : stock_name}) ;

        if (check) {
            return res.status(200).json({message : 'aleardy have' })
        }
    }

    if (image != null) {
        data['stock_image'] = image ;
    }

    const update = await Stock.findByIdAndUpdate(id, data);

    next() ;

}

const Delete = async ( req, res, next) => {
    const { id } = req.params ;

    const Del = await Stock.findByIdAndDelete(id) ;

    if (Del) {
        next() ;
    }
}

const Register = async ( req , res , next) => {
    const {username , password, email } = req.body ;

    const check = await User.findOne({email : email}) ; 
    if (check ) return res.status(204).json()

    const user = new User({
        email : email ,
        password :  Encode(password,email) ,
        username : username 
    })

    await user.save() ;

    next() ;

}

const Login = async ( req ,res , next) => {
    const { email ,password , remember} = req.body ;

    const find = await User.findOne({email : email}) ;

    if (find)  {
        if (password === Decode(find.password,email)) {
             return next() ;
        } else {
            return res.status(204).json();
        }
    } else {
        return res.status(204).json();
    }
}

router.post('/addshoe', upload.single('file'), AuthAddShoe, async (req, res, next) => {
    const data = await Stock.find({}).limit(10);
    res.status(200).json({
        message: "success",
        data: data
    })
})

router.get('/getshoe', async (req, res, next) => {
    const data = await Stock.find({})
    res.status(200).json(data)
})

router.get('/getdata/:id', async (req, res, next) => {
    const data = await Stock.findById(req.params.id);
    res.status(200).json(data);
})

router.post('/update/:id', upload.single('file'), Update, async (req, res, next) => {
    const data = await Stock.findById(req.params.id);
    res.status(200).json(data);
})

router.delete("/delete/:id",Delete , async (req, res, next) => {
    const data = await Stock.find({});
    res.status(200).json({message : 'delete success' , item : data});
})


router.post('/register',upload.none(),Register,(req , res , next) => {
    return res.status(201).json()
})

router.post('/login',upload.none(),Login,(req , res , next) => {
    // res.cookie('token','test')
    // console.log(req.cookie)
    return res.status(200).json();
})


module.exports = router 