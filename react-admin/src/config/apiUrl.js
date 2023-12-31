let ipUrl = "http://localhost:7001/admin/"

let servicePath = {
    getTypeInfo: ipUrl + 'getTypeInfo',
    addType: ipUrl + 'addType',
    delTypeById: ipUrl + 'delType/',
    updateTypeById: ipUrl + 'updateTypeById',
    addArticle:ipUrl + 'addArticle' ,  //  添加文章
    updateArticle:ipUrl + 'updateArticle',
    checkLogin: ipUrl + 'checkLogin',
    getArticleList:ipUrl + 'getArticleList' ,  //  文章列表 
    delArticle:ipUrl + 'delArticle/' ,  //  删除文章
    getArticleById:ipUrl + 'getArticleById/' ,  //  根据ID获得文章详情
}

export default servicePath