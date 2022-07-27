const {Response} = require('../models/CommonModel')
const CommonFunction = require('../function/CommonFunction');
const { default: axios } = require('axios');
const { response } = require('express');

class UserDatasource{
    constructor({tweetPGDB}){
        this.tweetPGDB = tweetPGDB
    }

    async postUser(nama, nomor, email, birthdate, username, password){
        const t = await this.tweetPGDB.sequelize.transaction();
        let id=Date.now().toString()
        let sql = `
            insert into "user" (id,nama,nomor,email,datebirth,username,password,createddate,updateddate)
            values ('${id}','${nama}','${nomor}','${email}','${birthdate}','${username}','${password}',current_timestamp,current_timestamp)
        `
        const [Ostatus, Oresult, Ometadata] = await CommonFunction.DoTransactionQueryNonArray(this.tweetPGDB,sql,{},t)
        if(Ostatus == 1){
            t.rollback()
            return Response(553,"Terjadi kesalahan pada data User",null);
        } else if(Ometadata.rowCount==0) {
            t.rollback()
            return Response(553,"Data tidak ditemukan",null);
        }else{
            t.commit()
            return Response("0","Berhasil",Oresult)
        }
    }

    async getUser(input, password){
        let sql = `
            select * from "user"
            where ("nomor"='${input}' or "email"='${input}' or "username"='${input}') and "password"='${password}'
        `

        const [Ostatus, Oresult, Ometadata] = await CommonFunction.DoQueryNonArray(this.tweetPGDB,sql,{})
        if(Ostatus == 1){
            return Response(553,"Terjadi kesalahan pada data User",null);
        } 
        if(Ometadata.rowCount==0) {
            return Response(553,"Data tidak ditemukan",null);
        }
        return Response("0","Berhasil",Oresult)
    }

    async updateUser(id, username){
        const t = await this.tweetPGDB.sequelize.transaction();
        let sql = `
            update "user" set username='${username}', updateddate = current_timestamp
            where "id" = '${id}'
        `
        const [Ostatus, Oresult, Ometadata] = await CommonFunction.DoTransactionQueryNonArray(this.tweetPGDB,sql,{},t)
        if(Ostatus == 1){
            t.rollback()
            return Response(553,"Terjadi kesalahan pada data User",null);
        } else if(Ometadata.rowCount==0) {
            t.rollback()
            return Response(553,"Data tidak ditemukan",null);
        }else{
            t.commit()
            return Response("0","Berhasil",Oresult)
        }
    }
}

module.exports = UserDatasource