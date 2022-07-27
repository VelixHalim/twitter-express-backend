const express = require("express")
const {postChat, getChat, updateChat, deleteChat } =require("../controllers/tweet")
const router = express.Router()

router 
    .route("/createChat")
    .post(postChat)

router
    .route("/getChat")
    .get(getChat)

router
    .route("/updateChat")
    .put(updateChat)

router
    .route("/deleteChat/:id")
    .delete(deleteChat)

module.exports = router