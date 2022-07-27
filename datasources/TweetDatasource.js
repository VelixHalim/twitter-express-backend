const {Response} = require('../models/CommonModel')
const CommonFunction = require('../function/CommonFunction');
const { default: axios } = require('axios');
const { response } = require('express');

class TweetDatasource{
    constructor({tweetPGDB}){
        this.tweetPGDB = tweetPGDB
    }

    async createChat(id, tweet){
        const t = await this.tweetPGDB.sequelize.transaction();
        let sql =`
            insert into "chat" (iduser,tweet,createddate,updateddate)
            values ('${id}','${tweet}',current_timestamp,current_timestamp)
        `
        const [Ostatus, Oresult, Ometadata] = await CommonFunction.DoTransactionQueryNonArray(this.tweetPGDB,sql,{},t)
        if(Ostatus == 1){
            t.rollback()
            return Response(553,"Terjadi kesalahan pada data Chat",null);
        } else if(Ometadata.rowCount==0) {
            t.rollback()
            return Response(553,"Data tidak ditemukan",null);
        }else{
            t.commit()
            return Response("0","Berhasil",Oresult)
        }
    }
    async getChat(){
        let sql =`
            select u.nama,u.username,c.* from "user" u join "chat" c on (u.id=c.iduser) order by c.createddate DESC
        `
        const [Ostatus, Oresult, Ometadata] = await CommonFunction.DoQuery(this.tweetPGDB,sql,{})
        if(Ostatus == 1){
            return Response(553,"Terjadi kesalahan pada data User",null);
        } 
        if(Ometadata.rowCount==0) {
            return Response(553,"Data tidak ditemukan",null);
        }
        return Response("0","Berhasil",Oresult)
    }
    async updateChat(id,iduser, tweet){
        const t = await this.tweetPGDB.sequelize.transaction();
        let sql =`
            update "chat" set tweet = '${tweet}', updateddate = current_timestamp
            where "id" = '${id}' and "iduser"='${iduser}'
        `
        const [Ostatus, Oresult, Ometadata] = await CommonFunction.DoTransactionQueryNonArray(this.tweetPGDB,sql,{},t)
        if(Ostatus == 1){
            t.rollback()
            return Response(553,"Terjadi kesalahan pada data Chat",null);
        } else if(Ometadata.rowCount==0) {
            t.rollback()
            return Response(553,"Data tidak ditemukan",null);
        }else{
            t.commit()
            return Response("0","Berhasil",Oresult)
        }
    }
    async deleteChat(id){
        const t = await this.tweetPGDB.sequelize.transaction();
        let sql = `
            delete from "chat" where "id" ='${id}'
        `
        const [Ostatus, Oresult, Ometadata] = await CommonFunction.DoTransactionQueryNonArray(this.tweetPGDB,sql,{},t)
        if(Ostatus == 1){
            t.rollback()
            return Response(553,"Terjadi kesalahan pada data Chat",null);
        } else if(Ometadata.rowCount==0) {
            t.rollback()
            return Response(553,"Data tidak ditemukan",null);
        }else{
            t.commit()
            return Response("0","Berhasil",Oresult)
        }
    }
}
module.exports = TweetDatasource