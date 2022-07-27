const Datasource= require('../datasources/Datasource')
const asyncHandler = require('../middlewares/async')

exports.postUser = asyncHandler(async (req,res,next)=>{
    const nama = req.body.nama
    const nomor = req.body.nomor
    const email = req.body.email
    const birthdate = req.body.birthdate
    const username = req.body.username
    const password = req.body.password
    const result = await Datasource().UserDatasource.postUser(nama, nomor, email, birthdate, username,password)
    res.status(200).json({
        success:true,
        data:result
    })
})

exports.getUser = asyncHandler(async (req,res,next)=>{
    const input = req.query.input
    const password = req.query.password
    const result = await Datasource().UserDatasource.getUser(input,password)
    res.status(200).json({
        success:true,
        data:result
    })
})

exports.updateUser = asyncHandler(async (req,res,next)=>{
    const id = req.body.id
    const username = req.body.username
    const result = await Datasource().UserDatasource.updateUser(id, username)
    res.status(200).json({
        success:true,
        data:result
    })
})