//Database
const {tweetPG}=require('../configs/tweetPGDB')

//Datasource
const TweetDatasource = require('./TweetDatasource');
const UserDatasource = require("./UserDatasource")

//Initiate Database
const tweetPGDB =tweetPG();

const Datasource = () => ({
    TweetDatasource : new TweetDatasource({tweetPGDB}),
    UserDatasource : new UserDatasource({tweetPGDB})
})

module.exports = Datasource;