"use strict";
const Controller = require('egg').Controller
const moment =require('moment') 

class MainController extends Controller {
    async index() {
        this.ctx.body = 'hi api'
    }

    async checkLogin() {
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        const sql = " SELECT userName FROM admin_user WHERE userName = '" + userName +
            "' AND password = '" + password + "'"

        const res = await this.app.mysql.query(sql)
        console.log(res)
        if (res.length > 0) {
            //登录成功,进行session缓存
            console.log('登录成功')
            let openId = new Date().getTime()
            console.log('openId', openId);
            this.ctx.session.openId = {
                'openId': openId
            }

            this.ctx.body = {
                'data': '登录成功',
                'openId': openId
            }
            console.log(this.ctx.body.openId)

        

        } else {
            this.ctx.body = {
                data: '登录失败'
            }
        }
    }
    //获取分类信息
    async getTypeInfo() {
        const resType = await this.app.mysql.select('type')
        this.ctx.body = {
            data: resType
        }
    }

     //添加分类
    async addType() {
        let tmpType = this.ctx.request.body
        tmpType.create_time = moment().format('YYYY-MM-DD HH-mm-ss')
        const result = await this.app.mysql.insert('type', tmpType)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId

        this.ctx.body = {
            isScuccess: insertSuccess,
            insertId: insertId
        }
    }

    //更新分类信息
    async updateTypeById() {
        let tmpType = this.ctx.request.body
        console.log(this.ctx.params())
        delete tmpType.create_time
        const result = await this.app.mysql.update('type',tmpType)
        const updateSuccess = result.affectedRows === 1;
        this.ctx.body = {
            isScuccess: updateSuccess
        }
    }

    //删除分类
    async delType() {
        let id = this.ctx.params.id
        console.log('id',id)
        const res = await this.app.mysql.delete('type', {
            'id': id
        })
        const delSuccess = res.affectedRows === 1
        this.ctx.body = {
            data: delSuccess
        }
    }

    //添加文章
    async addArticle() {

        let tmpArticle = this.ctx.request.body
        // tmpArticle.
        console.log(this.ctx.params())
        const result = await this.app.mysql.insert('article', tmpArticle)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId

        this.ctx.body = {
            isScuccess: insertSuccess,
            insertId: insertId
        }
    }

    //修改文章
    async updateArticle() {
        let tmpArticle = this.ctx.request.body
        const result = await this.app.mysql.update('article', tmpArticle)
        const updateSuccess = result.affectedRows === 1;
        this.ctx.body = {
            isScuccess: updateSuccess
        }
    }

    //获得文章列表
    async getArticleList() {

        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
            'type.typeName as typeName ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'ORDER BY article.id DESC '

        const resList = await this.app.mysql.query(sql)
        this.ctx.body = {
            list: resList
        }

    }

    //删除文章
    async delArticle() {
        let id = this.ctx.params.id
        const res = await this.app.mysql.delete('article', {
            'id': id
        })
        this.ctx.body = {
            data: res
        }
    }

    //根据文章ID得到文章详情，用于修改文章
    async getArticleById() {
        let id = this.ctx.params.id

        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.article_content as article_content,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
            'article.view_count as view_count ,' +
            'type.typeName as typeName ,' +
            'type.id as typeId ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'WHERE article.id=' + id
        const result = await this.app.mysql.query(sql)
        this.ctx.body = {
            data: result
        }
    }
}

module.exports = MainController