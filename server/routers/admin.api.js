const router = require('express').Router() ;

const User = require('../model/usermodel');

router.post('/users',async(req ,res ,next) => {
    const { current , max} = req.body ;

    if (typeof current !== 'number') return res.status(204).json();
    const users = await User.paginate({},{ page : current , limit  : 2})

    console.log(users.docs.length)
    if (users.docs.length > 0) return res.status(200).json(users);
    res.status(204).json()
})

module.exports = router