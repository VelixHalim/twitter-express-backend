const Datasource= require('../datasources/Datasource')
const asyncHandler = require('../middlewares/async')

exports.postChat = asyncHandler(async (req,res,next)=>{
    const iduser = req.body.iduser
    const tweet = req.body.tweet
    const result = await Datasource().TweetDatasource.createChat(iduser, tweet)
    res.status(200).json({
        success:true,
        data:result
    })
})

exports.getChat = asyncHandler(async (req,res,next)=>{
    const result = await Datasource().TweetDatasource.getChat()
    res.status(200).json({
        success:true,
        data:result
    })
})

exports.updateChat = asyncHandler(async (req,res,next)=>{
    const tweet = req.body.tweet
    const id = req.body.id
    const iduser = req.body.iduser
    const result = await Datasource().TweetDatasource.updateChat(id, iduser, tweet)
    res.status(200).json({
        success:true,
        data:result
    })
})

exports.deleteChat = asyncHandler(async (req,res,next)=>{
    const id = req.params.id
    const result = await Datasource().TweetDatasource.deleteChat(id)
    res.status(200).json({
        success:true,
        data:result
    })
})
