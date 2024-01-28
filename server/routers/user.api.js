const router = require('express').Router() ;

// Crypto 
const hash = require('../help/crypto') ;

// Model 
const User = require('../model/usermodel')

// jwt 
const jwt = require('jsonwebtoken')

// multer
const upload = require('../help/multer')


//  Funcs ;

router.post('/login', async (req , res ,next) => {
    const { password , remember , email } = req.body ;

    const user = await User.findOne({email : email}) ;

    if (!user) {
        return res.status(204).json() ;
    } 

    const decodepassword = hash.Decode(user.password,email) ;
    
    if (decodepassword == password) {

        if (!req.cookies.jwt) {
            const token = jwt.sign({ email }, "webproject", { expiresIn: "1d" });
            res.cookie("jwt", token, {
                maxAge: 86400000,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', 
                sameSite: 'None', 
            });
        } 

        req.session.userdata = await User.findOne({email : email}) ;
  
        return res.status(200).json() ;
    } else return res.status(204).json();


})

router.post('/register',async ( req ,res ,next) => {
    const {email , username , password, } = req.body ;

    const user = User.findOne({email : email}) ;
    
    if (user && email == 'admin@gmail.com') return res.status(204).json() ;

    await new User({
        email : email ,
        password : hash.Encode(password,email) ,
        username : username ,
    }).save() ;

    res.status(200).json()
})

router.delete('/logout', (req ,res ,next) => {
    req.session.userdata = null ;
    res.clearCookie('jwt');
    res.json() ;
})

router.get('/getdata',async (req, res) => {
    if (req.session.userdata) {
        res.status(200).json({ session: req.session.userdata });
    } else {
        const token = req.cookies.jwt ;
        if (token === undefined) {
            return res.status(204).json() ;
        }
        const verify = jwt.verify(token,"webproject") ;
        req.session.userdata = await User.findOne({email : verify.email}) ;
        res.status(200).json({ session: req.session.userdata });
    }
});


router.get('/getcookie',async (req ,res, next) => {
    const token = req.cookies.jwt ;

    if (token === undefined) {
        return res.status(204).json() ;
    }

    const verify = jwt.verify(token,"webproject") ;

    if (verify ) {
        if (!req.session.userdata) {
            req.session.userdata = await User.findOne({email : verify.email}) ;
        }  
        res.status(200).json({session : req.session.userdata})
    } else res.status(204).json() ;
    
})

router.get('/getsession', ( req , res ,next) => {
    console.log(req.session,'getsession')
})

router.post('/change_password', async ( req , res ,next) => {
    const {old_password , new_password} = req.body ;

    const { _id , email} = req.session.userdata ;

    const user = await User.findById(_id) ;

    const user_password = hash.Decode(user.password,email) ;

    if (old_password != user_password) return res.status(204).json() ;

    const newpass = hash.Encode(new_password,email) ;

    await User.findByIdAndUpdate(_id,{ password : newpass}) ;

    res.status(200).json() ;


})

router.post('/update_profiel_image',upload.single('file'),async (req,res,next) => {
    const {_id} = req.session.userdata ;

    let image_name ;
    if (req.file) {
        image_name = req.file.filename ;
    }

    await User.findByIdAndUpdate(_id,{image : image_name } );

    req.session.userdata = await User.findById(_id) ;

    res.status(200).json(req.session.userdata) ;
})

router.post('/editdatauser',async (req ,res, next) => {
    const {_id} = req.session.userdata ;
    const {username , email ,password ,phone ,address} = req.body ;

    let data = {} ;
    if (password) {
        const user = await User.findById(_id) ;
        console.log
        if (password != hash.Decode(user.password,req.session.userdata.email)) return res.status(204).json() ;
    }


    if (phone) data = {phone : phone} ;
    if (address) data = {address : address} ;
    if (username) data = {username : username};

    console.log(data,phone)
    await User.findByIdAndUpdate(_id,data) ;
    
    req.session.userdata = await User.findById(_id) ;
    res.status(200).json(req.session.userdata) 
})

router.delete('/delete_account',async ( req, res, next) => {
    const {userdata} = req.session ;

    await User.findByIdAndDelete(userdata._id)  ;

    req.session.userdata = null ;
    res.clearCookie('jwt');
    res.status(200).json() ;
})
module.exports = router

